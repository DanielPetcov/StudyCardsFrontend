"use client"

import { useTranslations } from "next-intl"

export default function Footer() {
  const t = useTranslations("Footer")

  const currentYear = new Date().getFullYear()

  return (
    <div className="mt-auto border-t p-3 text-center text-xs text-muted-foreground">
      <p>
        @{currentYear} StudyCards. {t("rights")}
      </p>
      <p>{t("madeby")} Petcov Daniel</p>
    </div>
  )
}
