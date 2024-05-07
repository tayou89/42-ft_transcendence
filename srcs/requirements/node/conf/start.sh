#!/bin/bash

if [ ! -d /logs/node ]; then
    mkdir /logs/node;
    echo "making 'logs/node/ directory";
fi
webpack serve --open --mode=development --hot --progress >> /logs/node/logs.log 2>> /logs/node/errors.log;
