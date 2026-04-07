"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useStudySession } from "@/stores/study-session.store"

import type { Card } from "@/types/card"

interface StudyCardsMenuProps {
  cards: Card[]
  currentCard: Card
  changeCurrentCard: (cardOrder: number) => void
}

export default function StudyCardsMenu({
  cards,
  currentCard,
  changeCurrentCard,
}: StudyCardsMenuProps) {
  const session = useStudySession((state) =>
    currentCard.deckId ? state.sessions[currentCard.deckId] : null
  )

  const answers = session?.answers ?? {}

  return (
    <ScrollArea className="w-full rounded-2xl border bg-background lg:h-80 lg:w-28">
      <div className="flex w-max gap-2 p-2 lg:w-full lg:flex-col">
        {cards.map((card, index) => {
          const isActive = currentCard.id === card.id
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
              onClick={() => changeCurrentCard(card.order)}
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
              <span>{index + 1}</span>
            </Button>
          )
        })}
      </div>

      <ScrollBar orientation="horizontal" className="lg:hidden" />
      <ScrollBar orientation="vertical" className="hidden lg:flex" />
    </ScrollArea>
  )
}
