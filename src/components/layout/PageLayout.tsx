import type { ReactNode } from "react"
import Sidebar from "./Sidebar"
import TopNavigation from "./TopNavigation"

interface PageLayoutProps {
  children: ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <TopNavigation />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto w-full max-w-7xl p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
