// apps/web/src/lib/seed/types.ts

/**
 * Represents a course in the system.
 * Courses contain metadata and references to modules.
 */
export type Course = {
  id: string;
  title: string;
  instructor: string; // required
  description?: string;
  progress?: number;
  modules?: string[]; // array of module IDs
};

/**
 * Represents a module belonging to a course.
 * Modules contain metadata and references to lessons.
 */
export type Module = {
  id: string;
  title: string;
  description?: string;
  lessons: string[]; // array of lesson IDs
};

/**
 * Represents a lesson belonging to a module.
 * Lessons contain content and optional duration.
 */
export type Lesson = {
  id: string;
  title: string;
  content?: string;
  durationMinutes?: number;
  moduleId: string;
};

/**
 * Generic API response wrapper.
 */
export type ApiResponse<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};
