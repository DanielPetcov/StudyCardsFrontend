"use client"

import { useRouter } from "@/i18n/navigation"

import { Search } from "lucide-react"

import { SidebarTrigger } from "../ui/sidebar"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"

import { SignoutUser } from "@/actions/signout-user"
import HeaderActionButtons from "./HeaderActionButtons"
import HeaderLinks from "./HeaderLinks"
import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"

export default function Header() {
  const router = useRouter()
  const t = useTranslations("Header")

  const signOut = async () => {
    await SignoutUser(onSuccess)
  }

  const onSuccess = () => {
    router.push("/login")
  }

  return (
    <header className="flex w-full items-center border-b px-5 py-4">
      <SidebarTrigger className="mr-4" />
      <Link href="/dashboard" className="text-2xl font-bold">
        StudyCards
      </Link>
      <div className="mx-4 flex grow items-center justify-end lg:justify-between">
        <HeaderLinks className="hidden lg:block" />
        {/* <InputGroup className="max-w-50">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder={t("searchInput")} />
        </InputGroup> */}
      </div>
      <HeaderActionButtons />
    </header>
  )
}
