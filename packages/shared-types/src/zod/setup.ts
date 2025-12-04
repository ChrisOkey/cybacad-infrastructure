// packages/shared-types/src/zod/setup.ts

// 1. Import the real library
import { z } from "zod"; 
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

// 2. Patch it
extendZodWithOpenApi(z);

// 3. Export it so other files can use it
export { z };