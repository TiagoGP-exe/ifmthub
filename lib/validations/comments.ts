import * as z from "zod"

export const commentsSchema = z.object({
  content: z.string().min(10, "Minimo 10 caracteres"),
})