// packages/shared-types/zod/course.ts
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const CourseSchema = z.object({
  id: z.string().uuid().openapi({ example: "course_001" }),
  title: z.string().min(1).openapi({ example: "Mastering Firestore" }),
  description: z.string().optional().openapi({ example: "A complete guide to building apps with Firestore." }),
  category: z.string().openapi({ example: "Backend" }),
  isPublished: z.boolean().openapi({ example: true })
}).openapi("Course");
