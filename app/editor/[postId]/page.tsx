import { notFound, redirect } from "next/navigation"
import { Editor } from '../../../components/editor'



interface EditorPageProps {
  params: { postId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  // const user = await getCurrentUser()

  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || "/login")
  // }

  // const post = await getPostForUser(params.postId, user.id)

  // if (!post) {
  //   notFound()
  // }

  return (
    <Editor
      post={{
        id: null,
        title: "",
        content: "",
        published: "",
        readOnly: false,
        tags: [],
      }}
    />
  )
}
