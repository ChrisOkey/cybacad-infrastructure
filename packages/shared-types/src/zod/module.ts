import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

// Patch Zod to support .openapi()
extendZodWithOpenApi(z);

export const ModuleSchema = z.object({
  id: z.string(),
  title: z.string(),
  lessons: z.array(z.string()),
  description: z.string().optional()
}).openapi({
  description: "Schema for a module containing lessons",
  example: {
    id: "module-001",
    title: "Getting Started with TypeScript",
    lessons: ["lesson-001", "lesson-002"],
    description: "Introductory module for TypeScript basics"
  }
});

export type Module = z.infer<typeof ModuleSchema>;
