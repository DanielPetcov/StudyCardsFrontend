"use client"

import { Check } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/navigation"

export default function FreePlanCard() {
  const router = useRouter()
  const t = useTranslations("LandingPage.pricing")
  const freeFeatures = ["f1", "f2", "f3", "f4", "f5"] as const

  const handleClick = () => {
    router.push("/dashboard")
  }

  return (
    <Card className="flex flex-col gap-0">
      <CardHeader>
        <h3 className="text-xl font-semibold">{t("free.name")}</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-bold">{t("free.price")}</span>
          <span className="text-muted-foreground">{t("free.period")}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("free.description")}
        </p>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3">
          {freeFeatures.map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm">
              <Check className="h-4 w-4 shrink-0 text-primary" />
              {t(`free.features.${f}`)}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-3">
        <Button variant="outline" className="w-full" onClick={handleClick}>
          <p>{t("free.cta")}</p>
        </Button>
      </CardFooter>
    </Card>
  )
}
