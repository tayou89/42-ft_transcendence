#!/bin/bash

set -e

ENV_FILE="./srcs/envs/web.env";
HOST_IP=$(ifconfig en0 | grep 'inet ' | awk '{print $2}');

if (grep "^HOST_IP=" "$ENV_FILE"); then
    sed -i "s/^HOST_IP=.*/HOST_IP=$HOST_IP/" "$ENV_FILE";
else
    echo "$HOST_IP" >> "$ENV_FILE";
fi
