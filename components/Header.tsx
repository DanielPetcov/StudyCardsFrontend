"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { CircleUserRound, LogOut, Search } from "lucide-react"

import { SidebarTrigger } from "./ui/sidebar"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group"

import { SignoutUser } from "@/actions/signout-user"
import { useRouter } from "next/navigation"

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
  const router = useRouter()

  const signOut = async () => {
    await SignoutUser(onSuccess)
  }

  const onSuccess = () => {
    router.push("/login")
  }

  return (
    <header className="flex w-full items-center border-b px-5 py-4">
      <SidebarTrigger className="mr-4" />
      <div className="text-2xl font-bold">StudyCards</div>
      <div className="mx-4 flex grow items-center justify-between">
        <div>
          {headerLinks.map((l) => (
            <Button key={l.href} asChild variant={"link"}>
              <Link href={l.href}>{l.label}</Link>
            </Button>
          ))}
        </div>
        <InputGroup className="max-w-50">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." />
        </InputGroup>
      </div>
      <div className="flex items-center gap-4">
        <CircleUserRound className="cursor-pointer" onClick={signOut} />
        <LogOut />
      </div>
    </header>
  )
}
