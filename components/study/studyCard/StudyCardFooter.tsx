"use client"

import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"

interface StudyCardFooterProps {
  isFirst: boolean
  isLast: boolean
  isComplete: boolean
  isAnswered: boolean
  canSubmit: boolean
  onPrevious: () => void
  onNext: () => void
  onSubmit: () => void
}

export default function StudyCardFooter({
  isFirst,
  isLast,
  isComplete,
  isAnswered,
  canSubmit,
  onPrevious,
  onNext,
  onSubmit,
}: StudyCardFooterProps) {
  const t = useTranslations("DeckPage")

  const nextDisabled = isLast && !isComplete

  return (
    <CardFooter className="flex items-center justify-between border-t p-6">
      <Button
        type="button"
        variant="outline"
        size="default"
        onClick={onPrevious}
        disabled={isFirst}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        {t("navigationButtons.prev")}
      </Button>

      {!isAnswered ? (
        <Button
          type="button"
          disabled={!canSubmit}
          size="lg"
          onClick={onSubmit}
          className="px-8"
        >
          {t("navigationButtons.check")}
        </Button>
      ) : (
        <Button
          type="button"
          size="lg"
          onClick={onNext}
          className="px-8"
          disabled={nextDisabled}
        >
          {isLast
            ? t("navigationButtons.finish")
            : t("navigationButtons.nextCard")}
          {!isLast && <ChevronRight className="ml-1 h-4 w-4" />}
        </Button>
      )}

      <Button
        type="button"
        variant="outline"
        size="default"
        onClick={onNext}
        disabled={isLast}
      >
        {t("navigationButtons.next")}
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </CardFooter>
  )
}
