"use client"

import { useRouter } from 'next/navigation'
import { ButtonIcon } from './button-icon'
import Logo from './logo'
import { useEffect, useState } from 'react'

export const Sidebar = () => {
  const { push, prefetch } = useRouter()
  const [changeLocation, setChangeLocation] = useState("")

  const routers = {
    home: '/dashboard',
    search: '/dashboard/search',
    bookmark: '/dashboard/bookmark',
    sketch: '/dashboard/sketch',
  }

  const setPath = (path: string) => {
    setChangeLocation(path)
    push(path)
  }

  useEffect(() => {
    Object.entries(routers).forEach(([_, value]) => {
      prefetch(value)
    })

    if (window !== undefined) {
      setChangeLocation(location.pathname)
    }
  }, [])

  return (
    <>
      <aside className='md:flex flex-col items-end justify-between min-h-screen py-7 border-r px-4 sticky top-0 bottom-0 hidden' >

        <Logo />

        <div className='flex flex-col gap-y-8'>
          <ButtonIcon
            name='home'
            size={28}
            onClick={() => setPath(routers.home)}
            active={changeLocation === routers.home || changeLocation === '/'}
          />

          <ButtonIcon
            name='search'
            size={28}
            onClick={() => setPath(routers.search)}
            active={changeLocation === routers.search}
          />
          <ButtonIcon
            name='bookmark'
            size={28}
            onClick={() => setPath(routers.bookmark)}
            active={changeLocation === routers.bookmark}
          />
          <ButtonIcon
            name='fileText'
            size={28}
            onClick={() => setPath(routers.sketch)}
            active={changeLocation === routers.sketch}
          />

        </div>

        <ButtonIcon
          name='logout'
          onClick={() => push('/')}
          size={28}
        />
      </aside>
      <nav className='md:hidden flex items-center justify-center py-4 sticky mt-4 -bottom-3 pb-8  w-full bg-background/90 backdrop-blur-md border-t xs:px-8' >
        <div className='flex items-center justify-around w-full'>
          <ButtonIcon
            name='home'
            size={24}
            paddingSize='sm'
            onClick={() => setPath(routers.home)}
            active={changeLocation === routers.home || changeLocation === '/'}
          />

          <ButtonIcon
            name='search'
            size={24}
            paddingSize='sm'
            onClick={() => setPath(routers.search)}
            active={changeLocation === routers.search}
          />

          <ButtonIcon
            name='bookmark'
            size={24}
            paddingSize='sm'
            onClick={() => setPath(routers.bookmark)}
            active={changeLocation === routers.bookmark}
          />
          <ButtonIcon
            name='fileText'
            size={24}
            paddingSize='sm'
            onClick={() => setPath(routers.sketch)}
            active={changeLocation === routers.sketch}
          />
        </div>

        <ButtonIcon
          active
          name='add'
          size={28}
          className='absolute -top-5 mx-auto bg-foreground text-background rounded-full hover:bg-foreground/90 hover:text-background/90'
        />
      </nav>
    </>
  )
}