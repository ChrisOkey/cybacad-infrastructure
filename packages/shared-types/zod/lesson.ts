// packages/shared-types/zod/lesson.ts
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const LessonSchema = z.object({
  id: z.string().uuid().openapi({ example: "lesson_001" }),
  moduleId: z.string().uuid().openapi({ example: "module_001" }),
  title: z.string().min(1).openapi({ example: "Understanding Firestore Queries" }),
  content: z.string().openapi({ example: "This lesson covers compound queries and indexing in Firestore." }),
  order: z.number().int().min(1).openapi({ example: 1 }),
  isPublished: z.boolean().openapi({ example: true })
}).openapi("Lesson");
