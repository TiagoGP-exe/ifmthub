import { notFound, redirect } from "next/navigation"
import { Editor } from '../../../components/editor'
import { cookies, } from 'next/headers'
import { getPostById } from '../../../lib/services/post'
import { BookMarkedIcon, MessageCircle, Send, SendIcon, Share2, SendHorizonal } from 'lucide-react'
import { Comments } from '../../../components/coments'
import { Avatar } from '../../../components/avatar-and-status'
import { intlFormat } from 'date-fns'



interface EditorPageProps {
  params: { postId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const cookiess = cookies().get("authToken")

  const post = await getPostById(params.postId, cookiess?.value)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Editor
        post={{
          id: post.idPost,
          title: post.title,
          content: post.content.includes('blocks') ? JSON.parse(post.content) : {
            blocks: [post.content]
          },
          published: post.dateCreated,
          readOnly: true,
          tags: post.tags,
        }}
        author={post.author}
      />

      <div className='mx-auto w-full max-w-[90%] md:max-w-[650px]'>
        <div className='border-foreground/5 dark:border-foreground/10  flex   flex-wrap items-center gap-4 border-y p-2 '>
          <div className='flex cursor-pointer items-center gap-1 opacity-40 transition-all hover:opacity-100 active:scale-90'>
            <MessageCircle className='' strokeWidth={1.5} size={20} />
            <span>{post.comments.length}</span>
          </div>
          <span className='flex-1' />
          <div className='cursor-pointer  opacity-40 transition-all hover:opacity-100 active:scale-90'>
            <BookMarkedIcon strokeWidth={1.5} size={20} />
          </div>
          <div className='cursor-pointer opacity-40 transition-all hover:opacity-100 active:scale-90'>
            <Share2 strokeWidth={1.5} size={20} />
          </div>
        </div>

        <Comments idPost={post.idPost} />
        {post.comments.length > 0 && <div className='mt-6 flex flex-col gap-4'>
          {post.comments.reverse().map((comment) => (
            <div key={comment.idComment}
              className='border-foreground/5 dark:border-foreground/10 flex flex-col border-b px-1 pb-4'>
              <div className='flex items-center gap-3'>
                <Avatar
                  name={comment.commenter.fullName}
                  imgURL={comment.commenter.urlImgProfile}
                />
                <div className='flex flex-col'>
                  <span className='font-heading'>{comment.commenter.fullName}</span>
                  <span className='text-xs'>{
                    intlFormat(new Date(comment.dateCreated), {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })
                  }</span>
                </div>

              </div>
              <span className='mt-4 opacity-60'>
                {comment.content}
              </span>
            </div>
          ))
          }
        </div>
        }
      </div>


    </>
  )
}
