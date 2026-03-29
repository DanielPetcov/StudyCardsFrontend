"use client"

import StudyCard from "@/components/study/StudyCard"
import { useCards } from "@/hooks/useCards"
import { useStudySession } from "@/stores/study-session.store"
import { useParams } from "next/navigation"
import { useEffect } from "react"

import { Progress } from "@/components/ui/progress"

export default function DeckPage() {
  const params = useParams()
  const deckId = params.id as string

  const { data: cards, isLoading } = useCards(deckId)

  const session = useStudySession((state) => state.getSession(deckId))
  const setCurrentCard = useStudySession((state) => state.setCurrentCard)
  const currentIndex = session?.currentCardIndex ?? 0

  useEffect(() => {
    if (session && session.currentCardIndex > 0) {
      // Show modal: "Continue from card X?"
      // (implement this with a dialog component)
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

  const progressValue = parseInt(
    (((currentIndex + 1) / cards.length) * 100).toPrecision(2)
  )

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <Progress value={progressValue} className="mb-4" />

      <StudyCard
        card={currentCard}
        totalCards={cards.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isFirst={currentIndex === 0}
        isLast={isLastCard}
      />
    </div>
  )
}
