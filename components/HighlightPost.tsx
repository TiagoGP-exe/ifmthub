"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Avatar } from './avatar-and-status'

const colorsHighlight = {
  1: 'text-yellow-500',
  2: 'text-gray-400',
  3: 'text-yellow-700',
  4: 'text-gray-500',
}

const returnColorByIndex = (index: unknown) => {
  if (Number(index) < 4) {
    const color = index as keyof typeof colorsHighlight

    return colorsHighlight[color]
  }

  return colorsHighlight[4]
}

export interface HighlightPostProps {
  title: string;
  date: string;
  image: string;
  slug: string;
  index: number;
  name: string;
}

const HighlightPost = ({ title, date, image, slug, index, name }: HighlightPostProps) => (
  <Link href={`/post/${slug}`} className='flex max-w-xs cursor-pointer flex-col items-start'>
    <div className='flex items-center justify-center gap-x-4'>
      <h2 className={`text-2xl font-bold  ${returnColorByIndex(index)}`}>
        {index}º
      </h2>
      <Avatar
        name={name}
        imgURL={image}
      />
      <h1 className='font-heading text-xl'>
        {name}
      </h1>
    </div>

    <p className='text-ellipsis py-4 text-xl font-bold'>
      {title}
    </p>

    <span className='text-sm opacity-70 '>
      {new Date(date).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })}
    </span>

  </Link>
)

export default HighlightPost