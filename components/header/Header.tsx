"use client"

import { Search } from "lucide-react"

import { SidebarTrigger } from "../ui/sidebar"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"

import { SignoutUser } from "@/actions/signout-user"
import { useRouter } from "next/navigation"
import HeaderActionButtons from "./HeaderActionButtons"
import HeaderLinks from "./HeaderLinks"

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
        <HeaderLinks />
        <InputGroup className="max-w-50">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." />
        </InputGroup>
      </div>
      <HeaderActionButtons />
    </header>
  )
}
