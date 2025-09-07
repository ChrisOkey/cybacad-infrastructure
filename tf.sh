#!/usr/bin/env bash
set -e

# --- 1. Parse environment ---
ENVIRONMENT="$1"
if [[ -z "$ENVIRONMENT" ]]; then
  echo "❌ Please specify an environment (dev, staging, prod)"
  exit 1
fi
shift  # Remove the environment from the argument list so $@ is now only Terraform commands

# --- 2. Set defaults ---
AWS_REGION="us-east-1"

# --- 3. Find repo root (directory where this script lives) ---
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$SCRIPT_DIR"

# --- 4. Load .env from repo root if present ---
if [ -f "$REPO_ROOT/.env" ]; then
  export $(grep -v '^#' "$REPO_ROOT/.env" | xargs)
  echo "✅ Loaded environment variables from $REPO_ROOT/.env"
else
  echo "⚠️ No .env file found — using existing environment variables"
fi

# --- 5. Set Terraform variables ---
export TF_VAR_env="$ENVIRONMENT"
export TF_VAR_aws_region="${AWS_DEFAULT_REGION:-$AWS_REGION}"

# --- 6. Move into the correct environment folder ---
ENV_DIR="$REPO_ROOT/terraform/environments/$ENVIRONMENT"
if [ ! -d "$ENV_DIR" ]; then
  echo "❌ Environment folder not found: $ENV_DIR"
  exit 1
fi
cd "$ENV_DIR"

# --- 7. Run Terraform ---
echo "🚀 Running: terraform $@ in $ENVIRONMENT (region: $TF_VAR_aws_region)"
terraform "$@"

