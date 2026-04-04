"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { RegisterSchema } from "@/schemas"

import { RegisterUser } from "@/actions/register-user"
import { useState } from "react"
import AccountStep from "./components/AccountStep"
import PlanStep from "./components/PlanStep"
import WelcomScreen from "./components/WelcomScreen"

export default function RegisterPage() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formActionError, setFormActionError] = useState<string | null>(null)

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      plan: "free",
    },
  })

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    try {
      setFormActionError(null)

      const actionData = await RegisterUser({
        dto: data,
        setLoading,
        setError: setFormActionError,
      })

      if (actionData) {
        // do something on success
      }
    } catch {
      setFormActionError("A network error happened. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      {step === 0 && <AccountStep form={form} onNext={() => setStep(1)} />}
      {step === 1 && (
        <PlanStep
          form={form}
          onBack={() => setStep(0)}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && <WelcomScreen />}
    </div>
  )
}
