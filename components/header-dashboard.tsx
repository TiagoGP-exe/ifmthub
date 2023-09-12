"use client"

import Image from 'next/image'
import { ButtonIcon } from './button-icon'
import { ModeToggle } from './mode-toggle'
import { useRouter } from 'next/navigation'

export const HeaderDashboard = () => {
  const { push } = useRouter()

  return (
    <header className='bg-background/80 xs:px-8 sticky -top-2 mb-8 flex items-center justify-between border-b px-4 py-5 backdrop-blur-md'>
      <ButtonIcon
        className='hidden md:block'
        name='add'
        onClick={() => push("/editor/new")}
      />

      <div className='flex flex-1 flex-row-reverse items-center justify-between gap-4 md:flex-none md:flex-row md:justify-center'>
        <ModeToggle />

        <div className='flex items-center gap-2 '>
          <Image alt='profile' src='/avatar-1.png' width={36} height={36} className='border-foreground bg-foreground aspect-square rounded-md border-2 object-cover' />
          <div className='flex flex-col'>
            <span className='text-[0.6rem] opacity-70'>Bem vindo de volta </span>
            <p className='text-lg  font-bold leading-5'>PAMELA CURREY</p>
          </div>
        </div>
      </div>
    </header>
  )
}
