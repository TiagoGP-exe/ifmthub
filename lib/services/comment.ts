import { api } from '../api'

export const setComment = async (idPost: string, content: string) => {
  const { data } = await api.post(`/comment`, {
    idPost,
    content
  })

  return data
}