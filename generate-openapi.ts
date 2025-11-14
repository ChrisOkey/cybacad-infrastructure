import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Import Zod schemas from the shared types directory
import {
  CourseSchema,
  LessonSchema,
  ModuleSchema
} from './packages/shared-types/src/zod';

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create registry and register schemas
const registry = new OpenAPIRegistry();

registry.register('Course', CourseSchema);
registry.register('Lesson', LessonSchema);
registry.register('Module', ModuleSchema);

// Generate OpenAPI document
const generator = new OpenApiGeneratorV3(registry.definitions);
const document = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'Cybacad API',
    version: '1.0.0',
    description: 'OpenAPI schema generated from Zod definitions for Cybacad backend.',
  },
});

// Add paths manually if needed
document.paths = {}; // You can add endpoint definitions later

// Output path
const outputPath = path.resolve(__dirname, '../openapi.json');

// Write to file
writeFileSync(outputPath, JSON.stringify(document, null, 2));

console.log(`✅ OpenAPI schema generated at: ${outputPath}`);