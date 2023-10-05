"use client"

import { Bookmark, Loader2, MessageCircle, Share2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CommentProps } from 'postcss'
import { FC, useEffect, useState } from 'react'
import { RWebShare } from 'react-web-share'
import { setBookmark } from '../lib/services/bookmark'

interface OptionsPostProps {
  commentsNumber: number
  title: string
  subtitle: string
  idPost: string
}

export const OptionsPost: FC<OptionsPostProps> = ({ commentsNumber, title, subtitle, idPost }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isActive, setIsActive] = useState(false)


  const { push } = useRouter()

  const toggleActive = async () => {
    try {
      setIsLoading(true)
      await setBookmark(idPost)
      setIsActive(prev => !prev)
    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }


  return <div className=' border-foreground/5 dark:border-foreground/10 sticky bottom-0 z-10 mx-auto flex w-full max-w-[90%] flex-wrap items-center gap-4 border-y p-2 md:max-w-[650px]'>
    <button onClick={() => push('#comments')} className='flex cursor-pointer items-center gap-1 opacity-40 transition-all hover:opacity-100 active:scale-90'>
      <MessageCircle className='' strokeWidth={1.5} size={20} />
      <span>{commentsNumber}</span>
    </button>
    <span className='flex-1' />
    <button disabled={isLoading} onClick={toggleActive} className='cursor-pointer  opacity-40 transition-all hover:opacity-100 active:scale-90'>
      {isLoading ? <Loader2 className='animate-spin' /> : <Bookmark
        fill={
          isActive
            ? ''
            : 'transparent'
        }
        strokeWidth={1.5}
        size={20} />}
    </button>
    <RWebShare
      data={{
        title,
        text: subtitle,
      }}
    >
      <button className='cursor-pointer opacity-40 transition-all hover:opacity-100 active:scale-90'>
        <Share2 strokeWidth={1.5} size={20} />
      </button>
    </RWebShare>
  </div>
}