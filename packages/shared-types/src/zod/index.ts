// packages/shared-types/src/index.ts

export { CourseSchema } from "./course";
export type { Course } from "./course";

export { LessonSchema } from "./lesson";
export type { Lesson } from "./lesson";

export { ModuleSchema } from "./module";
export type { Module } from "./module";

// ✅ NEW: Add the Timeline Schema (Critical for AI Auto-Typing)
export { TimelineEventSchema } from "./timeline";
export type { TimelineEvent } from "./timeline";

export { LabSchema } from "./lab";
export type { Lab } from "./lab";