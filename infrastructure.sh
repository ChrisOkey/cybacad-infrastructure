#!/bin/bash
set -euo pipefail

# === CONFIGURATION ===
AWS_REGION="${AWS_REGION:-us-east-1}"
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_DIR="${ROOT_DIR}/logs"
LAST_RUN_FILE="${LOG_DIR}/last_run.txt"
mkdir -p "$LOG_DIR"

# === ARGUMENT PARSING ===
if [[ "${1:-}" == "--resume" ]]; then
  if [[ ! -f "$LAST_RUN_FILE" ]]; then
    echo "❌ No previous run found to resume."
    exit 1
  fi
  read -r ENVIRONMENT COMMAND VERBOSE < "$LAST_RUN_FILE"
  echo "🔄 Resuming last run: env=$ENVIRONMENT, command=$COMMAND, verbose=$VERBOSE"
else
  ENVIRONMENT="${1:-dev}"          # dev|staging|prod
  COMMAND="${2:-apply}"            # apply|plan|destroy|dry-run
  VERBOSE="${3:-}"                 # --verbose or -v
fi

TF_DIR="${ROOT_DIR}/terraform/environments/${ENVIRONMENT}"
LAMBDA_DIR="${TF_DIR}/lambda"
S3_BUCKET="cybacad-tfstate-${ENVIRONMENT}"
DDB_TABLE="cybacad-tflock-${ENVIRONMENT}"

# === LOGGING SETUP ===
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
LOG_FILE="${LOG_DIR}/${ENVIRONMENT}_${COMMAND}_${TIMESTAMP}.log"
exec > >(tee -a "$LOG_FILE") 2>&1

if [[ "${1:-}" != "--resume" ]]; then
  echo "$ENVIRONMENT $COMMAND $VERBOSE" > "$LAST_RUN_FILE"
fi

if [[ "$VERBOSE" == "--verbose" || "$VERBOSE" == "-v" ]]; then
  echo "🔍 Verbose mode ON — showing all commands"
  set -x
fi

usage() {
  cat <<USAGE
Usage:
  $0 [env] [command] [--verbose|-v]
  $0 --resume

env:      dev (default) | staging | prod
command:  apply (default) | plan | destroy | dry-run
USAGE
}

ensure_tools() {
  for t in terraform aws; do
    if ! command -v "$t" >/dev/null 2>&1; then
      echo "❌ Missing tool: $t"
      exit 1
    fi
  done
  if ! command -v zip >/dev/null 2>&1 && ! command -v powershell.exe >/dev/null 2>&1; then
    echo "⚠️  Neither 'zip' nor PowerShell found — Lambda packaging will be skipped."
  fi
}

check_aws_credentials() {
  echo "🔍 Checking AWS CLI credentials..."
  if ! aws sts get-caller-identity --region "$AWS_REGION" >/dev/null 2>&1; then
    echo "❌ AWS CLI is not configured or credentials are invalid."
    powershell.exe -NoProfile -Command "aws configure" || aws configure
    echo "🔄 Re-checking AWS credentials..."
    if ! aws sts get-caller-identity --region "$AWS_REGION" >/dev/null 2>&1; then
      echo "❌ AWS credentials still invalid after configuration. Exiting."
      exit 1
    fi
  fi
  echo "✅ AWS CLI is configured and credentials are valid."
}

bootstrap_backend() {
  echo "🔧 Bootstrapping remote state backend in ${AWS_REGION}..."
  if ! aws s3api head-bucket --bucket "$S3_BUCKET" >/dev/null 2>&1; then
    echo "📦 Creating S3 bucket: $S3_BUCKET"
    if [ "$AWS_REGION" = "us-east-1" ]; then
      aws s3api create-bucket --bucket "$S3_BUCKET" --region "$AWS_REGION"
    else
      aws s3api create-bucket \
        --bucket "$S3_BUCKET" \
        --region "$AWS_REGION" \
        --create-bucket-configuration LocationConstraint="$AWS_REGION"
    fi
    aws s3api put-bucket-versioning \
      --bucket "$S3_BUCKET" \
      --versioning-configuration Status=Enabled
    aws s3api put-bucket-encryption \
      --bucket "$S3_BUCKET" \
      --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'
  else
    echo "✅ S3 bucket exists."
  fi

  if ! aws dynamodb describe-table --table-name "$DDB_TABLE" >/dev/null 2>&1; then
    echo "🗄 Creating DynamoDB table: $DDB_TABLE"
    aws dynamodb create-table \
      --table-name "$DDB_TABLE" \
      --attribute-definitions AttributeName=LockID,AttributeType=S \
      --key-schema AttributeName=LockID,KeyType=HASH \
      --billing-mode PAY_PER_REQUEST \
      --region "$AWS_REGION"
    aws dynamodb wait table-exists --table-name "$DDB_TABLE"
  else
    echo "✅ DynamoDB table exists."
  fi
}

write_backend_tf() {
  mkdir -p "$TF_DIR"
  cat > "${TF_DIR}/backend.tf" <<EOF
terraform {
  backend "s3" {
    bucket         = "${S3_BUCKET}"
    key            = "state/${ENVIRONMENT}/terraform.tfstate"
    region         = "${AWS_REGION}"
    dynamodb_table = "${DDB_TABLE}"
    encrypt        = true
  }
}
EOF
}

ensure_tf_variables() {
  local vars_file="${TF_DIR}/variables.tf"
  mkdir -p "$TF_DIR"
  if [ ! -f "$vars_file" ]; then
    echo "🆕 Creating ${vars_file}"
    cat > "$vars_file" <<EOF
variable "env" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
}

variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
}
EOF
    return
  fi
  if ! grep -q 'variable "env"' "$vars_file"; then
    echo "➕ Adding 'env' variable to ${vars_file}"
    cat >> "$vars_file" <<EOF

variable "env" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
}
EOF
  fi
  if ! grep -q 'variable "aws_region"' "$vars_file"; then
    echo "➕ Adding 'aws_region' variable to ${vars_file}"
    cat >> "$vars_file" <<EOF

variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
}
EOF
  fi
}

package_lambda() {
  if [ ! -d "$LAMBDA_DIR" ]; then
    echo "⚠️  No Lambda directory at ${LAMBDA_DIR}; skipping packaging."
    return
  fi
  echo "📦 Packaging Lambda function..."
  if command -v zip >/dev/null 2>&1; then
    ( cd "$LAMBDA_DIR" && zip -r -q lambda.zip . -x "*.zip" )
    echo "✅ Lambda packaged with zip."
  elif command -v powershell.exe >/dev/null 2>&1; then
    pwsh_cmd="Compress-Archive -Path * -DestinationPath lambda.zip -Force"
    ( cd "$LAMBDA_DIR" && powershell.exe -NoProfile -Command "$pwsh_cmd" )
    echo "✅ Lambda packaged with PowerShell Compress-Archive."
  else
    echo "❌ No packaging tool available — skipping Lambda packaging."
  fi
}

tf_init() {
  echo "📂 Using Terraform dir: $TF_DIR"
  cd "$TF_DIR"
  terraform fmt -recursive
  terraform validate
  terraform init -upgrade
}

tf_plan() {
  terraform plan \
    -var="env=${ENVIRONMENT}" \
    -var="aws_region=${AWS_REGION}" \
    -out=tfplan
}

tf_apply() {
  if [ ! -f "tfplan" ]; then
    tf_plan
  fi
  terraform apply -auto-approve "tfplan"
}

tf_destroy() {
  terraform destroy -auto-approve \
    -var="env=${ENVIRONMENT}" \
    -var="aws_region=${AWS_REGION}"
}

tf_dry_run() {
  echo "🧪 Running DRY-RUN mode — no changes will be applied."
  terraform plan \
    -var="env=${ENVIRONMENT}" \
    -var="aws_region=${AWS_REGION}"
  echo "✅ Dry-run complete — infrastructure unchanged."
}

main() {
  ensure_tools
  check_aws_credentials
  bootstrap_backend
  write_backend_tf
  ensure_tf_variables
  package_lambda
  tf_init

  case "$COMMAND" in
    apply) tf_plan; tf_apply ;;
    plan) tf_plan ;;
    destroy) tf_destroy ;;
    dry-run) tf_dry_run ;;
    *) echo "❌ Invalid command: $COMMAND"; usage; exit 1 ;;
  esac

  echo "✅ Script execution finished successfully. Logs are at $LOG_FILE"
}

main
