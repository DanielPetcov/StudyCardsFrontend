"use client"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, XCircle } from "lucide-react"
import { useTranslations } from "next-intl"

interface StudyCardExplanationProps {
  isAnswered: boolean
  isCorrect: boolean
  explanation: string | undefined | null
}

export default function StudyCardExplanation({
  isAnswered,
  isCorrect,
  explanation,
}: StudyCardExplanationProps) {
  const t = useTranslations("DeckPage")

  return (
    <div className="mt-auto">
      <Separator className="mb-6" />

      {!isAnswered ? (
        <div className="rounded-lg border-2 border-dashed border-muted p-6 text-center">
          <p className="text-sm text-muted-foreground">{t("selectAnAnswer")}</p>
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

          <p className="text-sm leading-relaxed text-foreground/90">
            {explanation}
          </p>
        </div>
      )}
    </div>
  )
}
