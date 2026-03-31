"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheck } from "lucide-react"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { useMe } from "@/hooks/useMe"

import { MAX_FREE_UPLOADS } from "@/constants"
import { useTranslations } from "next-intl"

export default function ManageSubscriptionCard() {
  const t = useTranslations("Account.manageSubscriptionCard")

  const { data, isLoading } = useMe()

  const uploadsUsed = data?.uploadsUsed || 0
  const usage = (uploadsUsed / MAX_FREE_UPLOADS) * 100

  if (isLoading) {
    return <div></div>
  }

  return (
    <Card className="pt-0">
      <CardHeader className="bg-linear-90 from-blue-800 to-blue-600 p-5">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-accent">
            <BadgeCheck />
            <p className="text-2xl">Pro Plan</p>
          </div>
          <Button size="lg" className="bg-accent text-accent-foreground">
            {t("actionButton")}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-5 space-y-2">
          <div className="font-semibold uppercase">{t("usage")}</div>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1 font-semibold">
              <div className="text-2xl font-bold">{uploadsUsed}</div>
              <div>/</div>
              <div>
                {MAX_FREE_UPLOADS} {t("pdfProcessed")}
              </div>
            </div>
            <div className="text-xs">
              {usage}% {t("capacity")}
            </div>
          </div>
          <Progress value={usage} className="h-2" />
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <ComparationCard
            title="Cloud storage"
            currentValue="4.2 GB"
            comparedValue="50GB"
          />
          <ComparationCard
            title="AI summaries"
            currentValue="12"
            comparedValue={t("unlimited")}
          />
          <ComparationCard
            title="Shared Decks"
            currentValue="8"
            comparedValue={t("active")}
            slash={false}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function ComparationCard({
  title,
  currentValue,
  comparedValue,
  slash,
}: {
  title: string
  currentValue: string
  comparedValue: string
  slash?: boolean
}) {
  return (
    <div className="rounded-md bg-muted-foreground/10 p-4">
      <p className="mb-2 text-sm font-semibold uppercase">{title}</p>
      <div className="flex items-baseline gap-1 text-xs">
        <div className="text-base font-bold">{currentValue}</div>
        {slash === false ? null : <div>/</div>}
        <div>{comparedValue}</div>
      </div>
    </div>
  )
}
