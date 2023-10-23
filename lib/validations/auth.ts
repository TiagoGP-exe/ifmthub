import * as z from "zod"

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, " Senha deve ter no mínimo 6 caracteres"),
})


const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const registerAuthSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, " Senha deve ter no mínimo 6 caracteres"),
  fullName: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  gender: z.string({
    required_error: "O gênero é obrigatório",
  }),
  birthDate: z.string({
    required_error: "A data de nascimento é obrigatória",
  }),
  photo: z.any()
})
