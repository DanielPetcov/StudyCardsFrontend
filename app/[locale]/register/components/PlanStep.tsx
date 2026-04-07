"use client"

import FreePlanCard from "@/components/subscriptions/FreePlanCard"
import ProPlanCard from "@/components/subscriptions/ProPlanCard"
import { useTranslations } from "next-intl"

export default function PlanStep() {
  const t = useTranslations("RegisterPage")

  return (
    <div className="flex flex-col gap-2 pt-10">
      <h2 className="mb-2 text-3xl">{t("chooseYourPlan")}</h2>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <FreePlanCard />
        <ProPlanCard />
      </div>
    </div>
  )
}
