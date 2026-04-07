import { cn } from "@/lib/utils"

import { Card as CardType } from "@/types"
import { CardHeader } from "@/components/ui/card"
import { useTranslations } from "next-intl"

export default function StudyCardHeader({
  card,
  totalCards,
}: {
  card: CardType
  totalCards: number
}) {
  const t = useTranslations("DeckPage")

  return (
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
  )
}
