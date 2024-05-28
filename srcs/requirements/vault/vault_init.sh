#!/bin/bash

keyShare=4
keyThreshold=2
keyFile=/vault/keys/generated_keys.txt
vaultURL=https://vault:8200

#init vault
curl -k -s  ${vaultURL}/v1/sys/init | grep -q '"initialized":true'
if [ $? -eq 0 ]; then
    echo "vault was already initialized."
else
    curl -k -s -XPOST \
        ${vaultURL}/v1/sys/init \
        --data "{\"secret_shares\": ${keyShare}, \"secret_threshold\": ${keyThreshold}}" \
        | jq > ${keyFile}
    echo "vault was successfully initialized."
fi

#unseal vault
for i in $(seq 0 $((${keyThreshold} - 1)))
do
    key=$(jq ".keys[$i]" ${keyFile})
    curl -k -s -XPOST \
    ${vaultURL}/v1/sys/unseal \
    --data "{\"key\": ${key}}"
done
echo "vault was successfully unsealed."
