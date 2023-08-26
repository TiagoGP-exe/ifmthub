"use client"

import { useRouter } from 'next/navigation'

export default function Home() {
  const { push } = useRouter()

  const hundred = Array.from(Array(100).keys())

  return (

    <main className='xs:px-8 flex flex-col gap-y-8'>
      <h1 className='font-heading'>
        Sketch
      </h1>
    </main>
  )
}
