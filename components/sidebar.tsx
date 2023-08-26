"use client"

import { useRouter } from 'next/navigation'
import { ButtonIcon } from './button-icon'
import Logo from './logo'

export const Sidebar = () => {
  const { push } = useRouter()

  return (
    <>
      <aside className='md:flex flex-col items-end justify-between min-h-screen py-7 border-r px-4 sticky top-0 bottom-0 hidden' >

        <Logo />


        <div className='flex flex-col gap-y-12'>
          <ButtonIcon
            name='home'
            size={28}
            active
          />

          <ButtonIcon
            name='search'
            size={28}
          />
          <ButtonIcon
            name='bookmark'
            size={28}
          />
          <ButtonIcon
            name='fileText'
            size={28}
          />

        </div>

        <ButtonIcon
          name='logout'
          onClick={() => push('/')}
          size={28}
        />
      </aside>
      <nav className='md:hidden flex items-center justify-center py-4 sticky mt-4 -bottom-3 pb-8  w-full bg-background/90 backdrop-blur-md border-t px-8' >
        <div className='flex items-center justify-around w-full'>
          <ButtonIcon
            name='home'
            size={24}
            active
            paddingSize='sm'
          />

          <ButtonIcon
            name='search'
            size={24}
            paddingSize='sm'
          />

          <ButtonIcon
            name='bookmark'
            size={24}
            paddingSize='sm'
          />
          <ButtonIcon
            name='fileText'
            size={24}
            paddingSize='sm'
          />
        </div>

        <ButtonIcon
          active
          name='add'
          size={28}
          className='absolute -top-5 mx-auto bg-foreground text-background rounded-full hover:bg-foreground/80'
        />
      </nav>
    </>
  )
}