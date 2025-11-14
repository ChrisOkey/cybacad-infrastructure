import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

// Patch Zod to support .openapi()
extendZodWithOpenApi(z);

export const LessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  durationMinutes: z.number().optional()
}).openapi({
  description: "Schema for a lesson object",
  example: {
    id: "lesson-001",
    title: "Introduction to Zod",
    content: "Learn how to define schemas with Zod.",
    durationMinutes: 45
  }
});

export type Lesson = z.infer<typeof LessonSchema>;
