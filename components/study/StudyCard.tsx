"use client"

import { useEffect, useState } from "react"
import { Card as CardType } from "@/types/card"
import { useStudySession } from "@/stores/study-session.store"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle } from "lucide-react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import FormError from "../general/FormError"
import { cn } from "@/lib/utils"
import { useParams } from "next/navigation"

import { CardTestSchema } from "@/schemas"
import type { CardTest as CardTestFormData } from "@/types"
import { useTranslations } from "next-intl"

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
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<CardTestFormData>({
    resolver: zodResolver(CardTestSchema),
    defaultValues: {
      optionId: "",
    },
  })
  const t = useTranslations("DeckPage")

  const params = useParams()
  const deckId = params.id as string

  const cardAnswer = useStudySession((state) =>
    state.getCardAnswer(deckId, card.id)
  )
  const isAlreadyAnswered = useStudySession((state) =>
    state.isCardAnswered(deckId, card.id)
  )

  const [isAnswered, setIsAnswered] = useState(isAlreadyAnswered)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(
    isAlreadyAnswered && cardAnswer
      ? card.options.find((o) => o.id === cardAnswer.optionId)?.id || null
      : null
  )

  useEffect(() => {
    if (cardAnswer) {
      setIsAnswered(true)
      setSelectedOptionId(cardAnswer.optionId)
    } else {
      setIsAnswered(false)
      setSelectedOptionId(null)
    }
  }, [card.id, cardAnswer])

  const answerCard = useStudySession((state) => state.answerCard)

  const correctOption = card.options.find((o) => o.isCorrect === true)
  const selectedOption = card.options.find((o) => o.id === selectedOptionId)
  const isCorrect = selectedOption?.isCorrect === true

  const onSubmit: SubmitHandler<CardTestFormData> = (data) => {
    setSelectedOptionId(data.optionId)
    setIsAnswered(true)

    const chosen = card.options.find((o) => o.id === data.optionId)
    if (!chosen) return
    answerCard(deckId, card.id, chosen.id, chosen?.isCorrect)
  }

  const handleNextCard = (isLast: boolean) => {
    clearErrors()
    if (!isLast) {
      onNext()
    } else {
      onSummary()
    }
  }

  const handlePreviousCard = () => {
    clearErrors()
    onPrevious()
  }

  const getOptionStyle = (optionId: string, isCorrectOption: boolean) => {
    if (!isAnswered) return ""

    if (isCorrectOption) {
      return "border-green-500 bg-green-50 dark:bg-green-950/20"
    }

    if (optionId === selectedOptionId && !isCorrectOption) {
      return "border-red-500 bg-red-50 dark:bg-red-950/20"
    }

    return "opacity-50"
  }

  return (
    <Card className="flex min-h-150 flex-col shadow-md">
      <CardHeader className="flex flex-col justify-between p-6 pt-2">
        {/* Difficulty Badge */}
        <div className="mb-4 flex w-full items-center justify-between">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
              {
                "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400":
                  card.difficulty === "easy",
                "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400":
                  card.difficulty === "medium",
                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400":
                  card.difficulty === "hard",
              }
            )}
          >
            {t(`cardDifficulties.${card.difficulty}`).toUpperCase()}
          </span>

          <span className="text-sm text-muted-foreground">
            {card.order + 1} / {totalCards}
          </span>
        </div>

        {/* Question */}
        <h2 className="line-clamp-3 overflow-y-auto text-2xl leading-tight font-semibold">
          {card.question}
        </h2>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col p-6 py-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col"
        >
          {/* Options */}
          <Controller
            name="optionId"
            control={control}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={(v) => {
                  if (!isAnswered) {
                    field.onChange(v)
                    setSelectedOptionId(v)
                    clearErrors()
                  }
                }}
                className="mb-6 space-y-3"
                disabled={isAnswered}
              >
                {card.options.map((option) => {
                  const isThisCorrect = option.isCorrect
                  const isSelected = selectedOptionId === option.id

                  return (
                    <label
                      key={option.id}
                      className={cn(
                        "flex cursor-pointer items-start gap-4 rounded-lg border-2 p-4 transition-all",
                        "hover:border-primary/50",
                        getOptionStyle(option.id, isThisCorrect),
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
                        <span className="text-sm leading-relaxed">
                          {option.text}
                        </span>

                        {/* Show icons after answering */}
                        {isAnswered && isThisCorrect && (
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
                        )}
                        {isAnswered && isSelected && !isThisCorrect && (
                          <XCircle className="h-5 w-5 shrink-0 text-red-600" />
                        )}
                      </div>
                    </label>
                  )
                })}
              </RadioGroup>
            )}
          />

          {/* Error message */}
          {errors.optionId && (
            <FormError
              message={errors.optionId.message || ""}
              className="mb-4"
            />
          )}

          {/* Explanation section */}
          <div className="mt-auto">
            <Separator className="mb-6" />

            {!isAnswered ? (
              <div className="rounded-lg border-2 border-dashed border-muted p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {t("selectAnAnswer")}
                </p>
              </div>
            ) : (
              <div
                className={cn(
                  "rounded-lg border-2 p-6",
                  isCorrect
                    ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20"
                    : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20"
                )}
              >
                {/* Result header */}
                <div className="mb-3 flex items-center gap-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-900 dark:text-green-100">
                        Correct!
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="font-semibold text-red-900 dark:text-red-100">
                        Incorrect
                      </span>
                    </>
                  )}
                </div>

                {/* Explanation */}
                <p className="text-sm leading-relaxed text-foreground/90">
                  {correctOption?.explanation}
                </p>
              </div>
            )}
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t p-6">
        {/* Navigation buttons */}
        <Button
          variant="outline"
          size="default"
          onClick={handlePreviousCard}
          disabled={isFirst}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          {t("navigationButtons.prev")}
        </Button>

        {!isAnswered ? (
          <Button
            disabled={!selectedOption}
            size="lg"
            onClick={handleSubmit(onSubmit)}
            className="px-8"
          >
            {t("navigationButtons.check")}
          </Button>
        ) : (
          <Button
            size="lg"
            onClick={() => handleNextCard(isLast)}
            className="px-8"
            disabled={isLast && !isComplete}
          >
            {isLast
              ? t("navigationButtons.finish")
              : t("navigationButtons.nextCard")}
            {!isLast && <ChevronRight className="ml-1 h-4 w-4" />}
          </Button>
        )}

        <Button
          variant="outline"
          size="default"
          onClick={() => handleNextCard(isLast)}
          disabled={isLast}
        >
          {t("navigationButtons.next")}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
