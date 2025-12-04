#!/usr/bin/env bash
# Scaffold and fix tsconfig.json, package.json, index.ts/index.tsx for cybacad-monorepo

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Define mappings
NODE_PACKAGES=("packages/progress-service" "packages/rbac" "packages/firestore-config")
FRONTEND_APPS=("apps/web" "apps/dashboard")
BACKEND_APP="apps/backend-nodejs"
SHARED_TYPES="packages/shared-types"

# Helper: write JSON safely
write_json() {
  local file="$1"
  local content="$2"
  echo "$content" > "$file"
}

# Scaffold tsconfig.json
scaffold_tsconfig() {
  local folder="$1"
  local type="$2" # node | frontend | shared

  local tsconfig="$folder/tsconfig.json"
  mkdir -p "$folder/src"

  if [[ "$type" == "node" ]]; then
    write_json "$tsconfig" '{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "target": "ES2022"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}'
    echo "✅ Node tsconfig scaffolded in $tsconfig"
  elif [[ "$type" == "frontend" ]]; then
    write_json "$tsconfig" '{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "outDir": "dist",
    "rootDir": "src",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "target": "ES2022"
  },
  "include": ["src", "next-env.d.ts", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}'
    echo "✅ Frontend tsconfig scaffolded in $tsconfig"
  else
    write_json "$tsconfig" '{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "module": "ESNext",
    "moduleResolution": "NodeNext",
    "target": "ES2022"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}'
    echo "✅ Shared-types tsconfig scaffolded in $tsconfig"
  fi
}

# Scaffold package.json
scaffold_package_json() {
  local folder="$1"
  local name="$2"
  local type="$3" # node | frontend | shared

  local pkg="$folder/package.json"
  if [[ "$type" == "frontend" ]]; then
    write_json "$pkg" "{
  \"name\": \"@cybacad/$name\",
  \"version\": \"1.0.0\",
  \"private\": true,
  \"scripts\": {
    \"dev\": \"next dev\",
    \"build\": \"next build\"
  }
}"
  else
    write_json "$pkg" "{
  \"name\": \"@cybacad/$name\",
  \"version\": \"1.0.0\",
  \"main\": \"dist/index.js\",
  \"types\": \"dist/index.d.ts\",
  \"scripts\": {
    \"build\": \"tsc -b\"
  }
}"
  fi
  echo "✅ package.json scaffolded in $pkg"
}

# Scaffold index.ts / index.tsx
scaffold_entry() {
  local folder="$1"
  local type="$2"

  if [[ "$type" == "frontend" ]]; then
    echo 'export default function App() { return <h1>App Initialized</h1>; }' > "$folder/src/index.tsx"
    echo "✅ index.tsx scaffolded in $folder/src"
  else
    echo 'console.log("Package initialized");' > "$folder/src/index.ts"
    echo "✅ index.ts scaffolded in $folder/src"
  fi
}

# Run scaffolding
for pkg in "${NODE_PACKAGES[@]}"; do
  scaffold_tsconfig "$ROOT_DIR/$pkg" "node"
  scaffold_package_json "$ROOT_DIR/$pkg" "$(basename $pkg)" "node"
  scaffold_entry "$ROOT_DIR/$pkg" "node"
done

for app in "${FRONTEND_APPS[@]}"; do
  scaffold_tsconfig "$ROOT_DIR/$app" "frontend"
  scaffold_package_json "$ROOT_DIR/$app" "$(basename $app)" "frontend"
  scaffold_entry "$ROOT_DIR/$app" "frontend"
done

scaffold_tsconfig "$ROOT_DIR/$BACKEND_APP" "node"
scaffold_package_json "$ROOT_DIR/$BACKEND_APP" "backend-nodejs" "node"
scaffold_entry "$ROOT_DIR/$BACKEND_APP" "node"

scaffold_tsconfig "$ROOT_DIR/$SHARED_TYPES" "shared"
scaffold_package_json "$ROOT_DIR/$SHARED_TYPES" "shared-types" "shared"
scaffold_entry "$ROOT_DIR/$SHARED_TYPES" "node"

echo "🎉 All scaffolds complete!"
