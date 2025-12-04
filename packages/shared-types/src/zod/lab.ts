// packages/shared-types/src/zod/lab.ts
import { z } from "./setup";

export const LabSchema = z.object({
  id: z.string().openapi({ description: "Unique lab identifier" }),
  title: z.string().openapi({ description: "Lab title" }),
  difficulty: z.string().optional().openapi({ description: "Difficulty level" }),
}).openapi({
  description: "Schema for a lab object",
  example: { id: "l1", title: "Intro Lab", difficulty: "easy" }
});

export type Lab = z.infer<typeof LabSchema>;
