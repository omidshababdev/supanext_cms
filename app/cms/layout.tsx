import { ReactNode } from "react"
import DashboardNav from "./(components)/DashboardSidebar"
import DashboardNavMobile from "./(components)/DashboardNav"

export default function DashboardLayout({ children }: { children: ReactNode }) {

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] ">
      <DashboardNav />
      <div className="flex flex-col">
        <DashboardNavMobile />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
