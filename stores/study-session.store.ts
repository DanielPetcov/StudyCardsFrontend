import { create } from "zustand"
import { persist } from "zustand/middleware"

interface StudySessionStore {
  sessions: Record<
    string,
    {
      deckId: string
      currentCardIndex: number
      startedAt: Date
      answers: Record<
        string,
        {
          optionId: string
          isCorrect: boolean
        }
      >
      reviewLater: string[] // card IDs
    }
  >

  // Actions
  setCurrentCard: (deckId: string, index: number) => void // used
  answerCard: (
    deckId: string,
    cardId: string,
    optionId: string,
    correct: boolean
  ) => void
  getCardAnswer: (
    deckId: string,
    cardId: string
  ) => {
    optionId: string
    isCorrect: boolean
  } | null
  isCardAnswered: (deckId: string, cardId: string) => boolean

  markForReview: (deckId: string, cardId: string) => void
  completeSession: (deckId: string) => void
  resetSession: (deckId: string) => void
  getSession: (deckId: string) => any // used
  getProgress: (
    deckId: string,
    totalCards: number
  ) => {
    answered: number
    correct: number
    incorrect: number
    remaining: number
    isComplete: boolean
  }
}

export const useStudySession = create<StudySessionStore>()(
  persist(
    (set, get) => ({
      sessions: {},

      setCurrentCard: (deckId, index) =>
        set((state) => ({
          sessions: {
            ...state.sessions,
            [deckId]: {
              ...state.sessions[deckId],
              deckId,
              currentCardIndex: index,
              startedAt: state.sessions[deckId]?.startedAt || new Date(),
              answers: state.sessions[deckId]?.answers || {},
              reviewLater: state.sessions[deckId]?.reviewLater || [],
            },
          },
        })),

      answerCard: (deckId, cardId, optionId, correct) =>
        set((state) => ({
          sessions: {
            ...state.sessions,
            [deckId]: {
              ...state.sessions[deckId],
              answers: {
                ...state.sessions[deckId]?.answers,
                [cardId]: { optionId, isCorrect: correct },
              },
            },
          },
        })),

      markForReview: (deckId, cardId) =>
        set((state) => {
          const current = state.sessions[deckId]?.reviewLater || []
          const isAlreadyMarked = current.includes(cardId)

          return {
            sessions: {
              ...state.sessions,
              [deckId]: {
                ...state.sessions[deckId],
                reviewLater: isAlreadyMarked
                  ? current.filter((id) => id !== cardId) // Toggle off
                  : [...current, cardId], // Toggle on
              },
            },
          }
        }),

      completeSession: (deckId) =>
        set((state) => ({
          sessions: {
            ...state.sessions,
            [deckId]: {
              ...state.sessions[deckId],
              completedAt: new Date(),
            },
          },
        })),

      resetSession: (deckId) =>
        set((state) => {
          const { [deckId]: _, ...rest } = state.sessions
          return { sessions: rest }
        }),

      getSession: (deckId) => get().sessions[deckId] || null,

      // ⭐ Get card's answer status
      getCardAnswer: (deckId, cardId) => {
        const session = get().sessions[deckId]
        return session?.answers?.[cardId] || null
      },

      // ⭐ Check if card is answered
      isCardAnswered: (deckId, cardId) => {
        const session = get().sessions[deckId]
        return !!session?.answers?.[cardId]
      },

      getProgress: (deckId, totalCards) => {
        const session = get().sessions[deckId]
        const answers = session?.answers || {}

        const answered = Object.keys(answers).length
        const correct = Object.values(answers).filter(
          (a) => a.isCorrect === true
        ).length
        const incorrect = answered - correct
        const remaining = totalCards - answered
        const isComplete = answered === totalCards

        return { answered, correct, incorrect, remaining, isComplete }
      },
    }),
    {
      name: "study-sessions",
    }
  )
)
