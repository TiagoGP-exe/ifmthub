import * as z from "zod"

export const messageSchema = z.object({
  message: z
    .string()
    .min(1, "Message is too short")
    .max(1000, "Message is too long"),
})
