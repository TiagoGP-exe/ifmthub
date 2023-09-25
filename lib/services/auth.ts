import { api } from "../api"

export const signIn = async (email: string, password: string) => {
  const { data } = await api.post("/auth/login", {
    email,
    password,
  })

  return data
}

interface SignUpProps {
  email: string
  password: string
  fullName: string
  gender: string
  birthDate: string
  urlImgProfile: string
}

export const signUp = async (props: SignUpProps) => {
  const { data } = await api.post("/auth/register", props)

  return data
}
