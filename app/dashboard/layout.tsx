"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { HeaderDashboard } from "../../components/header-dashboard"
import { Sidebar } from "../../components/sidebar"
import { useAuth } from "../../components/use-auth"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function Dashboard({ children }: DashboardLayoutProps) {
  const { user } = useAuth()
  const { push } = useRouter()

  useEffect(() => {
    if (!user) {
      push("/login")
    }
  }, [push, user])

  return user?.email ? (
    <div className="bg-background flex min-h-screen flex-col-reverse items-center justify-center md:flex-row">
      <Sidebar />

      <div className="flex min-h-screen w-full max-w-screen-md flex-col">
        <HeaderDashboard />
        {children}
      </div>
    </div>
  ) : null
}
