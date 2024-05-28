#!/bin/bash

keyShare=4
keyThreshold=2
keyFile=/vault/keys/generated_keys.txt


#start server
vault server -config /vault/config/default.hcl &

sleep 3
vault status | grep 'Initialized' | awk '{print $2}' | grep -q 'false'
if [ $? -eq 0 ]; then
    #generate keys
    vault operator init "-key-shares=${keyShare}" "-key-threshold=${keyThreshold}" > /vault/keys/generated_keys.txt
    echo "keys were generated!"

    count=0
    while IFS= read -r line && [ ${count} -lt ${keyThreshold} ]
    do
        if echo ${line} | grep "Unseal Key "; then
            vault operator unseal $(echo ${line} | grep "Unseal Key " | cut -c15-)
            count=$((count + 1))
        fi
    done < ${keyFile}

    rootToken=$(grep "Initial Root Token: " < ${keyFile}  | cut -c21-)
    export VAULT_TOKEN=${rootToken}

    #settings
    vault secrets enable -version=2 kv
    vault auth enable userpass
    vault policy write server-policy /vault/config/server_policy.hcl
    vault write auth/userpass/users/server password=${VAULT_SERVER_PASSWORD} policies=server-policy
    vault kv put -mount=kv provision SECRET_KEY=${DJANGO_SECRET_KEY}
    echo "========Vault was initialized.========"
else
    echo "========Vault was already initialized.========"
fi
