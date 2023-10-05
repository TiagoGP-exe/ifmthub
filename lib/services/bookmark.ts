import { api } from '../api'
import { GetPostByIdProps } from './post'

export const setBookmark = async (idPost: string) => {
  const { data } = await api.post(`/post//bookmark/${idPost}`)

  return data
}

export const getBookmark = async (token?: string) => {
  const { data } = await api.get(`/post/bookmark`, token ? {
    headers: {
      Authorization: `Bearer ${token}`
    }
  } : {})

  return data as GetPostByIdProps[]
}