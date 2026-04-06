"use client"

import FreePlanCard from "@/components/subscriptions/FreePlanCard"
import ProPlanCard from "@/components/subscriptions/ProPlanCard"

export default function PlanStep() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="mb-2 text-3xl">Choose the plan of your account</h2>
      <div className="grid grid-cols-2 gap-5">
        <FreePlanCard />
        <ProPlanCard />
      </div>
    </div>
  )
}
