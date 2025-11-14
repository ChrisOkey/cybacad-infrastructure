import { z } from "zod";
export declare const CourseSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    instructor: z.ZodString;
    progress: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type Course = z.infer<typeof CourseSchema>;
//# sourceMappingURL=course.d.ts.map