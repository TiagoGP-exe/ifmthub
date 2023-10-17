"use client"

import { Bookmark, Heart, Loader2, MessageCircle, Share2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CommentProps } from 'postcss'
import { FC, useEffect, useMemo, useState } from 'react'
import { RWebShare } from 'react-web-share'
import { setBookmark } from '../lib/services/bookmark'
import { Counter } from './counter'
import { setFavorite } from '../lib/services/favorites'

interface OptionsPostProps {
  commentsNumber: number
  title: string
  subtitle: string
  idPost: string
  bookmarked: boolean
  favorited: boolean
  countFavorites: number
  countBookmarks: number
}

export const OptionsPost: FC<OptionsPostProps> = ({ commentsNumber, title, subtitle, idPost, bookmarked, favorited, countFavorites, countBookmarks }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isActive, setIsActive] = useState(bookmarked)
  const [favorites, setFavorites] = useState(favorited)

  const actualcountBookmarks = useMemo(() => {

    if (bookmarked && !isActive) {
      return countBookmarks - 1
    }

    if (!bookmarked && isActive) {
      return countBookmarks + 1
    }

    return countBookmarks
  }, [bookmarked, countBookmarks, isActive])

  const actualcountFavorites = useMemo(() => {
    if (favorited && !favorites) {
      return countFavorites - 1
    }

    if (!favorited && favorites) {
      return countFavorites + 1
    }

    return countFavorites
  }, [favorited, countFavorites, favorites])


  const { push } = useRouter()

  const toggleFavorite = async () => {
    try {
      setIsLoading(true)
      await setFavorite(idPost)
      setFavorites(prev => !prev)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleActive = async () => {
    try {
      setIsLoading(true)
      await setBookmark(idPost)
      setIsActive(prev => !prev)
    } finally {
      setIsLoading(false)
    }
  }


  return <div className=' border-foreground/5 dark:border-foreground/10 sticky bottom-0 z-10 mx-auto flex w-full max-w-[90%] flex-wrap items-center gap-4 border-y p-2 md:max-w-[650px]'>
    <button onClick={() => push('#comments')} className='flex cursor-pointer items-center gap-1 opacity-40 transition-all hover:opacity-100 active:scale-90'>
      <MessageCircle className='' strokeWidth={1.5} size={20} />
      <Counter from={0} to={commentsNumber} duration={1.5} />
    </button>
    <button disabled={isLoading} onClick={toggleFavorite} className={`flex cursor-pointer items-center gap-1 ${!favorites && "opacity-40 hover:opacity-100"} active:scale-90`}>
      <Heart
        className={favorites ? 'fill-red-500' : ''}
        strokeWidth={1.5} size={20} />
      <Counter from={0} to={actualcountFavorites} duration={actualcountFavorites >= 10 ? 0.5 : 0} />
    </button>
    <span className='flex-1' />
    <button disabled={isLoading} onClick={toggleActive} className='flex cursor-pointer items-center gap-1  opacity-40 transition-all hover:opacity-100 active:scale-90'>
      <Bookmark
        className={isActive ? 'fill-current' : ''}
        strokeWidth={1.5}
        size={20} />
      <span>{actualcountBookmarks}</span>
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