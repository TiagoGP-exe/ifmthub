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

// , {
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
// }

export interface GetPostProps {
  idPost: string
  author: Author
  category: Category
  tags: Tag[]
  title: string
  subtitle: string
  content: string
  dateCreated: string
  urlImgPost: string
  status: boolean
  photo: string
}

interface Author {
  idUser: number
  email: string
  fullName: string
  gender: string
  dateCreated: string
  birthDate: string
  urlImgProfile: string
  photo: string
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
  photo: string
  idPost: string
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
  bookmarked: boolean
  favorited: boolean
  countFavorites: number
  countBookmarks: number
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
  photo: string
}


export const getPostById = async (id: string) => {
  const { data } = await api.get(`/post/${id}`)

  return data as GetPostByIdProps
}

export const postFilter = async (title: string) => {
  const { data } = await api.get(`/post/filter?query=${title}`)

  return data as GetPostByIdProps[]
}

export const postUpdateImage = async (idUser: number, data: FormData) => {
  const { data: post } = await api.post(`/post/${idUser}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return post
}

interface Tendency {
  author: {
    idUser: number
    email: string
    fullName: string
    gender: string
    dateCreated: string
    birthDate: string
    photo: string
  },
  title: string
  dateCreated: string
  idPost: number
}

export const getTendency = async () => {
  const { data } = await api.get("post/tendency")

  return data as Tendency[]
}

