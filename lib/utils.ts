import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const formatDate = (input: string | number): string => {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export const absoluteUrl = (path: string) =>
  `${process.env.NEXT_PUBLIC_APP_URL}${path}`

export const abrevText = (text: string) =>
  text
    .split(" ")
    .map((item) => item[0])
    .join("")

type ItemNavVariants = "default" | "active" | "withBg" | "activeWithBg"

export const selectCorrectVariant = (
  id: string,
  index: string,
  img?: string
): ItemNavVariants => {
  if (id === index) {
    if (img) {
      return "active"
    }
    return "activeWithBg"
  } else {
    if (img) {
      return "default"
    }
    return "withBg"
  }
}

export const messageHandler = (io: any, socket: any) => {
  const createdMessage = (msg: string) => {
    socket.broadcast.emit("newIncomingMessage", msg)
  }

  socket.on("createdMessage", createdMessage)
}

export const socketInitializer = async (setMessages: (values: any) => void) => {
  // We just call it because we don't need anything else out of it
  // try {
  //   await fetch("/api/socket")
  // } catch (error) {
  //   console.log(error)
  // }
}
