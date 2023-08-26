import Image from 'next/image'
import { ButtonIcon } from '../../components/button-icon'
import { ModeToggle } from '../../components/mode-toggle'
import { Sidebar } from '../../components/sidebar'
import { HeaderDashboard } from '../../components/header-dashboard'


interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function Dashboard({ children }: DashboardLayoutProps) {
  return <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen bg-background">
    <Sidebar />

    <div className='flex flex-col min-h-screen max-w-screen-sm lg:max-w-screen-md  flex-1 '>
      <HeaderDashboard />
      {children}
    </div>
  </div>
}