import { api } from '../api'

export const setFavorite = async (idPost: string) => {
  const { data } = await api.post(`/post/favorite/${idPost}`)

  return data
}
