import { z } from "./zod/setup";
import { LessonSchema } from "./lesson"; // We import Lesson so we can nest them

/**
 * Zod schema for Module
 */
export const ModuleSchema = z.object({
  id: z.string().openapi({ description: "Module ID" }),
  title: z.string().openapi({ description: "Module Title" }),
  courseId: z.string().openapi({ description: "Parent Course ID" }),
  description: z.string().openapi({ description: "Module description" }).optional(),
  order: z.number().openapi({ description: "Ordering index within the course" }).optional(),
  
  // ✅ Allow nested lessons (Critical for the frontend to fetch everything in one go)
  lessons: z.array(LessonSchema).optional().openapi({ description: "List of lessons" }),
}).openapi({
  description: "Schema for a course module",
  example: {
    id: "module_01",
    title: "Injection Attacks",
    courseId: "CYBER-101",
    lessons: []
  },
});

export type Module = z.infer<typeof ModuleSchema>;