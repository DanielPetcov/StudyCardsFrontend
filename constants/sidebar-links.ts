import { History, Star, Archive, FileStack, LucideIcon } from "lucide-react"

interface SidebarLink {
  label: string
  href: string
  icon: LucideIcon
}

interface SidebarHeaderLink {
  label: string
  href: string
}

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
