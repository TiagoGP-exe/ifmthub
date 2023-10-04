/* eslint-disable @next/next/no-img-element */
"use client"

import Image from 'next/image'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { User } from 'lucide-react'
import Link from 'next/link'

interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  authorName: string
  date: string
  title: string
  description: string
  img: string
  profileImage: string
  idPost: number
  onClick: () => void
}

export const Card: FC<CardProps> = ({
  authorName,
  date,
  title,
  description,
  img,
  profileImage,
  onClick,
  idPost,
}) => {
  return (
    <Link href={`/post/${idPost}`} onClick={onClick} className='flex w-full flex-col gap-4 hover:cursor-pointer'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          {profileImage ? <Image
            unoptimized
            src={profileImage}
            width={36}
            height={36}
            alt='profile image'
            className="ring-foreground bg-foreground aspect-square h-9 w-9 rounded-md object-cover ring-2"
          /> :
            <div className='ring-foreground flex h-9 w-9 items-center justify-center rounded-md ring-2'>
              <User className="h-5 w-5" />
            </div>
          }
          <div className='flex flex-col'>
            <span className='font-heading text-sm'>{authorName}</span>
            <span className='text-xs text-gray-400'>{date}</span>
          </div>
        </div>
        <h1 className='text-2xl font-bold'>{title}</h1>
        <p className='text-sm text-gray-500'>
          {description}
        </p>
      </div>
      <Image width={500} height={500} alt='' src={img} className='h-60 w-full rounded-md bg-gray-300 object-cover md:h-80' />
    </Link>
  )
}