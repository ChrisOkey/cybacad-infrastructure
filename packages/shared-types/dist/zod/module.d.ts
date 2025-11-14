import { z } from "zod";
export declare const ModuleSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    lessons: z.ZodArray<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type Module = z.infer<typeof ModuleSchema>;
//# sourceMappingURL=module.d.ts.map