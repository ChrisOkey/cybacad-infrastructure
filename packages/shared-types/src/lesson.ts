// packages/shared-types/src/lesson.ts
import { z } from "./setup";
import { TimelineEventSchema } from "./timeline"; // Import the new schema

/**
 * Zod schema for Lesson
 */
export const LessonSchema = z.object({
  id: z.string().openapi({ description: "Lesson ID" }),
  title: z.string().openapi({ description: "Lesson Title" }),
  moduleId: z.string().openapi({ description: "Parent Module ID" }),
  
  // ✅ 1. Add Lesson Type
  type: z.enum(["text", "video", "interactive_lab", "quiz"]).default("text").openapi({ description: "Type of lesson" }),
  
  // ✅ 2. Existing Content (Text/Markdown)
  content: z.string().openapi({ description: "Markdown content" }).optional(),

  // ✅ 3. AI Classroom Fields (Optional)
  videoUrl: z.string().url().optional().openapi({ description: "URL for video (MP4/YouTube)" }),
  initialCode: z.string().optional().openapi({ description: "Starting code for the editor" }),
  
  // ✅ 4. The Timeline (Array of Events)
  timeline: z.array(TimelineEventSchema).optional().openapi({ description: "Sync events for AI Tutor" }),

}).openapi({
  description: "Schema for a lesson object",
  example: {
    id: "lesson_001",
    title: "Intro to Hashing",
    moduleId: "module_01",
    type: "interactive_lab",
    videoUrl: "https://youtube.com/...",
    initialCode: "# Python Security Lab",
    timeline: [{ triggerTime: 5, action: "UPDATE_CODE", payload: "import os" }]
  },
});

export type Lesson = z.infer<typeof LessonSchema>;