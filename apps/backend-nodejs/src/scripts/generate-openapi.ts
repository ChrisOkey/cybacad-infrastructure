import { z } from "zod";

// ✅ Pull schemas directly from the shared-types package
import {
  CourseSchema,
  ModuleSchema,
  LessonSchema,
} from "@cybacad/shared-types/zod";

// ✅ Re-export schemas for convenience in the web app
export { CourseSchema, ModuleSchema, LessonSchema };

// ✅ Inferred TypeScript types from shared Zod schemas
export type Course = z.infer<typeof CourseSchema>;
export type Module = z.infer<typeof ModuleSchema>;
export type Lesson = z.infer<typeof LessonSchema>;

// ✅ Common API response wrapper for client-side fetches
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
