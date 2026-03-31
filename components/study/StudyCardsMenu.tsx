"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

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
  return (
    <ScrollArea className="h-100 rounded-md border p-0">
      {cards.map((card, index) => (
        <div key={card.id}>
          <Button
            key={card.id}
            className="block w-full cursor-pointer rounded-none px-5"
            variant={currentCard.id === card.id ? "default" : "ghost"}
            size={"lg"}
            onClick={() => changeCurrentCard(card.order)}
          >{`Card-${card.order + 1}`}</Button>
          {index !== cards.length - 1 ? <Separator /> : null}
        </div>
      ))}
    </ScrollArea>
  )
}
