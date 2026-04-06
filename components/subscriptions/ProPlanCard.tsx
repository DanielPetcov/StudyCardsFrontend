"use client"

import { Badge, Check } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { useTranslations } from "next-intl"
import { useRegisterSessionStore } from "@/stores/register-session.store"
import { CreateProSubscriptionCheckout } from "@/actions/create-checkout"

export default function ProPlanCard() {
  const { loading, setLoading } = useRegisterSessionStore()
  const t = useTranslations("LandingPage.pricing")
  const proFeatures = ["f1", "f2", "f3", "f4", "f5", "f6"] as const

  const handleClick = async () => {
    setLoading(true)
    try {
      await CreateProSubscriptionCheckout()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="relative flex flex-col gap-0 overflow-visible border-primary shadow-lg">
      <div className="absolute -top-3 right-4">
        <Badge className="px-3 py-1">{t("pro.badge")}</Badge>
      </div>
      <CardHeader>
        <h3 className="text-xl font-semibold">{t("pro.name")}</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-bold">{t("pro.price")}</span>
          <span className="text-muted-foreground">{t("pro.period")}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("pro.description")}
        </p>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3">
          {proFeatures.map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm">
              <Check className="h-4 w-4 shrink-0 text-primary" />
              {t(`pro.features.${f}`)}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-3">
        <Button className="w-full" disabled={loading} onClick={handleClick}>
          <p>{t("pro.cta")}</p>
        </Button>
      </CardFooter>
    </Card>
  )
}
