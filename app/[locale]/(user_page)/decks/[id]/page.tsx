"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import StudyCard from "@/components/study/studyCard/StudyCard"
import StudyCardsMenu from "@/components/study/studyCard/StudyCardsMenu"
import StudyProgressBar from "@/components/study/ProgressBar"

import { useCards } from "@/hooks/useCards"
import { useStudySession } from "@/stores/study-session.store"
import SummaryBlock from "@/components/study/SummaryBlock"
import { KeyboardInstructions } from "@/components/study/KeyboardInstructions"

export default function DeckPage() {
  const params = useParams()
  const deckId = params.id as string

  const { data: cards, isLoading } = useCards(deckId)

  const session = useStudySession((state) => state.getSession(deckId))
  const setCurrentCard = useStudySession((state) => state.setCurrentCard)
  const getProgress = useStudySession((state) => state.getProgress)
  const setShowSummary = useStudySession((state) => state.setShowSummary)
  const summary = useStudySession(
    (state) => state.sessions[deckId]?.showSummary ?? false
  )

  const [currentIndex, setCurrentIndex] = useState(
    session?.currentCardIndex ?? 0
  )

  useEffect(() => {
    if (session) {
      setCurrentIndex(session.currentCardIndex ?? 0)
    }
  }, [session])

  const cardsLength = cards?.length

  if (isLoading) return <div>Loading cards...</div>
  if (!cardsLength) return <div>No cards found</div>

  const finished = getProgress(deckId, cardsLength)

  const currentCard = cards[currentIndex]
  const isLastCard = currentIndex === cards.length - 1

  const handleNext = () => {
    if (!isLastCard) {
      const nextIndex = currentIndex + 1
      setCurrentCard(deckId, nextIndex)
      setCurrentIndex(nextIndex)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      setCurrentCard(deckId, prevIndex)
      setCurrentIndex(prevIndex)
    }
  }

  const changeCurrentCard = (cardOrder: number) => {
    setCurrentCard(deckId, cardOrder)
    setCurrentIndex(cardOrder)
  }

  const showSummaryFunction = () => {
    setShowSummary(deckId, true)
  }

  if (summary) return <SummaryBlock deckId={deckId} totalCards={cards.length} />

  return (
    <div className="container mx-auto grid max-w-4xl grid-cols-1 gap-4 p-6 lg:grid-cols-[auto_1fr]">
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
          onSummary={showSummaryFunction}
          isFirst={currentIndex === 0}
          isLast={isLastCard}
          isComplete={finished.isComplete}
        />

        <KeyboardInstructions className="mt-4 hidden lg:flex" />
      </div>
    </div>
  )
}
