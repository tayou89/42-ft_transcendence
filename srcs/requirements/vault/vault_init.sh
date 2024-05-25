#!/bin/bash
set -e

keyShare=4
keyThreshold=2
keyFile=/vault/keys/generated_keys.txt

#start server
vault server -config /vault/config/default.hcl

#generate keys
vault operator init "-key-shares=${keyShare}" "-key-threshold=${keyThreshold}" > /vault/keys/generated_keys.txt
echo "keys were generated!"

count=0
while IFS= read -r line && [ ${count} -lt ${keyThreshold} ]
do
    if echo ${line} | grep "Unseal Key "; then
        vault operator unseal $(echo ${line} | grep "Unseal Key " | cut -c15-)
        count=${count} + 1
    fi
done < ${keyFile}



# #Parse Unseal keys to KeyArray
# mapfile -t keyArray < <(grep "Unseal Key " < generated_key.txt | cut -c15-)

# #Unseal vault
# vault operator unseal ${keyArray[0]}
# vault operator unseal ${keyArray[1]}
# vault operator unseal ${keyArray[2]}

#get root token
rootToken=$(grep "Initial Root Token: " < generated_keys.txt  | cut -c21-)
export VAULT_TOKEN=${rootToken}

echo "========Vault Setting was successfully finished.========"