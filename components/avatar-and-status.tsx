"use client"

import { FC } from "react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"

import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu"
import { LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from './use-auth'
import { cn } from '../lib/utils'

const LIST_OF_ACTIONS = [
  {
    name: "logout",
    icon: <LogOut className="h-5 w-5" />,
    nameOfRoute: "/"
  },
  {
    name: "Profile",
    icon: <User className="h-5 w-5" />,
    nameOfRoute: "/profile"
  }
]

interface StatusProps {
  name: string
  imgURL: string
  className?: string
  disabled?: boolean
}
export const Avatar: FC<StatusProps> = ({
  imgURL,
  name,
  className,
  disabled
}) => {
  const { push } = useRouter()
  const { logout } = useAuth()


  const verifyNameLogout = (nameOfRoute: string, name: string) => {
    if (name === "logout") {
      logout()
      push("/")
      return
    }
    push(nameOfRoute)
  }

  return (
    <div className={
      cn("flex items-center gap-2", className)
    }>
      <DropdownMenu>
        <DropdownMenuTrigger disabled={disabled} asChild>
          {imgURL ? <Image
            unoptimized
            src={imgURL}
            width={36}
            height={36}
            alt={name}
            className="ring-foreground bg-foreground aspect-square h-9 w-9 rounded-md object-cover ring-2"
          /> :
            <div className='ring-foreground flex h-9 w-9 items-center justify-center rounded-md ring-2'>
              <User className="h-5 w-5" />
            </div>
          }
        </DropdownMenuTrigger>
        <DropdownMenuContent className='md:hidden' align="start">
          {LIST_OF_ACTIONS.map(({ name, icon, nameOfRoute }) => (
            <DropdownMenuItem
              key={name}
              className='flex gap-2'
              onClick={() => verifyNameLogout(nameOfRoute, name)}
            >
              {icon}
              <span>{name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
