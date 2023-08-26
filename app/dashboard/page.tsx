"use client"

import { Outfit } from 'next/font/google'
import Logo from '../../components/logo'
import { BookmarkIcon, FileTextIcon, HomeIcon, LogOutIcon, PlusIcon, SearchIcon } from 'lucide-react'
import { Button } from '../../components/ui/button'
import Image from 'next/image'
const outfit = Outfit({ subsets: ['latin'] })

export default function Home() {

  const hundred = Array.from(Array(100).keys())

  return (
    <main
      className={`flex min-h-screen items-center justify-center w-full ${outfit.className}`}
    >
      <aside className='flex flex-col items-end justify-between min-h-screen py-16 border-r px-4 sticky top-0 bottom-0' >
        <Logo />

        <div className='flex flex-col gap-y-12'>
          <Button variant="ghost" className='h-10' >
            <HomeIcon size={32} />
          </Button>
          <Button variant="ghost" className='h-10' >
            <SearchIcon size={32} />
          </Button>
          <Button variant="ghost" className='h-10' >
            <BookmarkIcon size={32} />
          </Button>
          <Button variant="ghost" className='h-10' >
            <FileTextIcon size={32} />
          </Button>
        </div>

        <button>
          <LogOutIcon size={32} />
        </button>

      </aside>

      <main className='flex flex-col min-h-screen max-w-screen-lg flex-1 px-8'>
        <header className='pt-8 pb-4 border-b flex items-center justify-between mb-8 sticky top-0 bg-background/90 backdrop-blur-md px-2'>
          <PlusIcon size={24} />

          <div className='flex items-center gap-4'>
            <Image alt='profile' src='/illustration.svg' width={32} height={32} className='rounded-full' />
            <div className='flex flex-col'>
              <span className='text-xs opacity-70'>Nome do Autor</span>
              <p className=' font-heading'>Nome do Autor</p>
            </div>
          </div>
        </header>
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



    </main >
  )
}
