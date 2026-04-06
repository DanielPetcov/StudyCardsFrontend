"use client"

import { Languages } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocaleNavigation } from "@/hooks/useChangeLocale"

export function LanguageToggle({ className }: { className?: string }) {
  const changeLocale = useLocaleNavigation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={className}>
          <Languages className="h-[1.2rem] w-[1.2rem] scale-100" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLocale("en")}>
          En
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLocale("ro")}>
          Ro
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
