"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { sidebarHeaderLinks, sidebarLinks } from "@/constants/sidebar-links"

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
    <Sidebar className="bg-sidebar p-5">
      <SidebarHeader>
        <h2 className="-mb-2 text-lg font-bold">Library</h2>
        <p className="text-on-surface-variant text-sm">AI-GENERATED</p>
      </SidebarHeader>
      <SidebarContent className="space-y-5">
        <SidebarGroup className="space-y-2">
          {sidebarLinks.map((link) => (
            <Button
              key={link.href}
              asChild
              variant={pathname.endsWith(link.href) ? "default" : "secondary"}
              size={"lg"}
            >
              <Link href={link.href}>
                <link.icon />
                {link.label}
              </Link>
            </Button>
          ))}
        </SidebarGroup>
        <Separator className="lg:hidden" />
        <SidebarGroup className="space-y-2 lg:hidden">
          {sidebarHeaderLinks.map((link) => (
            <Button variant={"link"} key={link.href} asChild size={"lg"}>
              <Link
                className={pathname.includes(link.href) ? "underline" : ""}
                href={link.href}
              >
                {link.label}
              </Link>
            </Button>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button size={"lg"}>
          <Plus />
          New Upload
        </Button>
        <Separator className="mb-4" />
        <DecksUsageProgress />
      </SidebarFooter>
    </Sidebar>
  )
}
