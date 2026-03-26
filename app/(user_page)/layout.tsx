import { ReactNode } from "react"

import { SidebarProvider } from "@/components/ui/sidebar"
import UserSidebar from "@/components/UserSidebar"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <UserSidebar />
      <main className="flex flex-col">
        <Header />
        <div className="mt-15 p-5">{children}</div>
        <Footer />
      </main>
    </SidebarProvider>
  )
}
