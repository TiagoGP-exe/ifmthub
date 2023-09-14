/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { FC } from 'react'

interface CardProps {
  authorName: string
  date: string
  title: string
  description: string
  img: string
  profileImage: string
}

export const Card: FC<CardProps> = ({
  authorName,
  date,
  title,
  description,
  img,
  profileImage
}) => (
  <div className='flex w-full flex-col gap-4'>
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-2'>
        <img src={profileImage} className='ring-foreground h-8 w-8 rounded-md bg-gray-300 object-cover ring-2' />
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
  </div>
)