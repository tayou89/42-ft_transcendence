ui              = true
api_addr        = "http://127.0.0.1:8200"
cluster_addr    = "https://127.0.0.1:8201"

storage "file" {
  path = "/vault/file"
}

listener "tcp" {
  address       = "127.0.0.1:8200"
  tls_cert_file = "/certs/vault/vault.crt"
  tls_key_file  = "/certs/vault/vault.key"
}

telemetry {
  prometheus_retention_time = "24h"
  disable_hostname = true
}
