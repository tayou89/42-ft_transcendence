#!/bin/bash
set -e

keyShare=4
keyThreshold=2
keyFile=/vault/keys/generated_keys.txt

#start server
vault server -config /vault/config/default.hcl &

sleep 5

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
vault secrets enable kv
vault auth enable userpass
vault policy write server-policy /vault/config/server_policy.hcl
vault write auth/userpass/users/server password=${VAULT_SERVER_PASSWORD} policies=server-policy

echo "========Vault Settings were successfully finished.========"

tail -f ${keyFile}