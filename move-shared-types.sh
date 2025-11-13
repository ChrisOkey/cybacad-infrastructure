#!/bin/bash

SHARED_TYPES_DIR="packages/shared-types"
SRC_DIR="$SHARED_TYPES_DIR/src"

echo "📦 Moving shared type files into src/..."

# Create src/ if it doesn't exist
mkdir -p "$SRC_DIR"

# Move valid schema files
for file in "$SHARED_TYPES_DIR"/*.ts; do
  filename=$(basename "$file")

  # Skip index.ts
  if [[ "$filename" == "index.ts" ]]; then
    continue
  fi

  # Skip mistyped duplicates like courseShema.ts
  if [[ "$filename" == "courseShema.ts" ]]; then
    echo "🧹 Removing mistyped file: $filename"
    rm "$file"
    continue
  fi

  echo "📁 Moving $filename → src/"
  mv "$file" "$SRC_DIR/"
done

echo "✅ All shared types moved to packages/shared-types/src/"
