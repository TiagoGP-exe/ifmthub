"use client"

import { useRouter } from 'next/navigation'
import { useAuth } from '../../components/use-auth'
import { useEffect } from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { user } = useAuth()
  const { push, prefetch } = useRouter()

  useEffect(() => {

    prefetch("/register")
    prefetch("/login")



    if (user) {
      push("/dashboard")
    }
  }, [push, user, prefetch])


  return <div className="min-h-screen">{children}</div>
}
