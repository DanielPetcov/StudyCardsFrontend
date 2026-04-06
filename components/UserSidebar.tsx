"use client"

import { Link } from "@/i18n/navigation"

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
import DecksUsageProgress from "./usage/DecksUsageProgress"
import { useTranslations } from "next-intl"

export default function UserSidebar() {
  const pathname = usePathname()
  const headerLinksTranslation = useTranslations("Header.links")
  const sidebarTranslation = useTranslations("Sidebar")

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
              className={
                !pathname.endsWith(link.href)
                  ? "bg-primary/20 hover:bg-primary/40"
                  : ""
              }
              size={"lg"}
            >
              <Link href={link.href}>
                <link.icon />
                {sidebarTranslation(`links.${link.label}`)}
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
                {headerLinksTranslation(`${link.label}`)}
              </Link>
            </Button>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button size={"lg"}>
          <Plus />
          {sidebarTranslation("newUploadButton")}
        </Button>
        <Separator className="mb-4" />
        <DecksUsageProgress />
      </SidebarFooter>
    </Sidebar>
  )
}
