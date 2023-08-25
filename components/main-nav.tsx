"use client"

import * as React from "react"
import Link from "next/link"
import { LogOut } from "lucide-react"


import { ItemNav } from "./item-nav"
import { MainNavItem } from '../types'
import { abrevText, selectCorrectVariant } from '../lib/utils'

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
  id: string
  test?: string
}

export const MainNav: React.FC<MainNavProps> = ({
  items,
  children,
  id,
  test,
}) => {
  return (
    <div className="flex w-20 max-w-[100vw] flex-col justify-between gap-4 bg-background pb-4">
      <div className="flex flex-col items-center gap-4 overflow-y-auto ">
        <div className="flex h-20 w-full border-b-2 border-foreground/10 py-4">
          <ItemNav
            name="Home"
            url="/channels"
            variant={!id ? "activeWithBg" : "withBg"}
            className="h-6 w-6 "
            img="/images/logo.svg"
          />
        </div>

        <nav className="relative flex w-full flex-col items-center gap-2.5  ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]?.map((item, index) => (
            <ItemNav
              key={index}
              url={`/channels/${item}`}
              variant={selectCorrectVariant(
                id,
                `${item}`,
                "/images/channel-1.png"
              )}
              className="h-12 w-12"
              img="/images/channel-1.png"
              name={abrevText(`Channel ${item}`)}
            />
          ))}
          <div className="pointer-events-none sticky bottom-0 h-10 w-full bg-gradient-to-t from-background" />
        </nav>
      </div>
      <div className=" flex items-center justify-center rounded-full">
        <Link
          href="/"
          className="flex h-12  w-12  items-center justify-center rounded-full bg-foreground/10"
        >
          <LogOut className="rotate-180 " size={16} />
        </Link>
      </div>
    </div>
  )
}
