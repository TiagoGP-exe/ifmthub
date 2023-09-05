"use client"

import { useRouter } from 'next/navigation'

export default function Home() {
  const { push } = useRouter()

  const hundred = Array.from(Array(100).keys())

  return (

    <main className='px-4 xs:px-8 flex flex-col gap-y-8'>
      {
        hundred.map((_, index) => (
          <div key={index} className='flex flex-col gap-4 w-full'>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
                <div className='w-10 h-10 bg-gray-300 rounded-full' />
                <div className='flex flex-col'>
                  <span className='text-sm font-medium'>Nome do Autor</span>
                  <span className='text-xs text-gray-400'>2 de agosto de 2021</span>
                </div>
              </div>
              <h1 className='text-2xl font-bold'>Como criar um site com Next.js</h1>
              <p className=
                'text-gray-500 text-sm'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.
              </p>
            </div>
            <div className='w-full h-60 bg-gray-300 rounded-md' />
          </div>
        ))
      }
    </main>
  )
}
