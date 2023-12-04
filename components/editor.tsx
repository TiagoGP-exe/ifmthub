"use client"
// @ts-nocheck

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import EditorJS from "@editorjs/editorjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import * as z from "zod"

import "../styles/editor.css"
import { toast } from './ui/use-toast'
import { cn, getFileDimensions } from '../lib/utils'
import { buttonVariants } from './ui/button'
import { Icons } from './icons'
import imageCompression from 'browser-image-compression'
import { useAuth } from './use-auth'
import { ImageInput } from './Image-input'
import { Input } from './ui/input'
import { Avatar } from './avatar-and-status'
import Image from 'next/image'
import { postUpdateImage, setPost } from '../lib/services/post'

interface EditorProps {
  post: Pick<any, "id" | "title" | "content" | "published" | "readOnly" | "tags" | "postImage">
  author?: any
}

type FormData = { tags: string, title: string, content: string, photo: File, subtitle: string, }

const compressImage = async (file: File): Promise<File> => {
  const result = await getFileDimensions(file);

  const minorDimension = Math.min(result.width, result.height);

  const compressedFiles = await imageCompression(file, {
    maxWidthOrHeight: minorDimension < 1080 ? minorDimension : 1080,
    alwaysKeepResolution: true,
    maxSizeMB: 1
  });
  return compressedFiles
}

export function Editor({ post, author }: EditorProps) {
  const { register, handleSubmit, getValues, setValue } = useForm<FormData>({
    // resolver: zodResolver(),
  })
  const ref = React.useRef<EditorJS>()
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [isMounted, setIsMounted] = React.useState<boolean>(false)
  const { user } = useAuth()


  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Embed = (await import("@editorjs/embed" as any)).default
    const Table = (await import("@editorjs/table" as any)).default
    const List = (await import("@editorjs/list" as any)).default
    const Code = (await import("@editorjs/code" as any)).default
    const LinkTool = (await import("@editorjs/link" as any)).default
    const InlineCode = (await import("@editorjs/inline-code" as any)).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: {
          blocks: post.content.blocks
        },
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
        readOnly: post.readOnly,
      })
    }
  }, [post.content, post.readOnly])

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const formData = new FormData()

    const blocks = await ref.current?.save()

    const tags = getValues("tags").split(",").map((item: string) => item.trim())

    const formattedData = {
      idAuthor: user?.idUser as number,
      category: {
        description: "test",
      },
      tags: tags.map((item: any) => ({
        description: item
      })),
      title: data.title,
      content: JSON.stringify(blocks),
      urlImgPost: "",
      subtitle: blocks?.blocks[0]?.data?.text,
    }

    try {
      const newPost = await setPost(formattedData)

      if (!!data.photo) {
        const compressedFiles = await compressImage(data.photo)
        formData.append("file", compressedFiles)
        await postUpdateImage(newPost.idPost, formData)
      }

      router.refresh()

      toast({
        description: "Your post has been saved.",
      })

      router.push(`/post/${newPost.idPost}`)
      return
    } catch (error) {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col items-center justify-center px-4">
        <div className="flex w-full max-w-[650px] items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </div>
          {!post.readOnly && <button type="submit" className={cn(buttonVariants())}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>}
        </div>
        <div className="prose prose-stone dark:prose-invert mx-auto mt-8 w-full max-w-[650px]">
          {!post.readOnly && <ImageInput initialImage={post.postImage} saveImage={(e) => setValue("photo", e)} className='mb-4 w-full ' onError={(e) => e.preventDefault()} />}
          {!post.readOnly && <Input
            {...register("tags")}
            placeholder='tags'
            className='mb-4'
          />}
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={post.title}
            placeholder="Post title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-4xl font-bold focus:outline-none"
            {...register("title")}
            disabled={post.readOnly}
          />
          {post.readOnly && author?.fullName &&
            <div className=' mt-4 flex  items-center gap-3 border-y py-4'>
              <Avatar
                className='h-10 w-10'
                disabled
                name={author?.fullName}
                imgURL={`data:image/png;base64, ${author?.photo}` ?? author?.urlImgProfile}
              />
              <div className='flex flex-col justify-between '>
                <span className='font-heading text-sm'>{author?.fullName}</span>
                <span className='text-foreground/40 text-xs'>
                  {new Date(post.published).toLocaleDateString()}
                </span>
              </div>
            </div>
          }
          {post.readOnly &&
            <Image
              src={post.postImage}
              alt=""
              width={1080}
              height={100}
              className="bg-foreground/10 aspect-[7/3] w-full rounded-md object-cover"
            />
          }
          <div id="editor" className="min-h-[500px]" />
          {!post.readOnly && <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="bg-muted rounded-md border px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            para abrir o menu de comando.
          </p>}
        </div>
      </div>
    </form>
  )
}