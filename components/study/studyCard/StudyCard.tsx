"use client"

import { useCallback, useEffect, useMemo } from "react"
import { Card as CardType } from "@/types/card"
import { useStudySession } from "@/stores/study-session.store"
import { Card, CardContent } from "@/components/ui/card"
import FormError from "../../general/FormError"
import { useParams } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { CardTestSchema } from "@/schemas"
import type { CardTest as CardTestFormData } from "@/types"
import StudyCardHeader from "./StudyCardHeader"
import StudyCardFooter from "./StudyCardFooter"
import StudyCardExplanation from "./StudyCardExplanation"
import StudyCardOptions from "./StudyCardOptions"

import { useStudyCardKeyboard } from "@/hooks/useStudyCardKeyboard"

interface StudyCardProps {
  card: CardType
  totalCards: number
  onNext: () => void
  onPrevious: () => void
  onSummary: () => void
  isFirst: boolean
  isLast: boolean
  isComplete: boolean
}

export default function StudyCard({
  card,
  totalCards,
  onNext,
  onPrevious,
  onSummary,
  isFirst,
  isLast,
  isComplete,
}: StudyCardProps) {
  const params = useParams()
  const deckId = params.id as string

  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<CardTestFormData>({
    resolver: zodResolver(CardTestSchema),
    defaultValues: {
      optionId: "",
    },
  })

  const cardAnswer = useStudySession((state) =>
    state.getCardAnswer(deckId, card.id)
  )
  const answerCard = useStudySession((state) => state.answerCard)

  const watchedOptionId = watch("optionId")

  const isAnswered = Boolean(cardAnswer)
  const selectedOptionId = cardAnswer?.optionId ?? watchedOptionId ?? null

  useEffect(() => {
    reset({
      optionId: cardAnswer?.optionId ?? "",
    })
  }, [card.id, cardAnswer?.optionId, reset])

  const correctOption = useMemo(
    () => card.options.find((option) => option.isCorrect),
    [card.options]
  )

  const selectedOption = useMemo(
    () => card.options.find((option) => option.id === selectedOptionId),
    [card.options, selectedOptionId]
  )

  const isCorrect = selectedOption?.isCorrect === true

  const onSubmit: SubmitHandler<CardTestFormData> = useCallback(
    (data) => {
      const chosen = card.options.find((option) => option.id === data.optionId)
      if (!chosen) return

      answerCard(deckId, card.id, chosen.id, chosen.isCorrect)
    },
    [answerCard, card.id, card.options, deckId]
  )

  const submitCurrentCard = useCallback(() => {
    handleSubmit(onSubmit)()
  }, [handleSubmit, onSubmit])

  const handleNextCard = useCallback(() => {
    clearErrors()

    if (isLast) {
      onSummary()
      return
    }

    onNext()
  }, [clearErrors, isLast, onNext, onSummary])

  const handlePreviousCard = useCallback(() => {
    clearErrors()
    onPrevious()
  }, [clearErrors, onPrevious])

  const canGoNext = !isLast || isComplete
  const canSubmit = !isAnswered && Boolean(selectedOption)
  const canGoPrevious = !isFirst

  useStudyCardKeyboard({
    isAnswered,
    canGoNext,
    canGoPrevious,
    onNext: handleNextCard,
    onPrevious: handlePreviousCard,
    onSubmit: submitCurrentCard,
  })

  const getOptionStyle = useCallback(
    (optionId: string, isCorrectOption: boolean) => {
      if (!isAnswered) return ""

      if (isCorrectOption) {
        return "border-green-500 bg-green-50 dark:bg-green-950/20"
      }

      if (optionId === selectedOptionId) {
        return "border-red-500 bg-red-50 dark:bg-red-950/20"
      }

      return "opacity-50"
    },
    [isAnswered, selectedOptionId]
  )

  return (
    <Card className="flex min-h-150 flex-col shadow-md">
      <StudyCardHeader card={card} totalCards={totalCards} />

      <CardContent className="flex flex-1 flex-col p-6 py-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col"
        >
          <StudyCardOptions
            card={card}
            control={control}
            isAnswered={isAnswered}
            selectedOptionId={selectedOptionId}
            clearErrors={clearErrors}
            getOptionStyle={getOptionStyle}
          />

          {errors.optionId && (
            <FormError
              message={errors.optionId.message || ""}
              className="mb-4"
            />
          )}

          <StudyCardExplanation
            isAnswered={isAnswered}
            isCorrect={isCorrect}
            explanation={correctOption?.explanation}
          />
        </form>
      </CardContent>

      <StudyCardFooter
        isFirst={isFirst}
        isLast={isLast}
        isComplete={isComplete}
        isAnswered={isAnswered}
        canSubmit={canSubmit}
        onPrevious={handlePreviousCard}
        onNext={handleNextCard}
        onSubmit={submitCurrentCard}
      />
    </Card>
  )
}
