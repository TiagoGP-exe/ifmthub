import { notFound, redirect } from 'next/navigation';
import { Editor } from '../../../../components/editor'
import { api } from '../../../../lib/api';
import { cookies } from 'next/headers'
import { getPostById } from '../../../../lib/services/post';
interface EditorPageProps {
  params: { postId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  if ((!params.postId || !Number(params.postId)) && params.postId !== 'new') {
    notFound()
  }

  if (params.postId === 'new') {
    return (
      <Editor
        post={{
          id: null,
          title: "",
          content: "",
          published: false,
          readOnly: false,
          tags: [],
          postImage: null
        }}
      />
    )
  }

  const token = cookies().get('authToken')

  const { data } = await api.get('/me', {
    headers: {
      Authorization: `Bearer ${token?.value}`
    }
  });

  if (!data?.email) {
    redirect("register" || "/login")
  }

  try {

    const post = await getPostById(params.postId)

    if (post.author.idUser !== data.idUser) {
      redirect("/")
    }

    return (
      <Editor
        post={{
          id: post?.idPost ?? null,
          title: post?.title ?? "",
          content: JSON.parse(post?.content) ?? "",
          published: post?.dateCreated ? true : false,
          readOnly: false,
          tags: !!post?.tags.length ? post?.tags : [],
          postImage: post?.photo ? `data:image/png;base64, ${post?.photo}` : null
        }}
      />
    )
  } catch (error) {
    notFound()
  }
}
