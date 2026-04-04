import { Button } from "@/components/ui/button"
import { RegisterSchema } from "@/schemas"
import { UseFormReturn } from "react-hook-form"

interface PlanStepProps {
  form: UseFormReturn<RegisterSchema>
  onNext: () => void
  onBack: () => void
}

export default function PlanStep({ form, onBack, onNext }: PlanStepProps) {
  return (
    <div>
      this is plan step
      <Button onClick={onBack}>go back</Button>
      <Button onClick={onNext}>go next</Button>
    </div>
  )
}
