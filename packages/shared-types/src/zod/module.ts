// shared-types/src/module.ts
import { z } from "./setup";

/**
 * Zod schema for Module
 */
export const ModuleSchema = z.object({
  id: z.string().openapi({ description: "Module ID" }),
  title: z.string().openapi({ description: "Module Title" }),
  courseId: z.string().openapi({ description: "Parent Course ID" }),
  description: z.string().openapi({ description: "Module description" }).optional(),
  order: z.number().openapi({ description: "Ordering index within the course" }).optional(),
}).openapi({
  description: "Schema for a course module object",
  example: {
    id: "module_001",
    title: "Getting Started with TypeScript",
    courseId: "course_123",
    description: "This module introduces the basics of TypeScript.",
    order: 1,
  },
});

/**
 * TypeScript type for Module
 */
export type Module = z.infer<typeof ModuleSchema>;
