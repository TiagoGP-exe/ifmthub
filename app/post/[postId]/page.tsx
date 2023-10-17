import { notFound } from "next/navigation"
import { Editor } from '../../../components/editor'
import { cookies, } from 'next/headers'
import { getPostById } from '../../../lib/services/post'
import { Comments } from '../../../components/coments'
import { Avatar } from '../../../components/avatar-and-status'
import { intlFormat } from 'date-fns'
import { OptionsPost } from '../../../components/options-post'
import Loading from './loading'


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

      <OptionsPost
        title={post.title}
        subtitle={post.subtitle}
        idPost={post.idPost}
        commentsNumber={post.comments.length}
        bookmarked={post.bookmarked}
        favorited={post.favorited}
        countFavorites={post.countFavorites}
        countBookmarks={post.countBookmarks}
      />
      <div id='comments' className=' mx-auto w-full max-w-[90%] md:max-w-[650px]'>
        <Comments idPost={post.idPost} />
        {post.comments.length > 0 && <div className=' flex flex-col gap-4'>
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
                    intlFormat(new Date(new Date(comment.dateCreated).getTime() - 4 * 60 * 60 * 1000), {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    }, {
                      locale: 'pt-BR'
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
