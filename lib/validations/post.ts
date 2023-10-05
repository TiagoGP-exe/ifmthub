import * as z from "zod"

export const postFilterSchema = z.object({
  search: z.string().min(3, "Minimo 3 caracteres"),
})