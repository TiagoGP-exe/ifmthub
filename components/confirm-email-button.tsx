"use client"

import Cookies from 'js-cookie'
import { Link } from 'lucide-react'
import { FC } from 'react'
import { buttonVariants } from './ui/button'

interface ConfirmEmailButtonProps {
  token: string
}

export const ConfirmEmailButton: FC<ConfirmEmailButtonProps> = ({
  token
}) => {
  const setCookies = () => {
    Cookies.set('authToken', token, { expires: new Date(Date.now() + 60 * 60 * 1000) })
  }

  return (
    <Link href="/dashboard" onClick={setCookies} className={buttonVariants({ variant: "ghost" })}>
      Voltar
    </Link>
  )
}