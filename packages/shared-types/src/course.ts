// packages/shared-types/src/course.ts
// shared-types/src/course.ts
import { z } from "zod";

/**
 * Zod schema for runtime validation
 */
export const CourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  instructor: z.string(),              // required
  thumbnail: z.string().url().optional(), // optional but present in UI/tests
  progress: z.number().min(0).max(100).optional(),
});

/**
 * TypeScript interface for compile‑time safety
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;   // ✅ required by UI + tests
  thumbnail?: string;   // ✅ optional, but needed for CourseCard
  progress?: number;    // ✅ optional
}

/**
 * Inferred type from Zod schema
 * Ensures schema and type stay aligned
 */
export type CourseType = z.infer<typeof CourseSchema>;

