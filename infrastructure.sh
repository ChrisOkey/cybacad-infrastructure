#!/usr/bin/env bash
set -e

ENVIRONMENT=$1
COMMAND=$2

# Ensure AWS credentials are provided by the environment (GitHub Actions)
if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
  echo "❌ AWS credentials not set in environment."
  exit 1
fi

# Pass env vars to Terraform and execute the command
terraform -chdir="terraform/environments/$ENVIRONMENT" "$COMMAND"
