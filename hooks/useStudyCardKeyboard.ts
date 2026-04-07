"use client"

import { useEffect } from "react"

interface UseStudyCardKeyboardProps {
  isAnswered: boolean
  canGoNext: boolean
  canGoPrevious: boolean
  onNext: () => void
  onPrevious: () => void
  onSubmit: () => void
}

export function useStudyCardKeyboard({
  isAnswered,
  canGoNext,
  canGoPrevious,
  onNext,
  onPrevious,
  onSubmit,
}: UseStudyCardKeyboardProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null

      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return
      }

      const key = e.key.toLowerCase()

      if (["a", "arrowleft"].includes(key)) {
        if (canGoPrevious) onPrevious()
        return
      }

      if (["d", "arrowright"].includes(key)) {
        if (canGoNext) onNext()
        return
      }

      if (key === "enter" || key === " ") {
        e.preventDefault()

        if (!isAnswered) {
          onSubmit()
          return
        }

        if (canGoNext) {
          onNext()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isAnswered, canGoNext, canGoPrevious, onNext, onPrevious, onSubmit])
}
