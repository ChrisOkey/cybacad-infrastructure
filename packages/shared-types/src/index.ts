// 1. Export Setup
export * from "./zod/setup";

// 2. Export Schemas & Types explicitly
// This prevents the "Module has already exported a member" error

// Timeline (For AI Classroom)
export { TimelineEventSchema } from "./timeline";
export type { TimelineEvent } from "./timeline";

// Lesson
export { LessonSchema } from "./lesson";
export type { Lesson } from "./lesson";

// Module
export { ModuleSchema } from "./zod/module";
export type { Module } from "./zod/module";

// Course
export { CourseSchema } from "./zod/course";
export type { Course } from "./zod/course";

// Lab (If you have it)
export { LabSchema } from "./zod/lab";
export type { Lab } from "./zod/lab";