import { History, Star, Archive, FileStack, LucideIcon } from "lucide-react"

interface SidebarLink {
  label: string
  href: string
  icon: LucideIcon
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
