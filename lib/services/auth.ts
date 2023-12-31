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
}

export const signUp = async (props: SignUpProps) => {
  const { data } = await api.post("/auth/register", props)

  return data
}

export const updateImage = async (idUser: number, data: FormData) => {
  const { data: user } = await api.post(`/auth/register/${idUser}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return user
}


export const confirmEmail = async (token: string) => {
  const { data } = await api.get(`/auth/confirm?token=${token}`)

  return data
}
