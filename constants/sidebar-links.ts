import { History, Star, Archive, FileStack, LucideIcon } from "lucide-react"

import { SidebarLink, SidebarHeaderLink } from "@/types"

export const sidebarLinks: SidebarLink[] = [
  {
    label: "All Decks",
    href: "/dashboard",
    icon: FileStack,
  },
  {
    label: "Recent",
    href: "/dashboard/recent",
    icon: History,
  },
  {
    label: "Starred",
    href: "/dashboard/starred",
    icon: Star,
  },
  {
    label: "Archived",
    href: "/dashboard/archived",
    icon: Archive,
  },
]

export const sidebarHeaderLinks: SidebarHeaderLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Upload",
    href: "/upload",
  },
  {
    label: "Library",
    href: "/library",
  },
]
