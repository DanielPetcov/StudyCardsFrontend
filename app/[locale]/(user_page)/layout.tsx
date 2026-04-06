import { ReactNode } from "react"

import { SidebarProvider } from "@/components/ui/sidebar"
import UserSidebar from "@/components/UserSidebar"
import Header from "@/components/header/Header"
import Footer from "@/components/footer/Footer"

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <UserSidebar />
      <main className="flex min-w-0 flex-1 flex-col">
        <Header />
        <div className="p-5">{children}</div>
        <Footer />
      </main>
    </SidebarProvider>
  )
}
