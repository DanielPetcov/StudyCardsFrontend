"use client"

import { Control, Controller, UseFormClearErrors } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

import { Card as CardType } from "@/types/card"
import type { CardTest as CardTestFormData } from "@/types"

interface StudyCardOptionsProps {
  card: CardType
  control: Control<CardTestFormData>
  isAnswered: boolean
  selectedOptionId: string | null
  clearErrors: UseFormClearErrors<CardTestFormData>
  getOptionStyle: (optionId: string, isCorrectOption: boolean) => string
}

export default function StudyCardOptions({
  card,
  control,
  isAnswered,
  selectedOptionId,
  clearErrors,
  getOptionStyle,
}: StudyCardOptionsProps) {
  return (
    <Controller
      name="optionId"
      control={control}
      render={({ field }) => (
        <RadioGroup
          value={field.value}
          onValueChange={(value) => {
            if (isAnswered) return

            field.onChange(value)
            clearErrors()
          }}
          className="mb-6 space-y-3"
          disabled={isAnswered}
        >
          {card.options.map((option) => {
            const isSelected = selectedOptionId === option.id

            return (
              <label
                key={option.id}
                htmlFor={option.id}
                className={cn(
                  "flex cursor-pointer items-start gap-4 rounded-lg border-2 p-4 transition-all",
                  "hover:border-primary/50",
                  getOptionStyle(option.id, option.isCorrect),
                  isAnswered && "cursor-not-allowed"
                )}
              >
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  disabled={isAnswered}
                  className="mt-0.5"
                />

                <div className="flex flex-1 items-start justify-between gap-3">
                  <span className="text-sm leading-relaxed">{option.text}</span>

                  {isAnswered && option.isCorrect && (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
                  )}

                  {isAnswered && isSelected && !option.isCorrect && (
                    <XCircle className="h-5 w-5 shrink-0 text-red-600" />
                  )}
                </div>
              </label>
            )
          })}
        </RadioGroup>
      )}
    />
  )
}
