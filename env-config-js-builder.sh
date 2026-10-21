#!/bin/bash

# exports the keys of the env file passed as an argument
set -a
source "$1"
set +a

# builds env-config.js for a local run
bash ./ci/env.sh

# the dev server serves public/, cypress reads its own copy
mv ./env-config.js ./public/env-config.js
cp ./public/env-config.js ./cypress/env-config.js
