import { History, Star, Archive, FileStack } from "lucide-react"

import { SidebarLink, SidebarHeaderLink } from "@/types"

export const sidebarLinks: SidebarLink[] = [
  {
    label: "allDecks",
    href: "/dashboard",
    icon: FileStack,
  },
  {
    label: "recent",
    href: "/dashboard/recent",
    icon: History,
  },
  {
    label: "starred",
    href: "/dashboard/starred",
    icon: Star,
  },
  {
    label: "archived",
    href: "/dashboard/archived",
    icon: Archive,
  },
]

export const sidebarHeaderLinks: SidebarHeaderLink[] = [
  {
    label: "dashboard",
    href: "/dashboard",
  },
  {
    label: "upload",
    href: "/upload",
  },
  {
    label: "library",
    href: "/library",
  },
]
