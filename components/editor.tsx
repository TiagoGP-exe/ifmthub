"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import EditorJS from "@editorjs/editorjs"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"

import "../styles/editor.css"
import { toast } from './ui/use-toast'
import { cn } from '../lib/utils'
import { buttonVariants } from './ui/button'
import { Icons } from './icons'
import { Input } from './ui/input'
import { ImageIcon } from 'lucide-react'
import { ImageInput } from './Image-input'
import { setPost } from '../lib/services/post'
import { useAuth } from './use-auth'
import { Avatar } from './avatar-and-status'
interface EditorProps {
  post: Pick<any, "id" | "title" | "content" | "published" | "readOnly" | "tags">
  author?: any
}

type FormData = { tags: string, title: string }

export function Editor({ post, author }: EditorProps) {
  const { register, handleSubmit, getValues } = useForm<FormData>()
  const ref = React.useRef<EditorJS>()
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [isMounted, setIsMounted] = React.useState<boolean>(false)
  const { user } = useAuth()


  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header" as any)).default
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

    const blocks = await ref.current?.save()

    const tags = getValues("tags").split(" ").map(item => item.trim())

    try {
      await setPost({
        idAuthor: user?.idUser as number,
        category: {
          description: "test",
        },
        tags: tags.map(item => ({
          description: item
        })),
        title: data.title,
        content: JSON.stringify(blocks),
        urlImgPost: "",
        subtitle: blocks?.blocks[0]?.data?.text,
      })

      router.refresh()

      return toast({
        description: "Your post has been saved.",
      })

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
      <div className="flex w-full flex-col items-center justify-center gap-10 px-4">
        {!post.readOnly && <div className="flex w-11/12 max-w-screen-lg items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </>
            </Link>
            <p className="text-muted-foreground text-sm">
              {post.published ? "Published" : "Draft"}
            </p>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </div>}
        <div className="prose prose-stone dark:prose-invert mx-auto w-full md:max-w-[650px]">
          {!post.readOnly && <ImageInput className='mb-4 w-full' />}
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
            className="text-foreground font-heading w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl focus:outline-none"
            {...register("title")}
            disabled={post.readOnly}
          />

          {post.readOnly && author?.fullName &&
            <div className='mb-6 mt-2 flex items-center gap-3 '>
              <Avatar
                name={author?.fullName}
                imgURL={author?.urlImgProfile ?? ""}
              />
              <div className='flex h-10 flex-col justify-between font-medium'>
                <span className=' text-sm '>{author?.fullName}</span>
                <span className='text-foreground/40 text-xs'>{
                  new Date(post.published).toLocaleDateString()
                }</span>
              </div>
            </div>
          }
          {
            post.readOnly && post.tags.length > 0 && (
              <div className='border-foreground/5 dark:border-foreground/10 mb-2 flex max-w-screen-sm flex-wrap items-center gap-2 border-y  py-3'>
                <span>Tags: </span>
                {post.tags.map((tag: any, index: number) => (
                  <div key={index} className="bg-foreground-soft/50 text-foreground/70 flex items-center gap-2 rounded-md px-4 py-1 text-sm">
                    <span>{tag.description}</span>
                  </div>
                ))}
              </div>
            )
          }
          <div id="editor" className=" w-full " />
          {!post.readOnly && <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="bg-muted rounded-md border px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>}
        </div>
      </div>
    </form>
  )
}
