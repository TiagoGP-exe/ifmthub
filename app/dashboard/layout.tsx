import { Sidebar } from '../../components/sidebar'
import { HeaderDashboard } from '../../components/header-dashboard'


interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function Dashboard({ children }: DashboardLayoutProps) {
  return <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen bg-background">
    <Sidebar />

    <div className='flex flex-col min-h-screen max-w-screen-md  w-11/12'>
      <HeaderDashboard />
      {children}
    </div>
  </div>
}