#!/usr/bin/env bash

set -u

ENV=$1

if [ "${ENV}" = "prod" ]; then
  source scripts/switch-production-role.sh
fi

# account number to mask
account_number=$(aws sts get-caller-identity --output text --query 'Account')

sls deploy -v --stage ${ENV} | sed -e "s/${account_number}/SECRET/g"
