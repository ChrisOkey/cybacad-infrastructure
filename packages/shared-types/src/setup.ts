// ✅ CORRECT: Import from the "zod" package installed in node_modules
import { z } from "zod"; 
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

// Patch the instance
extendZodWithOpenApi(z);

// Export it for other files to use
export { z };