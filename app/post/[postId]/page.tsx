import { notFound } from "next/navigation"
import { Editor } from '../../../components/editor'
import { getPostById } from '../../../lib/services/post'
import { Comments } from '../../../components/coments'
import { Avatar } from '../../../components/avatar-and-status'
import { intlFormat } from 'date-fns'
import { OptionsPost } from '../../../components/options-post'
import { BASE_API_URL } from '../../../lib/constants'
import { Metadata, ResolvingMetadata } from 'next/dist/lib/metadata/types/metadata-interface'

interface EditorPageProps {
  params: { postId: string }
}

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const product = await fetch(BASE_API_URL + `/post/${id}`).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product.title,
    openGraph: {
      images: [...previousImages],
    },
    authors: [{ name: product.author.fullName }],
  }
}


export default async function EditorPage({ params }: EditorPageProps) {
  if (!params.postId || !Number(params.postId)) {
    notFound()
  }

  try {

    const post = await getPostById(params.postId)

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
            postImage: `data:image/png;base64, ${post?.photo}`
          }}
          author={post.author} />
        <OptionsPost
          title={post.title}
          subtitle={post.subtitle}
          idPost={post.idPost}
          commentsNumber={post.comments.length}
          bookmarked={post.bookmarked}
          favorited={post.favorited}
          countFavorites={post.countFavorites}
          countBookmarks={post.countBookmarks} />
        <div id='comments' className='mx-auto w-full max-w-[650px] px-2'>
          <Comments idPost={post.idPost} />
          {post.comments.length > 0 &&
            <div className=' flex flex-col gap-4'>
              {post.comments.reverse().map((comment) => (
                <div key={comment.idComment}
                  className='border-foreground/5 dark:border-foreground/10 flex flex-col border-b px-1 pb-4'>
                  <div className='flex items-center gap-3'>
                    <Avatar
                      disabled
                      name={comment.commenter.fullName}
                      imgURL={comment.commenter.urlImgProfile} />
                    <div className='flex flex-col'>
                      <span className='font-heading'>{comment.commenter.fullName}</span>
                      <span className='text-xs'>{intlFormat(new Date(new Date(comment.dateCreated).getTime() - 4 * 60 * 60 * 1000), {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      }, {
                        locale: 'pt-BR'
                      })}</span>
                    </div>

                  </div>
                  <span className='mt-4 opacity-60'>
                    {comment.content}
                  </span>
                </div>
              ))}
            </div>}
        </div>
      </>
    )
  } catch (error) {
    return notFound()
  }
}
