import { Metadata } from 'next'
import { HeaderDashboard } from "../../components/header-dashboard"
import { Sidebar } from "../../components/sidebar"
import { siteConfig } from '../../config/site'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: `Dashboard - ${siteConfig.name}`,
}

export default function Dashboard({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-background flex min-h-screen flex-col-reverse items-center justify-center md:flex-row">
      <Sidebar />

      <div className="flex min-h-screen w-full max-w-screen-md flex-col">
        <HeaderDashboard />
        {children}
      </div>
    </div>
  )
}
