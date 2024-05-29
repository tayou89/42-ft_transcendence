#!/bin/bash

keyShare=4
keyThreshold=2
keyFile=/vault/keys/generated_keys.txt
vaultURL=https://vault:8200

#init vault
curl -k -s  ${vaultURL}/v1/sys/init | grep -q -x '{"initialized":true}'
if [ $? -eq 0 ]; then
    echo "vault was already initialized."
    exit 0
else
    curl -k -s -XPOST \
        ${vaultURL}/v1/sys/init \
        --data "{
                \"secret_shares\": ${keyShare}, \
                \"secret_threshold\": ${keyThreshold}
            }" \
        | jq > ${keyFile}
    curl -k -s  ${vaultURL}/v1/sys/init | grep -q -x '{"initialized":true}'
    if [ $? -eq 0 ]; then
        echo "vault was successfully initialized."
    else
        echo "ERROR: vault initailization failed."
        exit 1
    fi
fi

#unseal vault
TOKEN=$(jq -r '.root_token' ${keyFile})
for i in $(seq 0 $((${keyThreshold} - 1)))
do
    key=$(jq ".keys[$i]" ${keyFile})
    curl -k -s -XPOST \
        ${vaultURL}/v1/sys/unseal \
        --data "{\"key\": ${key}}"
done
curl -k -i -s  ${vaultURL}/v1/sys/health | grep 'HTTP' | awk '{print $2}' | grep -q -x '200'
if [ $? -eq 0 ]; then
    echo "vault was successfully unsealed."
else
    echo "ERROR: vault unsealing failed."
    exit 1
fi

#create polices
curl -k -s -XPOST \
    ${vaultURL}/v1/sys/policy/server-policy \
    -H "X-Vault-Token: ${TOKEN}" \
    --data @/vault/policies/server_policy.json
echo "policies were created."

#enable userpass
curl -k -s -XPOST \
    ${vaultURL}/v1/sys/auth/userpass \
    -H "X-Vault-Token: ${TOKEN}" \
    --data '{
        "type": "userpass",
        "description": "For Django server"
    }'
curl -k -s  ${vaultURL}/v1/sys/auth -H "X-Vault-Token: ${TOKEN}" | grep 'userpass/'
if [ $? -eq 0 ]; then
    echo "enable userpass."
else
    echo "ERROR: enabling userpass failed."
    exit 1
fi

#create userpass
curl -k -s -XPOST \
    ${vaultURL}/v1/auth/userpass/users/server \
    -H "X-Vault-Token: ${TOKEN}" \
    --data "{
        \"password\": \"${VAULT_SERVER_PASSWORD}\",
        \"token_policies\": [\"server-policy\"]
    }"
curl -k -s ${vaultURL}/v1/auth/userpass/users/server -H "X-Vault-Token: ${TOKEN}" | grep -q 'request_id'
if [ $? -eq 0 ]; then
    echo "create user 'server'."
else
    echo "ERROR: creating user failed."
    exit 1
fi

#enable kv
curl -k -s -XPOST \
    ${vaultURL}/v1/sys/mounts/kv \
    -H "X-Vault-Token: ${TOKEN}" \
    --data '{
            "type": "kv",
            "options": {
                "version": "2"
            }
        }'
curl -k -s -XPOST \
    ${vaultURL}/v1/kv/config \
    -H "X-Vault-Token: ${TOKEN}" \
    --data '{
        "max_versions": 5,
        "cas_required": false
    }'
curl -k -H -s "X-Vault-Token: ${TOKEN}" ${vaultURL}/v1/sys/mounts | grep -q 'kv/'
if [ $? -eq 0 ]; then
    echo "enable kv engine."
else
    echo "ERROR: enabling kv engine failed."
    exit 1
fi

#create secrets
curl -k -s -XPOST \
    ${vaultURL}/v1/kv/data/django-secret \
    -H "X-Vault-Token: ${TOKEN}" \
    --data "{
        \"data\": {
            \"DJANGO_SECRET_KEY\": \"${DJANGO_SECRET_KEY}\"
        }
    }"
echo "create secrets."

echo "==========DONE=========="
