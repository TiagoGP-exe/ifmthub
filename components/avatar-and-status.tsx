"use client"

import { FC } from "react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { cva } from "class-variance-authority"

import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu"

const statusEnum = {
  online: {
    name: "Online",
  },
  idle: {
    name: "Idle",
  },
  dnd: {
    name: "Do not disturb",
    description: "You will not receive any notifications",
  },
  invisible: {
    name: "Invisible",
    description: "You will appear offline to others",
  },
}

interface StatusProps {
  name: string
  imgURL: string
  status: keyof typeof statusEnum
  username: string
}

const statusIconVariants = cva("mr-2 h-3 w-3 rounded-full border-2", {
  variants: {
    variant: {
      online: "border-green-600",
      idle: "border-yellow-600",
      dnd: "border-red-600",
      invisible: "border-gray-600",
    },
  },
})

const statusVariants = cva(
  "border-2 border-sidebar h-3.5 w-3.5 rounded-full absolute bottom-0 right-0",
  {
    variants: {
      variant: {
        online: "bg-green-600",
        idle: "border-yellow-600 bg-sidebar",
        dnd: "border-red-600 bg-sidebar",
        invisible: "border-gray-600 bg-sidebar",
      },
    },
  }
)

export const AvatarAndStatus: FC<StatusProps> = ({
  status,
  imgURL,
  name,
  username,
}) => (
  <div className="flex items-center gap-2">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative px-1">
          <Image
            unoptimized
            src={imgURL}
            width={100}
            height={100}
            alt={name}
            referrerPolicy="no-referrer"
            className="aspect-square h-9 w-9 rounded-full "
          />
          <div className={statusVariants({ variant: status })}></div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(statusEnum).map(([key, value]) => (
          <DropdownMenuItem key={key}>
            <div
              className={statusIconVariants({
                variant: key as keyof typeof statusEnum,
              })}
            />
            <span>{value.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
    <div className="group ">
      <p className="font-heading text-foreground leading-tight">{name}</p>
      <p className="text-foreground/40 text-xs leading-none transition-all duration-200 group-hover:hidden">
        {statusEnum[status].name}
      </p>

      <p className="text-foreground/40 hidden translate-y-10 text-xs leading-none transition-all duration-500 group-hover:block  group-hover:translate-y-0">
        @{username}
      </p>
    </div>
  </div>
)
