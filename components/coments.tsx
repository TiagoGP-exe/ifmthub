"use client"

import { Input } from './ui/input';
import { FC, useState } from 'react';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { Loader2, SendHorizonal } from 'lucide-react';
import { useAuth } from './use-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { commentsSchema } from '../lib/validations/comments';
import { useRouter } from 'next/navigation';
import { setComment } from '../lib/services/comment';
import { Avatar } from './avatar-and-status';

interface CommentsProps {
  idPost: string
}

export const Comments: FC<CommentsProps> = ({ idPost }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { refresh } = useRouter()
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(commentsSchema),
  })

  const onSubmit = async (data: any) => {

    try {
      await setComment(idPost, data.content)
      reset()
      refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-background sticky -top-1 z-10 flex w-full flex-col gap-4 py-6  '>
      {user?.fullName &&
        <div className='flex items-start gap-3 px-1'>
          <Avatar
            disabled
            name={user?.fullName}
            imgURL={` data:image/png;base64, ${user?.photo}` ?? user?.urlImgProfile}
          />

          <div className='flex flex-col'>
            <span className='font-heading  text-sm'>{user?.fullName}</span>
            <span className='text-xs opacity-70 '>@{user?.email?.split('@')[0]}</span>
          </div>
        </div >
      }

      <div className='flex  w-full gap-2 '>
        <div className='w-full'>
          <Input
            className='dark:border-foreground/10'
            disabled={!user?.idUser}
            {...register('content')}
            placeholder='Comentário'
            error={errors?.content?.message as string}
          />
        </div>
        <Button disabled={!user?.idUser || isLoading} type='submit' size="icon" >
          {isLoading ? <Loader2 className='animate-spin' /> : <SendHorizonal />}
        </Button>
      </div>
    </form >
  )
}