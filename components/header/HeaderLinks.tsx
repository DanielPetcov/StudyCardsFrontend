"use client"

import { Link } from "@/i18n/navigation"

import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

export default function HeaderLinks({ className }: { className?: string }) {
  const pathname = usePathname()
  const t = useTranslations("Header.links")
  const headerLinks = [
    {
      href: "/dashboard",
      label: t("dashboard"),
    },
    // {
    //   href: "/upload",
    //   label: t("upload"),
    // },
    // {
    //   href: "/library",
    //   label: t("library"),
    // },
  ]

  return (
    <div className={className}>
      {headerLinks.map((l) => (
        <Button key={l.href} asChild variant={"link"}>
          <Link
            href={l.href}
            className={cn(
              "capitalize",
              pathname.includes(l.href) ? "underline" : ""
            )}
          >
            {l.label}
          </Link>
        </Button>
      ))}
    </div>
  )
}
