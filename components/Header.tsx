"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { CircleUserRound, LogOut } from "lucide-react"

import { SidebarTrigger } from "./ui/sidebar"
import { InputGroup, InputGroupInput } from "./ui/input-group"

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

export default function Header() {
  return (
    <header className="fixed z-100 flex h-15 w-full items-center border-b border-border bg-background px-5">
      <SidebarTrigger />
      <div className="text-2xl font-bold">StudyCards</div>
      <div className="flex grow items-center justify-between">
        <div>
          {headerLinks.map((l) => (
            <Button key={l.href} asChild variant={"link"}>
              <Link href={l.href}>{l.label}</Link>
            </Button>
          ))}
        </div>
        <InputGroup className="max-w-50">
          <InputGroupInput className="max-w-50" />
        </InputGroup>
      </div>
      <div className="flex items-center gap-4">
        <CircleUserRound className="text-foreground" />

        <LogOut className="text-foreground" />
      </div>
    </header>
  )
}
