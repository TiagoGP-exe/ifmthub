"use client"


import Link from 'next/link'
import Logo from './logo'
import { ModeToggle } from './mode-toggle'
import { buttonVariants } from './ui/button'

export const HeaderNav = () => (
  <header className='bg-background/75 dark:bg-background/90 fixed top-0 z-10 flex w-full items-center justify-center py-8 backdrop-blur-lg'>
    <main className='flex w-11/12 max-w-screen-xl items-center justify-between gap-4 px-4 md:px-0'>
      <Logo />

      <div className='flex items-center justify-center gap-2'>
        <div className='hidden sm:block'>
          <ModeToggle />
        </div>

        <Link className={buttonVariants({
          variant: 'outline',
          className: 'min-w-[10rem]'
        })} href='/login' >
          Começar a Escrever
        </ Link>
      </div>
    </main>
  </header>
)
