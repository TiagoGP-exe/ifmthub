"use client"

import { useEffect } from 'react'
import { useAuth } from '../../components/use-auth'
import { useRouter } from 'next/navigation'

interface EditorProps {
  children?: React.ReactNode
}

export default function EditorLayout({ children }: EditorProps) {
  const { user, isLoading } = useAuth()
  const { push } = useRouter()

  useEffect(() => {
    if (!user?.email && !isLoading) {
      push("/login")
    }
  }, [isLoading, push, user])

  return user?.email ? (
    <div className="container mx-auto grid items-start gap-10 py-8 ">
      {children}
    </div>
  ) : null
}
