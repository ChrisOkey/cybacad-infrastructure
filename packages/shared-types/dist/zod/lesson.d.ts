import { z } from "zod";
export declare const LessonSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    content: z.ZodString;
    durationMinutes: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type Lesson = z.infer<typeof LessonSchema>;
//# sourceMappingURL=lesson.d.ts.map