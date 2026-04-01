"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetTitle,
  SheetContent,
} from "@/components/ui/sheet"
import { ModeToggle } from "../ModeToggle"
import { LanguageToggle } from "../LanguageToggle"

export function LandingHeader() {
  const t = useTranslations("LandingPage.header")

  const navLinks = [
    { label: t("features"), href: "#features" },
    { label: t("howItWorks"), href: "#how-it-works" },
    { label: t("demo"), href: "#demo" },
    { label: t("pricing"), href: "#pricing" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-2xl font-bold">
          StudyCards
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden gap-2 md:flex">
          <Button asChild size="sm">
            <Link href="/register">{t("startNow")}</Link>
          </Button>
          <ModeToggle />
          <LanguageToggle />
        </div>

        {/* Mobile nav */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-5">
            <SheetTitle className="text-2xl font-bold">StudyCards</SheetTitle>
            <nav className="mt-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-4">
                <Link href="/register">{t("startNow")}</Link>
              </Button>
              <div className="grid grid-cols-2 gap-5">
                <ModeToggle className="w-full" />
                <LanguageToggle className="w-full" />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
