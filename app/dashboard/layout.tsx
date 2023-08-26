

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function Dashboard({ children }: DashboardLayoutProps) {
  return <div className="min-h-screen bg-background">{children}</div>
}