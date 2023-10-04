"use client"

import { useRouter } from 'next/navigation'
import { useAuth } from '../../components/use-auth'
import { useEffect } from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { user, isLoading } = useAuth()
  const { push, prefetch } = useRouter()

  useEffect(() => {
    prefetch("/register")
    prefetch("/login")
    prefetch("/dashboard")

    if (user?.email && !isLoading) {
      push("/dashboard")
    }
  }, [push, user, prefetch, isLoading])


  return <div className="min-h-screen">{children}</div>
}
