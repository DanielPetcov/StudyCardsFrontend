"use client"

import { useRouter } from "next/navigation"

import { toast } from "sonner"
import { CircleUserRound, LogOut } from "lucide-react"

import { SignoutUser } from "@/actions/signout-user"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTranslations } from "next-intl"

export default function HeaderActionButtons() {
  const router = useRouter()
  const t = useTranslations("Header")

  const handleLogOut = async () => {
    await SignoutUser(() => router.push("/login"))
    toast.success(t("signedoutAfter"))
  }

  return (
    <div className="flex items-center gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            variant={"ghost"}
            size={"icon-sm"}
            onClick={() => router.push("/account")}
          >
            <CircleUserRound className="cursor-pointer" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-center">{t("accountTooltip")}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            variant={"ghost"}
            size={"icon-sm"}
            onClick={handleLogOut}
          >
            <LogOut className="cursor-pointer" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("singoutTooltip")}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
