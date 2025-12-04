#!/bin/bash

# Navigate to shared-types package
cd packages/shared-types || exit

# Create src directory if it doesn't exist
mkdir -p src

# Move all .ts and .tsx files (excluding tsconfig.json and package.json) into src/
find . -type f \( -name "*.ts" -o -name "*.tsx" \) \
  ! -path "./src/*" \
  ! -name "tsconfig.json" \
  ! -name "package.json" \
  -exec bash -c '
    for filepath; do
      # Strip leading ./ and prepend src/
      relpath="${filepath#./}"
      target="src/$relpath"
      mkdir -p "$(dirname "$target")"
      mv "$filepath" "$target"
      echo "Moved: $filepath → $target"
    done
  ' bash {} +

echo "✅ All source files moved into src/"
