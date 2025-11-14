import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);
export const CourseSchema = z.object({
    id: z.string(),
    title: z.string(),
    instructor: z.string(),
    progress: z.number().optional()
}).openapi({ description: "Course schema" });
//# sourceMappingURL=course.js.map