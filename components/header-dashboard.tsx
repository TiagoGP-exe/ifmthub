"use client"

import Image from 'next/image'
import { ButtonIcon } from './button-icon'
import { ModeToggle } from './mode-toggle'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from './use-auth'
import { Avatar } from './avatar-and-status'

const GENDER_MESSAGE = {
  M: "Bem vindo de volta",
  F: "Bem vinda de volta"
}

export const HeaderDashboard = () => {
  const { push, prefetch } = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    prefetch("/editor/new")
  }, [prefetch])

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
          <Avatar name={user?.fullName ?? ""} imgURL={user?.urlImgProfile ?? ""} />
          <div className='flex flex-col'>
            <span className='text-[0.6rem] opacity-70'>
              {
                GENDER_MESSAGE[user?.gender ?? "M"]
              }
            </span>
            <p className='text-lg  font-bold leading-5'>{user?.fullName}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
