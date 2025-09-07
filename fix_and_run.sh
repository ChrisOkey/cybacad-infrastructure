#!/bin/bash
set -euo pipefail

# === Step 1: Fix the backend.tf file definitively ===
# This command will replace the incorrect line with the correct one.
# It uses 'sed' to perform a find-and-replace operation on the file.
sed -i 's/use_lockfile = true/dynamodb_table = "cybacad-tflock-dev"/' terraform/environments/dev/backend.tf
echo "✅ Backend file has been corrected."

# === Step 2: Commit and push the changes ===
# This will stage the corrected file, create a new commit, and push it.
git add .
git commit -m "Fix: Final correction of backend.tf file" || true
git push

echo "🚀 Changes committed and pushed. Workflow should start now."