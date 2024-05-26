path "/kv/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

path "/kv/provision/*" {
  capabilities = ["read"]
}