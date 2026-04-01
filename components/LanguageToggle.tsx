import { Languages } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ChangeLocale } from "@/actions/change-locale"

export function LanguageToggle({ className }: { className?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={className}>
          <Languages className="h-[1.2rem] w-[1.2rem] scale-100" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => ChangeLocale("en")}>
          En
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => ChangeLocale("ro")}>
          Ro
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
