"use client"

import { getBookmark } from '../../../lib/services/bookmark'
import { Card } from '../../../components/card'
import { useQuery } from '@tanstack/react-query';

export default function Bookmark() {
  const { data: Bookmark } = useQuery({
    staleTime: 300000, // Tempo de "stale" para 5 minutos (opcional)
    queryKey: ['bookmark'],
    queryFn: async () => await getBookmark()
  });

  return (

    <main className='xs:px-8 flex flex-col gap-y-8 px-4'>

      <h1 className='font-heading'>Bookmark</h1>

      {
        Bookmark?.reverse().map(({
          author: {
            fullName,
            urlImgProfile,
            photo: authorPhoto
          },
          title,
          dateCreated,
          subtitle,
          idPost,
          photo
        }) => (
          <Card key={idPost}
            idPost={idPost}
            date={new Intl.DateTimeFormat('pt-BR').format(new Date(dateCreated))}
            title={title}
            authorName={fullName}
            profileImage={
              authorPhoto ? `data:image/png;base64, ${authorPhoto}` :
                urlImgProfile}
            img={
              `data:image/png;base64, ${photo}`
            }
            description={subtitle}
          />
        ))
      }
    </main>
  )
}
