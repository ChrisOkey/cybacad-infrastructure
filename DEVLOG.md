# Cybacad Project Status & Context

## 🏗 Architecture
* **Type:** PNPM Monorepo
* **Frontend:** `apps/cybacad-frontend` (Next.js 14 App Router, Tailwind v4, Lucide Icons)
* **Backend:** `apps/backend-nodejs` (Node scripts, Firebase Admin SDK, Seed scripts)
* **Shared UI:** `packages/ui` (Exports generic components like `CodeEditor`, `DashboardLayout`)
* **Shared Types:** `packages/shared-types` (Zod schemas for Course, Module, Lesson)

## 🛠 Critical Configuration Details
1. **Imports:** The Frontend imports UI components directly from source (`packages/ui/src/index.ts`) via `tsconfig` paths to enable hot reloading and bypass stale builds.
2. **Build:** We must run `pnpm --filter @cybacad/ui build` if we change UI exports to update `.d.ts` files for the IDE.
3. **Database:** Using Firebase Local Emulators.
   - Auth is effectively disabled/mocked for now.
   - Firestore Rules allow public read (`if true`) for `courses` to prevent "Blank Blue Screen" in dev.

## 📦 Key Components
* **CodeEditor:** Uses `@codesandbox/sandpack-react` with a custom Dark Theme. Located in `packages/ui`.
* **LearningIDE:** The main page at `/learning-ide`. Uses `useCourseData` hook with a Mock Data fallback if the backend API is offline.
* **DashboardLayout:** Fixes CSS layering issues using `flex-row`, `shrink-0`, and specific `z-index` values to ensure the sidebar doesn't cover content.

## ✅ Current Status (Last Updated)
* Monorepo build is **Green** (Success).
* `seed.ts` script is moved to Backend and successfully seeds the Emulator.
* Tailwind v4 classes (`shrink-0`, `grow`) are fixed.
* Dashboard Layout is fixed (Sidebar z-index issue resolved).
* "Blank Blue Screen" fixed by enabling public read rules in Firestore.

## 🚀 How to Start Development
1. **Terminal 1 (Database):** `firebase emulators:start --import=./firebase-data --export-on-exit`
2. **Terminal 2 (App):** `pnpm --filter cybacad-frontend dev`
3. **Seed DB (If empty):** `export FIRESTORE_EMULATOR_HOST="127.0.0.1:8080" && pnpm --filter backend-nodejs exec tsx src/scripts/seed.ts`

## 🔜 Next Steps
* **Phase 1:** Implement "Real" Content. Create a seed script for "Module 1: Web Security Fundamentals" with proper markdown instructions and code challenges.