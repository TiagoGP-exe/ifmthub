"use client"

import { Card } from '../../components/card'
import { Loader2 } from 'lucide-react';
import { getPosts } from '../../lib/services/post';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { data: arrayTotal, isLoading } = useQuery({
    staleTime: 300000, // Tempo de "stale" para 5 minutos (opcional)
    queryKey: ['posts'],
    queryFn: async () => await getPosts()
  });

  const { push } = useRouter()

  return (

    <main className='xs:px-8 flex flex-col gap-y-8 px-4'>
      {
        arrayTotal?.map(({
          author: {
            fullName,
            urlImgProfile,
            photo: authorPhoto
          },
          photo,
          title,
          dateCreated,
          subtitle,
          idPost
        }, index) => (
          <Card key={index}
            idPost={idPost}
            date={new Intl.DateTimeFormat('pt-BR').format(new Date(dateCreated))}
            title={title}
            authorName={fullName}
            profileImage={authorPhoto ? `data:image/png;base64, ${authorPhoto}` : urlImgProfile}
            img={
              `data:image/png;base64, ${photo}`
            }

            description={subtitle}
            onClick={() => {
              push(`post/${idPost}`)
            }}
          />
        ))
      }
      {isLoading && (
        <div className="sticky top-10 flex items-center justify-center py-2">
          <Loader2 className='animate-spin' size='24' />
        </div>
      )}
      {/* <div ref={refreshPosts} /> */}
    </main>
  )
}
