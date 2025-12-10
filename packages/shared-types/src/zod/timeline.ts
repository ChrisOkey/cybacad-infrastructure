import { z } from "./setup"; // Adjust path if your setup is elsewhere

/**
 * Zod Schema for AI Classroom Timeline Events
 */
export const TimelineEventSchema = z.object({
  triggerTime: z.number().openapi({ description: "Time in seconds to trigger event" }),
  action: z.enum(["UPDATE_CODE", "PAUSE_CHALLENGE", "HIGHLIGHT_LINE"]).openapi({ description: "Type of action" }),
  payload: z.any().openapi({ description: "The code to type or text to display" }),
}).openapi({
  description: "An event that happens at a specific second in the video",
  example: {
    triggerTime: 15,
    action: "UPDATE_CODE",
    payload: "import hashlib"
  }
});

export type TimelineEvent = z.infer<typeof TimelineEventSchema>;