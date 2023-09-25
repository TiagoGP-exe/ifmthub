import axios from "axios"
import Cookies from "js-cookie"

import { BASE_API_URL } from "./constants"

export const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config: any) => {
  const token = Cookies.get("authToken")

  if (!token) return config

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  }
})
