import { z } from "zod";

// ✅ Import schemas from shared-types
import {
  CourseSchema,
  ModuleSchema,
  LessonSchema,
} from "@cybacad/shared-types/zod";

// ✅ Re-export schemas for convenience
export { CourseSchema, ModuleSchema, LessonSchema };

// ✅ Inferred TypeScript types
export type Course = z.infer<typeof CourseSchema>;
export type Module = z.infer<typeof ModuleSchema>;
export type Lesson = z.infer<typeof LessonSchema>;

// ✅ Common API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
