"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheck } from "lucide-react"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { useMe } from "@/hooks/useMe"

import {
  MAXIMUM_FREE_ACTIVE_DECKS,
  MAXIMUM_FREE_CARDS_PER_DECK,
  MAXIMUM_FREE_UPLOADS,
  MAXIMUM_PRO_ACTIVE_DECKS,
  MAXIMUM_PRO_CARDS_PER_DECK,
} from "@/constants"
import { useTranslations } from "next-intl"

import { CreateProSubscriptionCheckout } from "@/actions/create-checkout"
import SkeletonManageSubscription from "../general/SkeletonManageSubscription"

export default function ManageSubscriptionCard() {
  const t = useTranslations("Account.manageSubscriptionCard")

  const { data, isLoading } = useMe()

  const planType = data?.plan || "free"
  const uploadsUsed = data?.uploadsUsed || 0
  const activeDecks = data?.activeDecks || 0
  const usage = (uploadsUsed / MAXIMUM_FREE_UPLOADS) * 100

  if (isLoading) {
    return <SkeletonManageSubscription />
  }

  return (
    <Card className="mx-auto max-w-5xl pt-0">
      <CardHeader className="bg-linear-90 from-blue-800 to-blue-600 p-5">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-accent dark:text-white">
            <BadgeCheck />
            <p className="text-2xl capitalize">{planType} Plan</p>
          </div>
          {planType !== "pro" && (
            <Button
              size="lg"
              className="cursor-pointer bg-accent text-accent-foreground"
              onClick={() => CreateProSubscriptionCheckout()}
            >
              {t("actionButton")}
            </Button>
          )}
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
                {planType === "free" ? MAXIMUM_FREE_UPLOADS : "unlimited"}{" "}
                {t("pdfProcessed")}
              </div>
            </div>
            {planType === "free" && (
              <div className="text-xs">
                {usage}% {t("capacity")}
              </div>
            )}
          </div>
          {planType === "free" && <Progress value={usage} className="h-2" />}
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <ComparationCard
            title="Active Decks"
            currentValue={String(activeDecks)}
            comparedValue={String(
              planType === "free"
                ? MAXIMUM_FREE_ACTIVE_DECKS
                : MAXIMUM_PRO_ACTIVE_DECKS
            )}
          />

          <ComparationCard
            title="Maximum Cards per Deck"
            currentValue={
              planType === "free"
                ? String(MAXIMUM_FREE_CARDS_PER_DECK)
                : String(MAXIMUM_PRO_CARDS_PER_DECK)
            }
            comparedValue={""}
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
