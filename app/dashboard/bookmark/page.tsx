import { cookies } from 'next/headers'
import { getBookmark } from '../../../lib/services/bookmark'
import { Card } from '../../../components/card'

export default async function Bookmark() {

  const cookiess = cookies().get("authToken")

  const Bookmark = await getBookmark(cookiess?.value)

  return (

    <main className='xs:px-8 flex flex-col gap-y-8 px-4'>

      <h1 className='font-heading'>Bookmark</h1>

      {
        Bookmark?.map(({
          author: {
            fullName,
            urlImgProfile,
          },
          title,
          dateCreated,
          subtitle,
          idPost
        }, index) => (
          <Card key={idPost}
            idPost={idPost}
            date={new Intl.DateTimeFormat('pt-BR').format(new Date(dateCreated))}
            title={title}
            authorName={fullName}
            profileImage={urlImgProfile}
            img={`https://source.unsplash.com/random/640x${index + 480}`}
            description={subtitle}
          />
        ))
      }
    </main>
  )
}
