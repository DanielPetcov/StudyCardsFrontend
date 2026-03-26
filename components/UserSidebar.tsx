"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { sidebarLinks } from "@/constants/sidebar-links"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import DecksUsageProgress from "./DecksUsageProgress"

export default function UserSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="p-5">
      <SidebarHeader>
        <h2 className="-mb-2 text-lg font-bold">Library</h2>
        <p className="text-sm text-on-surface-variant">AI-GENERATED</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="space-y-2">
          {sidebarLinks.map((link) => (
            <Button
              key={link.href}
              asChild
              variant={pathname.endsWith(link.href) ? "default" : "secondary"}
            >
              <Link href={link.href}>
                <link.icon />
                {link.label}
              </Link>
            </Button>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button>
          <Plus />
          New Upload
        </Button>
        <Separator className="mb-4" />
        <DecksUsageProgress />
      </SidebarFooter>
    </Sidebar>
  )
}
