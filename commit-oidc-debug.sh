#!/bin/bash
set -e  # exit immediately if a command fails

# Path to your existing oidc-debug.yml file
SOURCE_FILE="/~/Chris/Projects/cybacad-infrastructure/.github/workflows/oidc-debug.yml"

# Ensure the workflows directory exists
mkdir -p .github/workflows

# Copy the file into the workflows directory
cp "$SOURCE_FILE" .github/workflows/oidc-debug.yml

# Stage the new workflow
git add .github/workflows/oidc-debug.yml

# Commit with a clear message
git commit -m "Add OIDC debug workflow to inspect GitHub Actions OIDC token claims"

# Push to the current branch (change 'main' if you’re on a different branch)
git push origin main
