import { api } from '../api'

export const setComment = async (idPost: number, content: string) => {
  const {data} = await api.post(`/comment`, {
    idPost,
    content
  })

  return data
}