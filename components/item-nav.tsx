"use client"

import { FC } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { cva } from "class-variance-authority"
import { cn } from '../lib/utils'


interface ItemNavProps {
  url: string
  variant?: "default" | "active" | "withBg" | "activeWithBg"
  className: string | undefined
  img?: string
  name: string
}

const containerItemNav = cva(
  "flex w-full items-center justify-center select-none transition-all duration-200 cursor-pointer group font-heading",
  {
    variants: {
      variant: {
        default: "hover:border-l-4 border-foreground",
        active: "border-l-4 border-foreground",
        withBg: "hover:border-l-4 border-foreground",
        activeWithBg: "border-l-4 border-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const containItemNav = cva(
  "flex h-12 w-12 items-center justify-center  transition-all duration-200 ",
  {
    variants: {
      variant: {
        default: "rounded-[5rem] group-hover:rounded-xl",
        active: "rounded-xl",
        withBg: "bg-foreground/10 rounded-[5rem] group-hover:rounded-xl",
        activeWithBg: "bg-primary rounded-xl text-white",
      },
    },
  }
)

const containItemNavImg = cva(" cursor-pointer transition-all duration-200", {
  variants: {
    variant: {
      default: "rounded-[5rem] group-hover:rounded-xl",
      active: "rounded-xl",
      withBg: "",
      activeWithBg: "",
    },
  },
})

export const ItemNav: FC<ItemNavProps> = ({
  url,
  variant,
  className,
  img,
  name,
}) => {
  const { push } = useRouter()

  return (
    <div
      onClick={() => {
        push(url)
      }}
      className={cn(containerItemNav({ variant }))}
    >
      <div className={cn(containItemNav({ variant }))}>
        {img ? (
          <Image
            src={img}
            quality={100}
            width={64}
            height={64}
            alt="channel"
            className={cn(containItemNavImg({ className, variant }))}
          />
        ) : (
          <h2>{name}</h2>
        )}
      </div>
    </div>
  )
}
