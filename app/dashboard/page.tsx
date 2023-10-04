"use client"

import { Card } from '../../components/card'
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { GetPostProps, getPosts } from '../../lib/services/post';
import { useRouter } from 'next/navigation';

const date = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738));

export default function Home() {
  const [arrayTotal, setArrayTotal] = useState<GetPostProps[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()

  const refreshPosts = useRef(null)
  const anotherIsInView = useInView(refreshPosts)

  // useEffect(() => {
  //   if (anotherIsInView) {
  //     setIsLoading(true)
  //     const timer = setTimeout(() => {
  //       setArrayTotal(array.slice(0, arrayTotal.length + 10))
  //       setIsLoading(false)
  //     }, 1500)

  //     return () => clearTimeout(timer)
  //   }
  // }, [anotherIsInView, arrayTotal.length])

  useEffect(() => {

    (async () => {
      setIsLoading(true)
      const data = await getPosts()
      setIsLoading(false)
      setArrayTotal(data.reverse())
    })()
  }, [])

  return (

    <main className='xs:px-8 flex flex-col gap-y-8 px-4'>
      {
        arrayTotal.map(({
          author: {
            fullName,
            urlImgProfile,
          },
          title,
          dateCreated,
          subtitle,
          idPost
        }, index) => (
          <Card key={index}
            date={new Intl.DateTimeFormat('pt-BR').format(new Date(dateCreated))}
            title={title}
            authorName={fullName}
            profileImage={urlImgProfile}
            img={`https://source.unsplash.com/random/640x${index + 480}`}
            description={subtitle}
            onClick={() => push(`post/${idPost}`)}
          />
        ))
      }
      {isLoading && (
        <div className="sticky top-10 flex items-center justify-center py-2">
          <Loader2 className='animate-spin' size='24' />
        </div>
      )}
      <div ref={refreshPosts} />
    </main>
  )
}
