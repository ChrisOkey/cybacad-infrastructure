#!/usr/bin/env bash
# Auto-fix 2: aliases, imports, scaffolds, and route parameter revert for cybacad-monorepo

set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Util
write_file() {
  local file="$1"
  local content="$2"
  mkdir -p "$(dirname "$file")"
  printf "%s\n" "$content" > "$file"
}

# 1) Fix web tsconfig: add baseUrl + paths, remove .next/types from include
fix_web_tsconfig() {
  local ts="$ROOT_DIR/apps/web/tsconfig.json"
  [[ -f "$ts" ]] || return
  echo "🔧 Updating apps/web tsconfig paths and include"
  # Remove .next/types
  jq '.include |= map(select(. != ".next/types/**/*.ts"))' "$ts" > "$ts.tmp" && mv "$ts.tmp" "$ts"
  # Ensure baseUrl and paths exist
  local has_baseUrl
  has_baseUrl=$(jq -r '.compilerOptions.baseUrl // empty' "$ts")
  if [[ -z "$has_baseUrl" ]]; then
    jq '.compilerOptions.baseUrl = "."' "$ts" > "$ts.tmp" && mv "$ts.tmp" "$ts"
  fi
  # Merge paths mapping
  jq '.compilerOptions.paths |= (. // {}) + {
        "@components/*": ["src/components/*"],
        "@lib/*": ["src/lib/*"]
      }' "$ts" > "$ts.tmp" && mv "$ts.tmp" "$ts"
}

# 2) Fix wrong package scope in web imports (@cybac → @cybacad)
fix_web_shared_types_scope() {
  local file="$ROOT_DIR/apps/web/src/components/CourseCard.tsx"
  [[ -f "$file" ]] || return
  echo "🔧 Fixing shared-types import scope in CourseCard.tsx"
  sed -i 's|@cybac/shared-types|@cybacad/shared-types|g' "$file"
}

# 3) Remove unused React import (new JSX runtime)
remove_unused_react_import() {
  local file="$ROOT_DIR/apps/web/src/components/ModuleViewer.tsx"
  [[ -f "$file" ]] || return
  echo "🔧 Removing unused React import in ModuleViewer.tsx"
  # Delete exact line if present
  sed -i '/^import React from..react..;$/d' "$file"
}

# 4) Scaffold missing web lib files (types.ts, useCourses.ts)
scaffold_web_lib_files() {
  local types="$ROOT_DIR/apps/web/src/lib/types.ts"
  local useCourses="$ROOT_DIR/apps/web/src/lib/useCourses.ts"
  if [[ ! -f "$types" ]]; then
    echo "🔧 Scaffolding apps/web/src/lib/types.ts"
    write_file "$types" 'export type Course = {
  id: string;
  title: string;
  description?: string;
  modules?: string[];
};

export type ApiResponse<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};'
  fi
  if [[ ! -f "$useCourses" ]]; then
    echo "🔧 Scaffolding apps/web/src/lib/useCourses.ts"
    write_file "$useCourses" 'import { useEffect, useState } from "react";
import type { Course } from "./types";

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: replace with real API
    setCourses([]);
    setLoading(false);
  }, []);

  return { courses, loading };
}'
  fi
}

# 5) Fix backend route signatures back to req (to match body usage)
revert_backend_hints_req() {
  local file="$ROOT_DIR/apps/backend-nodejs/src/routes/hints.ts"
  [[ -f "$file" ]] || return
  echo "🔧 Reverting route param names back to req in hints.ts"
  sed -i 's/( _req: Request/(req: Request/g' "$file"
}

# 6) Scaffold backend firebase lib (to satisfy ../../lib/firebase)
scaffold_backend_firebase() {
  local file="$ROOT_DIR/apps/backend-nodejs/src/lib/firebase.ts"
  if [[ ! -f "$file" ]]; then
    echo "🔧 Scaffolding apps/backend-nodejs/src/lib/firebase.ts"
    write_file "$file" 'export const db = {
  // TODO: replace with actual Firestore instance
  collection: (_name: string) => ({ doc: (_id: string) => ({ set: async (_data: unknown) => {} }) }),
};'
  fi
}

# 7) Ensure shared-types zod exists and exports are set
ensure_shared_types_zod() {
  local zod="$ROOT_DIR/packages/shared-types/src/zod/index.ts"
  local pkg="$ROOT_DIR/packages/shared-types/package.json"
  [[ -f "$zod" ]] || {
    echo "🔧 Scaffolding shared-types/src/zod/index.ts"
    write_file "$zod" 'import { z } from "zod";

export const CourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
});'
  }
  if [[ -f "$pkg" ]]; then
    echo "🔧 Ensuring shared-types exports include ./zod"
    jq '.exports["./zod"] = {
      "import": "./dist/zod/index.js",
      "types": "./dist/zod/index.d.ts"
    }' "$pkg" > "$pkg.tmp" && mv "$pkg.tmp" "$pkg"
  fi
}

# 8) Build shared-types so zod dist exists
build_shared_types() {
  if [[ -d "$ROOT_DIR/packages/shared-types" ]]; then
    echo "🔧 Building packages/shared-types"
    (cd "$ROOT_DIR/packages/shared-types" && pnpm tsc -b || true)
  fi
}

# Run all tasks
fix_web_tsconfig
fix_web_shared_types_scope
remove_unused_react_import
scaffold_web_lib_files
revert_backend_hints_req
scaffold_backend_firebase
ensure_shared_types_zod
build_shared_types

echo "🎉 Fixes applied. Next:"
echo "   1) Install AWS SDK: pnpm add -w @aws-sdk/client-secrets-manager"
echo "   2) Re-run build:    pnpm tsc -b"
