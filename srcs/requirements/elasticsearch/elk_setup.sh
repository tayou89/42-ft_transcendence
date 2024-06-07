#!/bin/bash

if [ x${ELASTIC_PASSWORD} == x ]; then
    echo "Set the ELASTIC_PASSWORD environment variable in the .env file";
    exit 1;
elif [ x${KIBANA_PASSWORD} == x ]; then
    echo "Set the KIBANA_PASSWROD environment variable in the .env file";
    exit 1;
elif [ x${LOGSTASH_INTERNAL_PASSWORD} == x ]; then
    echo "Set the LOGSTASH_INTERNAL_PASSWROD environment variable in the .env file";
    exit 1;
fi

echo "Waiting for Elasticsearch availability";
until curl -s --cacert config/certs/ca/ca.crt https://es01:9200 | grep -q "missing authentication credentials";
    do sleep 5;
done;
echo "Setting kibana_system password";
until curl -s -X POST --cacert config/certs/ca/ca.crt -u "elastic:${ELASTIC_PASSWORD}" -H "Content-Type: application/json" https://es01:9200/_security/user/kibana_system/_password -d "{\"password\":\"${KIBANA_PASSWORD}\"}" | grep -q "^{}";
    do sleep 5;
done;
echo "Setting logstash_writer role";
until curl -s -X POST --cacert config/certs/ca/ca.crt -u "elastic:${ELASTIC_PASSWORD}" -H "Content-Type: application/json" https://es01:9200/_security/role/logstash_writer -d '{"cluster": ["manage_index_templates", "monitor", "manage_ilm"], "indices": [{"names": [ "log-*" ], "privileges": ["write","create","create_index","manage","manage_ilm"]}]}' | grep -q '{"role":{"created":true}}';
    do sleep 5;
done;
echo "Setting logstash_internal account";
until curl -s -X POST --cacert config/certs/ca/ca.crt -u "elastic:${ELASTIC_PASSWORD}" -H "Content-Type: application/json" https://es01:9200/_security/user/logstash_internal -d "{\"password\" : \"${LOGSTASH_INTERNAL_PASSWORD}\", \"roles\" : [ \"logstash_writer\"], \"full_name\" : \"Internal Logstash User\"}" | grep -q '{"created":true}';
    do sleep 5;
done;
echo "\033[34mDone!\033[0m";