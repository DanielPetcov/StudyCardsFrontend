import { create } from "zustand"
import { persist } from "zustand/middleware"

interface StudySessionStore {
  sessions: Record<
    string,
    {
      deckId: string
      currentCardIndex: number
      startedAt: Date
      answers: Record<string, "correct" | "incorrect">
      reviewLater: string[] // card IDs
    }
  >

  // Actions
  setCurrentCard: (deckId: string, index: number) => void
  answerCard: (deckId: string, cardId: string, correct: boolean) => void
  markForReview: (deckId: string, cardId: string) => void
  resetSession: (deckId: string) => void
  getSession: (deckId: string) => any
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
            },
          },
        })),

      answerCard: (deckId, cardId, correct) =>
        set((state) => ({
          sessions: {
            ...state.sessions,
            [deckId]: {
              ...state.sessions[deckId],
              answers: {
                ...state.sessions[deckId]?.answers,
                [cardId]: correct ? "correct" : "incorrect",
              },
            },
          },
        })),

      markForReview: (deckId, cardId) =>
        set((state) => ({
          sessions: {
            ...state.sessions,
            [deckId]: {
              ...state.sessions[deckId],
              reviewLater: [
                ...(state.sessions[deckId]?.reviewLater || []),
                cardId,
              ],
            },
          },
        })),

      resetSession: (deckId) =>
        set((state) => {
          const { [deckId]: _, ...rest } = state.sessions
          return { sessions: rest }
        }),

      getSession: (deckId) => get().sessions[deckId] || null,
    }),
    {
      name: "study-sessions", // localStorage key
    }
  )
)
