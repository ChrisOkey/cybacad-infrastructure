// packages/shared-types/src/course.ts
import { z } from "./setup";

/**
 * ✅ Zod schema for Course
 * Used for runtime validation (API responses, Firestore data, etc.)
 */
export const CourseSchema = z.object({
  id: z.string().openapi({
    description: "Unique course identifier",
    example: "course_123",
  }),

  title: z.string().openapi({
    description: "Course title",
    example: "TypeScript for Beginners",
  }),

  description: z.string().openapi({
    description: "Course description",
    example: "Learn the fundamentals of TypeScript.",
  }),

  instructor: z.string().openapi({
    description: "Instructor name",
    example: "Jane Doe",
  }),

  thumbnail: z.string().url().openapi({
    description: "Thumbnail image URL",
    example: "https://example.com/course-thumb.jpg",
  }).optional(),

  progress: z.number().min(0).max(100).openapi({
    description: "Progress percentage (0–100)",
    example: 45,
  }).optional(),
})
.openapi({
  description: "Schema for a course object",
  example: {
    id: "course_123",
    title: "TypeScript for Beginners",
    description: "Learn the fundamentals of TypeScript.",
    instructor: "Jane Doe",
    thumbnail: "https://example.com/course-thumb.jpg",
    progress: 45,
  },
});

/**
 * ✅ TypeScript interface for compile‑time safety
 * This is the canonical shape used across frontend and backend.
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail?: string;
  progress?: number;
}

/**
 * ✅ Inferred type from Zod schema
 * Ensures schema and type stay aligned.
 */
export type CourseType = z.infer<typeof CourseSchema>;
