import { z } from "zod";

// --- 1. TIMELINE EVENTS (The "Brain" of the AI Classroom) ---
// This defines the auto-typing and pause events.
export const TimelineEventSchema = z.object({
  triggerTime: z.number(),       // When does it happen? (e.g., 5 seconds)
  action: z.enum(["UPDATE_CODE", "PAUSE_CHALLENGE", "HIGHLIGHT_LINE"]), 
  payload: z.any(),              // The code to type or the hint text
});

// --- 2. LESSON SCHEMA ---
// A lesson can be a video, a reading, or an AI Lab.
export const LessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(["text", "video", "interactive_lab", "quiz"]),
  
  // Content for standard lessons
  content: z.string().optional(), // Markdown text

  // ✅ AI Classroom Specific Fields (Optional, only for 'interactive_lab')
  videoUrl: z.string().url().optional(),
  initialCode: z.string().optional(),    // Starting Python/JS code
  timeline: z.array(TimelineEventSchema).optional(),
});

// --- 3. MODULE SCHEMA ---
// A container for lessons
export const ModuleSchema = z.object({
  id: z.string(),
  title: z.string(),
  order: z.number().optional(),
  lessons: z.array(LessonSchema),
});

// --- 4. COURSE SCHEMA (Updated) ---
/**
 * Zod schema for runtime validation
 */
export const CourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  instructor: z.string(),                // required
  thumbnail: z.string().url().optional(), // optional but present in UI
  progress: z.number().min(0).max(100).optional(),
  
  // ✅ NEW: Structure the hierarchy
  modules: z.array(ModuleSchema).optional(), 
});

// --- 5. TYPESCRIPT INTERFACES (Inferred) ---
/**
 * Inferred types ensure your TypeScript code always matches your Zod validation.
 */
export type TimelineEvent = z.infer<typeof TimelineEventSchema>;
export type Lesson = z.infer<typeof LessonSchema>;
export type Module = z.infer<typeof ModuleSchema>;
export type Course = z.infer<typeof CourseSchema>;