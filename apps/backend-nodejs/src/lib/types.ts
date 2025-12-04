import { z } from 'zod';

// ✅ Define schemas once
export const CourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  instructor: z.string(),
  progress: z.number().optional(),
});

export const ModuleSchema = z.object({
  id: z.string(),
  title: z.string(),
  lessons: z.array(z.string()),
});

export const LessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});

// ✅ Inferred types
export type Course = z.infer<typeof CourseSchema>;
export type Module = z.infer<typeof ModuleSchema>;
export type Lesson = z.infer<typeof LessonSchema>;

// ✅ Common API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

