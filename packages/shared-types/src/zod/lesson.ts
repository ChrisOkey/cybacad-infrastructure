// shared-types/src/lesson.ts
import { z } from "./setup";

/**
 * Zod schema for Lesson
 */
export const LessonSchema = z.object({
  id: z.string().openapi({ description: "Lesson ID" }),
  title: z.string().openapi({ description: "Lesson Title" }),
  moduleId: z.string().openapi({ description: "Parent Module ID" }),
  content: z.string().openapi({ description: "Markdown content" }).optional(),
}).openapi({
  description: "Schema for a lesson object",
  example: {
    id: "lesson_001",
    title: "Introduction to TypeScript",
    moduleId: "module_123",
    content: "## Welcome to TypeScript\nThis lesson covers the basics...",
  },
});

/**
 * TypeScript type for Lesson
 */
export type Lesson = z.infer<typeof LessonSchema>;
