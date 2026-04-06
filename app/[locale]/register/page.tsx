"use client"

import { useState } from "react"
import AccountStep from "./components/AccountStep"
import PlanStep from "./components/PlanStep"
import WelcomScreen from "./components/WelcomScreen"

export default function RegisterPage() {
  const [step, setStep] = useState(0)

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      {step === 0 && <AccountStep onNext={() => setStep(1)} />}
      {step === 1 && <PlanStep />}
      {step === 2 && <WelcomScreen />}
    </div>
  )
}
