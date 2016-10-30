#!/usr/bin/env bash

set -u

ENV=$1

if [ "${ENV}" = "prod" ]; then
  # reset current role if exists
  test ! -v AWS_SESSION_TOKEN && direnv reload
  # switch to production role
  source scripts/switch-production-role.sh
fi

sls deploy -v --stage ${ENV}

if [ "${ENV}" = "prod" ]; then
  # reset current role if exists
  test ! -v AWS_SESSION_TOKEN && direnv reload
fi
