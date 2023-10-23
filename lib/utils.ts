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

export const getFileDimensions = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      reject(new Error("Failed to load the image file."));
    };
    img.src = URL.createObjectURL(file);
  });
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


export const convertImageToBase64 = (imgUrl: string, callback?: (dataUrl: string) => void) => {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = image.naturalHeight;
    canvas.width = image.naturalWidth;
    ctx?.drawImage(image, 0, 0);
    const dataUrl = canvas.toDataURL();
    callback && callback(dataUrl)
  }
  image.src = imgUrl;
  return imgUrl
}