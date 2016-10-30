#!/usr/bin/env bash

set -u

ENV=$1

if [ "${ENV}" = "prod" ]; then
  # reset current role if exists
  test ! -v AWS_SESSION_TOKEN && direnv reload
  # switch to production role
  source scripts/switch-production-role.sh
fi

# account number to mask
account_number=$(aws sts get-caller-identity --output text --query 'Account')

sls deploy -v --stage ${ENV} | sed -e "s/${account_number}/SECRET/g"

if [ "${ENV}" = "prod" ]; then
  # reset current role if exists
  test ! -v AWS_SESSION_TOKEN && direnv reload
fi
