// apps/backend-nodejs/src/scripts/generate-openapi.ts
import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import Zod schemas using path aliases
import { CourseSchema } from "@shared-types/zod/index.js";
import { ModuleSchema } from "@shared-types/zod/index.js";
import { LessonSchema } from "@shared-types/zod/index.js";

// Register schemas
const registry = new OpenAPIRegistry();
registry.register("Course", CourseSchema);
registry.register("Module", ModuleSchema);
registry.register("Lesson", LessonSchema);

// Generate OpenAPI document
const generator = new OpenApiGeneratorV3(registry.definitions);
const openApiDoc = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "Cybacad API",
    version: "1.0.0"
  }
});

// Write to monorepo root
const outputPath = path.resolve(__dirname, "../../../openapi.json");
writeFileSync(outputPath, JSON.stringify(openApiDoc, null, 2));
console.log(`✅ OpenAPI spec generated at ${outputPath}`);
