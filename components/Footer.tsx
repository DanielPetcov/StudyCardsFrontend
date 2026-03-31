import { getTranslations } from "next-intl/server"

export default async function Footer() {
  const t = await getTranslations("Footer")

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
