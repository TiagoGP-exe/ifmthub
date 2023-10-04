import { api } from '../api'

interface PostProps {
  idAuthor: number
  category: CategoryProps
  tags: TagProps[]
  title: string
  content: string
  urlImgPost: string
  subtitle: string
}

export interface CategoryProps {
  description: string
}

export interface TagProps {
  description: string
}


export const setPost = async (post: PostProps) => {
  const { data } = await api.post("/post", post)

  return data
}

export interface GetPostProps {
  idPost: number
  author: Author
  category: Category
  tags: Tag[]
  title: string
  subtitle: string
  content: string
  dateCreated: string
  urlImgPost: string
  status: boolean
}

interface Author {
  idUser: number
  email: string
  fullName: string
  gender: string
  dateCreated: string
  birthDate: string
  urlImgProfile: string
}

interface Category {
  idCategory: number
  description: string
  dateCreated: string
  status: boolean
}

interface Tag {
  idTag: number
  description: string
  dateCreated: string
  status: boolean
}

export const getPosts = async () => {
  const { data } = await api.get("/post")

  return data as GetPostProps[]
}

export interface GetPostByIdProps {
  idPost: number
  author: Author
  category: Category
  tags: Tag[]
  comments: Comment[]
  title: string
  subtitle: string
  content: string
  dateCreated: string
  urlImgPost: string
  status: boolean
}

export interface Comment {
  idComment: number
  commenter: Commenter
  idPost: number
  content: string
  dateCreated: string
  status: boolean
}

export interface Commenter {
  idUser: number
  email: string
  fullName: string
  gender: string
  dateCreated: string
  birthDate: string
  urlImgProfile: string
}


export const getPostById = async (id: string, token?: string) => {
  const { data } = await api.get(`/post/${id}`, token ? {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }: {})

  return data as GetPostByIdProps
}