"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"

const headerLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    href: "/upload",
    label: "Upload",
  },
  {
    href: "/library",
    label: "Library",
  },
]

export default function HeaderLinks() {
  const pathname = usePathname()

  return (
    <div>
      {headerLinks.map((l) => (
        <Button key={l.href} asChild variant={"link"}>
          <Link
            href={l.href}
            className={pathname.includes(l.href) ? "underline" : ""}
          >
            {l.label}
          </Link>
        </Button>
      ))}
    </div>
  )
}
