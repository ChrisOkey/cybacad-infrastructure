// packages/shared-types/zod/module.ts
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const ModuleSchema = z.object({
  id: z.string().uuid().openapi({ example: "module_001" }),
  courseId: z.string().uuid().openapi({ example: "course_001" }),
  title: z.string().min(1).openapi({ example: "Firestore Fundamentals" }),
  description: z.string().optional().openapi({ example: "Learn how Firestore stores and retrieves data." }),
  order: z.number().int().min(1).openapi({ example: 1 }),
  isPublished: z.boolean().openapi({ example: true })
}).openapi("Module");
