"use client"


import Link from 'next/link'
import Logo from './logo'
import { ModeToggle } from './mode-toggle'
import { Button, buttonVariants } from './ui/button'

export const HeaderNav = () => (
  <header className='flex items-center justify-center py-8 backdrop-blur-lg bg-background/75 dark:bg-background/90 fixed top-0 w-full z-10'>
    <main className='flex items-center justify-between  max-w-screen-xl w-11/12 gap-4 px-4 md:px-0'>
      <Logo />

      <div className='flex items-center justify-center gap-2'>
        <div className='hidden sm:block'>
          <ModeToggle />
        </div>

        <Link className={buttonVariants({
          variant: 'outline',
          className: 'min-w-[10rem]'
        })} href='/dashboard' >
          Começar a Escrever
        </ Link>
      </div>
    </main>
  </header>
)
