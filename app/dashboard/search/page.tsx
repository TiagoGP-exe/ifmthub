"use client"

import { useState } from 'react'
import { Input } from '../../../components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postFilterSchema } from '../../../lib/validations/post'
import { GetPostByIdProps, postFilter } from '../../../lib/services/post'
import { Card } from '../../../components/card'
import { Loader2 } from 'lucide-react'

interface FormData {
  search: string
}

export default function Home() {
  const [data, setData] = useState<GetPostByIdProps[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: {
    errors
  } } = useForm<FormData>(
    {
      resolver: zodResolver(postFilterSchema)
    }
  )

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true)
      const result = await postFilter(data.search)
      setData(result)
    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='bg-background/90 sticky top-[4.55rem] z-10 mx-auto mb-4 w-full py-3 backdrop-blur-md'>
        <Input
          className=' mx-auto w-11/12'
          disabled={isLoading}
          placeholder='Pesquisar'
          {...register('search')}
          error={errors.search?.message}
        />
      </form>

      <main className='xs:px-8 flex flex-col gap-y-8 px-4'>
        {
          data.map(({
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
          }, index) => (
            <Card
              key={index}
              idPost={idPost}
              date={new Intl.DateTimeFormat('pt-BR').format(new Date(dateCreated))}
              title={title}
              authorName={fullName}
              profileImage={authorPhoto ? `data:image/png;base64, ${authorPhoto}` : urlImgProfile}
              img={`data:image/png;base64, ${photo}`}
              description={subtitle}
            />
          ))
        }
        {isLoading && (
          <div className="sticky top-20 flex items-center justify-center py-2">
            <Loader2 className='animate-spin' size='24' />
          </div>
        )}
      </main>

    </>
  )
}
