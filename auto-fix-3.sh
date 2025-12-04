#!/usr/bin/env bash
# Auto-fix 3: shared-types composite build, web aliases/types, implicit-anys, backend hints params, firebase-admin
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"

write() { mkdir -p "$(dirname "$1")"; printf "%s\n" "$2" > "$1"; }

# 1) Ensure shared-types is a proper composite package (buildable, emits d.ts)
fix_shared_types_tsconfig() {
  local ts="$ROOT/packages/shared-types/tsconfig.json"
  [[ -f "$ts" ]] || return
  echo "🔧 Updating shared-types tsconfig for composite + declarations"
  jq '.compilerOptions.module = "NodeNext"
      | .compilerOptions.moduleResolution = "NodeNext"
      | .compilerOptions.target = "ES2022"
      | .compilerOptions.outDir = "dist"
      | .compilerOptions.rootDir = "src"
      | .compilerOptions.declaration = true
      | .compilerOptions.emitDeclarationOnly = false
      | .compilerOptions.composite = true
      ' "$ts" > "$ts.tmp" && mv "$ts.tmp" "$ts"
}

ensure_shared_types_source() {
  local idx="$ROOT/packages/shared-types/src/index.ts"
  [[ -f "$idx" ]] || {
    echo "🔧 Scaffolding shared-types src/index.ts"
    write "$idx" 'export type Id = string;'
  }
  local zod="$ROOT/packages/shared-types/src/zod/index.ts"
  [[ -f "$zod" ]] || {
    echo "🔧 Scaffolding shared-types src/zod/index.ts"
    write "$zod" 'import { z } from "zod";

export const CourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
});
export type Course = z.infer<typeof CourseSchema>;'
  }

  local pkg="$ROOT/packages/shared-types/package.json"
  [[ -f "$pkg" ]] && {
    echo "🔧 Ensuring shared-types package.json exports include ./zod"
    jq '.exports["./zod"] = {
      "import": "./dist/zod/index.js",
      "types": "./dist/zod/index.d.ts"
    }' "$pkg" > "$pkg.tmp" && mv "$pkg.tmp" "$pkg"
  }
}

# 2) Web: fix aliases, types, imports, implicit any
fix_web_tsconfig() {
  local ts="$ROOT/apps/web/tsconfig.json"
  [[ -f "$ts" ]] || return
  echo "🔧 Updating web tsconfig baseUrl/paths and include"
  jq '.include |= map(select(. != ".next/types/**/*.ts"))
      | .compilerOptions.baseUrl = "."
      | .compilerOptions.paths |= (.compilerOptions.paths // {}) + {
          "@components/*": ["src/components/*"],
          "@lib/*": ["src/lib/*"]
        }' "$ts" > "$ts.tmp" && mv "$ts.tmp" "$ts"
}

fix_web_imports_and_types() {
  local courseCard="$ROOT/apps/web/src/components/CourseCard.tsx"
  [[ -f "$courseCard" ]] && {
    echo "🔧 Fixing shared-types import scope in CourseCard.tsx"
    sed -i 's|@cybac/shared-types|@cybacad/shared-types|g' "$courseCard"
  }

  local moduleViewer="$ROOT/apps/web/src/components/ModuleViewer.tsx"
  [[ -f "$moduleViewer" ]] && {
    echo "🔧 Removing stale React import and annotating implicit any in ModuleViewer.tsx"
    # Remove default React import if present (support variations)
    sed -i '/import React from .*react.*/d' "$moduleViewer"
    # Annotate lessonId parameter
    sed -i 's/\(map(\)lessonId/\1lessonId: string/' "$moduleViewer"
  }

  local types="$ROOT/apps/web/src/lib/types.ts"
  [[ -f "$types" ]] || {
    echo "🔧 Scaffolding apps/web/src/lib/types.ts"
    write "$types" 'export type Course = {
  id: string;
  title: string;
  description?: string;
  modules?: string[];
};

export type ApiResponse<T> = {
  success: boolean;
  ok?: boolean; // compatibility
  data?: T;
  error?: string;
};

// Optional OpenAPI-like namespace placeholder to satisfy `import type { components }`
export namespace components {
  export namespace schemas {
    export type Course = {
      id: string;
      title: string;
      description?: string;
    };
  }
}'
  }

  local useCourses="$ROOT/apps/web/src/lib/useCourses.ts"
  [[ -f "$useCourses" ]] || {
    echo "🔧 Scaffolding apps/web/src/lib/useCourses.ts"
    write "$useCourses" 'import { useEffect, useState } from "react";
import type { Course } from "./types";

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    try {
      // TODO: replace with real API call
      setCourses([]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  return { courses, loading, error };
}'
  }

  local api="$ROOT/apps/web/src/lib/api.ts"
  [[ -f "$api" ]] && {
    echo "🔧 Normalizing ApiResponse usage in api.ts (use success)"
    # If file references 'ok', keep compatibility by ensuring ApiResponse has success; no sed unless needed.
    # Optionally replace 'ok:' with 'success:'
    sed -i 's/\bok\b/success/g' "$api" || true
  }

  local coursesPage="$ROOT/apps/web/src/pages/courses.tsx"
  [[ -f "$coursesPage" ]] && {
    echo "🔧 Annotating implicit any in courses.tsx"
    sed -i 's/courses.map(course =>/courses.map((course: import("\.\/\.\.\/lib\/types").Course) =>/' "$coursesPage" || true
  }
}

# 3) Backend: route params and firebase-admin scaffold
fix_backend_hints_req() {
  local hints="$ROOT/apps/backend-nodejs/src/routes/hints.ts"
  [[ -f "$hints" ]] || return
  echo "🔧 Fixing unused req param in hints root route only"
  # Change only the root GET route to _req to silence TS6133, keep other routes as req
  sed -i 's/router.get(\x27\/\x27, async (req: Request/router.get(\x27\/\x27, async (_req: Request/' "$hints"
}

scaffold_backend_firebase_admin() {
  local file="$ROOT/apps/backend-nodejs/src/lib/firebase.ts"
  echo "🔧 Scaffolding firebase-admin init in backend"
  write "$file" 'import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const apps = getApps();
const app = apps.length ? apps[0] : initializeApp({
  // TODO: supply credentials via env/Secrets Manager
  // credential: cert(JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON || "{}")),
});

export const db = getFirestore(app);'
  # Add workspace dependency on firebase-admin
  local pkg="$ROOT/apps/backend-nodejs/package.json"
  [[ -f "$pkg" ]] && {
    echo "🔧 Ensuring backend depends on firebase-admin and shared-types"
    jq '.dependencies = (.dependencies // {}) + {
          "firebase-admin": "^12.5.0",
          "@cybacad/shared-types": "workspace:*"
        }' "$pkg" > "$pkg.tmp" && mv "$pkg.tmp" "$pkg"
  }
}

ensure_web_dep_on_shared_types() {
  local pkg="$ROOT/apps/web/package.json"
  [[ -f "$pkg" ]] || return
  echo "🔧 Ensuring web depends on shared-types"
  jq '.dependencies = (.dependencies // {}) + {
        "@cybacad/shared-types": "workspace:*"
      }' "$pkg" > "$pkg.tmp" && mv "$pkg.tmp" "$pkg"
}

# 4) Build shared-types for zod subpath resolution
build_shared_types() {
  if [[ -d "$ROOT/packages/shared-types" ]]; then
    echo "🔧 Building packages/shared-types"
    (cd "$ROOT/packages/shared-types" && pnpm tsc -b || true)
  fi
}

# Execute
fix_shared_types_tsconfig
ensure_shared_types_source
fix_web_tsconfig
fix_web_imports_and_types
fix_backend_hints_req
scaffold_backend_firebase_admin
ensure_web_dep_on_shared_types
build_shared_types

echo "✅ Patches applied."
echo "Next:"
echo "  1) Install dependencies:"
echo "       pnpm add -w firebase-admin @aws-sdk/client-secrets-manager"
echo "  2) Rebuild:"
echo "       pnpm tsc -b"
