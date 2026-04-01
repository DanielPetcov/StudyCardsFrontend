"use client"

import Link from "next/link"
import { useState, useCallback } from "react"
import { useTranslations } from "next-intl"
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { DEMO_CARDS } from "@/data"
import { DemoAnswer } from "@/types"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"

export default function InteractiveDemo() {
  const t = useTranslations("LandingPage.demo")

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, DemoAnswer>>({})
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [showSummary, setShowSummary] = useState(false)

  const currentCard = DEMO_CARDS[currentIndex]
  const totalCards = DEMO_CARDS.length
  const isFirst = currentIndex === 0
  const isLast = currentIndex === totalCards - 1
  const currentAnswer = answers[currentCard.id]
  const hasAnswered = !!currentAnswer
  const progressValue = ((currentIndex + 1) / totalCards) * 100

  const allAnswered = DEMO_CARDS.every((c) => answers[c.id])
  const correctCount = Object.values(answers).filter((a) => a.isCorrect).length

  const handleSelect = (index: number) => {
    if (hasAnswered) return
    setSelectedOption(index)
    setIsChecked(false)
  }

  const handleCheck = () => {
    if (selectedOption === null) return
    const isCorrect = selectedOption === currentCard.correctIndex
    setAnswers((prev) => ({
      ...prev,
      [currentCard.id]: { selectedIndex: selectedOption, isCorrect },
    }))
    setIsChecked(true)
  }

  const handleNext = () => {
    if (!isLast) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      const nextAnswer = answers[DEMO_CARDS[nextIndex].id]
      if (nextAnswer) {
        setSelectedOption(nextAnswer.selectedIndex)
        setIsChecked(true)
      } else {
        setSelectedOption(null)
        setIsChecked(false)
      }
    }
  }

  const handlePrevious = () => {
    if (!isFirst) {
      const prevIndex = currentIndex - 1
      setCurrentIndex(prevIndex)
      const prevAnswer = answers[DEMO_CARDS[prevIndex].id]
      if (prevAnswer) {
        setSelectedOption(prevAnswer.selectedIndex)
        setIsChecked(true)
      } else {
        setSelectedOption(null)
        setIsChecked(false)
      }
    }
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setAnswers({})
    setSelectedOption(null)
    setIsChecked(false)
    setShowSummary(false)
  }

  const goToCard = useCallback(
    (index: number) => {
      setCurrentIndex(index)
      const card = DEMO_CARDS[index]
      const answer = answers[card.id]
      if (answer) {
        setSelectedOption(answer.selectedIndex)
        setIsChecked(true)
      } else {
        setSelectedOption(null)
        setIsChecked(false)
      }
    },
    [answers]
  )

  // ── Summary view ──

  if (showSummary) {
    return (
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader className="text-center">
          <h3 className="text-2xl font-bold">{t("summaryTitle")}</h3>
          <p className="text-muted-foreground">{t("summarySubtitle")}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">
                {correctCount}/{totalCards}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{t("score")}</p>
            </div>
          </div>

          <div className="space-y-3">
            {DEMO_CARDS.map((card, i) => {
              const answer = answers[card.id]
              return (
                <div
                  key={card.id}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border p-3 text-sm",
                    answer?.isCorrect
                      ? "border-emerald-200 bg-emerald-500/5 dark:border-emerald-900"
                      : "border-red-200 bg-red-500/5 dark:border-red-900"
                  )}
                >
                  <div className="mt-0.5">
                    {answer?.isCorrect ? (
                      <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{card.question}</p>
                    <p className="mt-1 text-muted-foreground">
                      {card.options[card.correctIndex]}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={handleReset}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            {t("tryAgain")}
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link href="/register">
              {t("startStudying")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // ── Study view ──

  return (
    <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-4 lg:grid-cols-[auto_1fr]">
      {/* Card navigation */}
      <ScrollArea className="w-full rounded-2xl border bg-background lg:h-80 lg:w-28">
        <div className="flex w-max gap-2 p-2 lg:w-full lg:flex-col">
          {DEMO_CARDS.map((card, index) => {
            const isActive = currentIndex === index
            const answer = answers[card.id]
            const isAnswered = !!answer
            const isCorrect = answer?.isCorrect === true
            const isWrong = answer?.isCorrect === false

            return (
              <Button
                key={card.id}
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => goToCard(index)}
                aria-current={isActive ? "true" : undefined}
                aria-label={`Go to card ${index + 1}`}
                className={cn(
                  "relative h-12 min-w-12 shrink-0 rounded-xl border text-sm font-semibold transition-all",
                  "lg:h-11 lg:w-full",
                  "border-border bg-secondary text-secondary-foreground hover:bg-secondary/80",
                  isAnswered &&
                    isCorrect &&
                    "border-emerald-200 bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/20 dark:border-emerald-900 dark:text-emerald-400",
                  isAnswered &&
                    isWrong &&
                    "border-red-200 bg-red-500/15 text-red-700 hover:bg-red-500/20 dark:border-red-900 dark:text-red-400",
                  isActive &&
                    "border-primary bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground"
                )}
              >
                {index + 1}
              </Button>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" className="lg:hidden" />
        <ScrollBar orientation="vertical" className="hidden lg:flex" />
      </ScrollArea>

      {/* Card content */}
      <div>
        <Progress value={progressValue} className="mb-4" />

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">
                {currentIndex + 1} {t("cardOf")} {totalCards}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {t("deckTitle")}
              </span>
            </div>
            <h3 className="pt-4 text-xl leading-snug font-semibold">
              {currentCard.question}
            </h3>
          </CardHeader>

          <CardContent className="space-y-2">
            {currentCard.options.map((option, index) => {
              const isSelected = selectedOption === index
              const showResult = hasAnswered || isChecked
              const isCorrectOption = index === currentCard.correctIndex
              const wasChosen = currentAnswer?.selectedIndex === index

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={hasAnswered}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm font-medium transition-all",
                    !showResult &&
                      !isSelected &&
                      "hover:border-primary/50 hover:bg-muted/50",
                    !showResult && isSelected && "border-primary bg-primary/5",
                    showResult &&
                      isCorrectOption &&
                      "border-emerald-300 bg-emerald-500/10 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400",
                    showResult &&
                      wasChosen &&
                      !isCorrectOption &&
                      "border-red-300 bg-red-500/10 text-red-700 dark:border-red-800 dark:text-red-400",
                    showResult && !isCorrectOption && !wasChosen && "opacity-50"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-bold",
                      !showResult && isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border",
                      showResult &&
                        isCorrectOption &&
                        "border-emerald-500 bg-emerald-500 text-white",
                      showResult &&
                        wasChosen &&
                        !isCorrectOption &&
                        "border-red-500 bg-red-500 text-white"
                    )}
                  >
                    {showResult && isCorrectOption ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : showResult && wasChosen && !isCorrectOption ? (
                      <X className="h-3.5 w-3.5" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span>{option}</span>
                </button>
              )
            })}
          </CardContent>

          <CardFooter className="flex flex-wrap items-center justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={isFirst}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              {t("previous")}
            </Button>

            <div className="flex gap-2">
              {!hasAnswered && (
                <Button
                  size="sm"
                  onClick={handleCheck}
                  disabled={selectedOption === null}
                >
                  {t("checkAnswer")}
                </Button>
              )}

              {hasAnswered && !isLast && (
                <Button size="sm" onClick={handleNext}>
                  {t("next")}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              )}

              {hasAnswered && isLast && allAnswered && (
                <Button size="sm" onClick={() => setShowSummary(true)}>
                  {t("viewSummary")}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              )}

              {hasAnswered && isLast && !allAnswered && (
                <Button size="sm" variant="outline" onClick={() => goToCard(0)}>
                  {t("checkAnswer")}
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
