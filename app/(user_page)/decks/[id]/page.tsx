"use client"

import StudyCard from "@/components/study/StudyCard"
import { useCards } from "@/hooks/useCards"
import { useStudySession } from "@/stores/study-session.store"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import StudyCardsMenu from "@/components/study/StudyCardsMenu"
import StudyProgressBar from "@/components/study/ProgressBar"

export default function DeckPage() {
  const params = useParams()
  const deckId = params.id as string

  const { data: cards, isLoading } = useCards(deckId)

  const session = useStudySession((state) => state.getSession(deckId))
  const setCurrentCard = useStudySession((state) => state.setCurrentCard)

  const [currentIndex, setCurrentIndex] = useState(
    session?.currentCardIndex ?? 0
  )

  useEffect(() => {
    if (session && session.currentCardIndex > 0) {
      setCurrentIndex(session.currentCardIndex)
    }
  }, [session])

  if (isLoading) return <div>Loading cards...</div>
  if (!cards?.length) return <div>No cards found</div>

  const currentCard = cards[currentIndex]
  const isLastCard = currentIndex === cards.length - 1

  const handleNext = () => {
    if (!isLastCard) {
      setCurrentCard(deckId, currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentCard(deckId, currentIndex - 1)
    }
  }

  const changeCurrentCard = (cardOrder: number) => {
    setCurrentCard(deckId, cardOrder)
    setCurrentIndex(cardOrder)
  }

  return (
    <div className="container mx-auto grid max-w-4xl grid-cols-[auto_1fr] gap-4 p-6">
      <StudyCardsMenu
        cards={cards}
        currentCard={currentCard}
        changeCurrentCard={changeCurrentCard}
      />
      <div>
        <StudyProgressBar
          currentIndex={currentIndex}
          cardsLength={cards.length}
          className="mb-4"
        />

        <StudyCard
          card={currentCard}
          totalCards={cards.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirst={currentIndex === 0}
          isLast={isLastCard}
        />
      </div>
    </div>
  )
}
