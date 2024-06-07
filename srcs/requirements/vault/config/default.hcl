ui              = true
api_addr        = "http://0.0.0.0:8200"
cluster_addr    = "https://0.0.0.0:8201"

storage "file" {
  path = "/vault/file"
}

listener "tcp" {
  address       = "0.0.0.0:8200"
  tls_cert_file = "/certs/vault/vault.crt"
  tls_key_file  = "/certs/vault/vault.key"
  tls_client_ca_file = "/certs/ca/ca.crt"
}

telemetry {
  prometheus_retention_time = "24h"
  disable_hostname = true
}
