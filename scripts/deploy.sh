#!/usr/bin/env bash

set -u

if [ ! -v AWS_SESSION_TOKEN ]; then
  source ./scripts/switch-role.sh
fi

# account number to mask
account_number=$(aws sts get-caller-identity --output text --query 'Account')

sls deploy -v --stage ${ENV} | sed -e "s/${account_number}/SECRET/g"
