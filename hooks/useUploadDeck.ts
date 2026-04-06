"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Deck } from "@/types"
import { DeckSchema } from "@/schemas"
import { BACKEND_URL } from "@/config"

function generateTempId(file: File): string {
  return `temp-${file.name}-${file.size}-${Date.now()}`
}

export function useUploadDeck() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append("file", file)

      // language preference
      formData.append("language", "en")

      const res = await fetch(`${BACKEND_URL}/decks/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "Upload failed")
      }

      const data = await res.json()
      return DeckSchema.parse(data)
    },

    onMutate: async (file) => {
      await queryClient.cancelQueries({ queryKey: ["decks"] })

      const previousDecks = queryClient.getQueryData<Deck[]>(["decks"])

      const tempId = generateTempId(file)

      const pendingDeck: Deck = {
        id: tempId,
        title: file.name.replace(/\.[^/.]+$/, ""),
        description: null,
        pdfUrl: URL.createObjectURL(file),
        status: "processing",
        cardCount: 0,
        cardsStudied: 0,
        icon: "clock",
        language: "en",
        starred: false,
        archived: false,
        archivedAt: null,
        lastAccessedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      queryClient.setQueryData<Deck[]>(["decks"], (old = []) => [
        pendingDeck,
        ...old,
      ])

      return { previousDecks, tempId }
    },

    onSuccess: (newDeck, file, context) => {
      // ⭐ Replace specific temp deck with real one
      queryClient.setQueryData<Deck[]>(["decks"], (old = []) =>
        old.map((deck) => (deck.id === context?.tempId ? newDeck : deck))
      )

      queryClient.invalidateQueries({ queryKey: ["decks"] })
      queryClient.invalidateQueries({ queryKey: ["user-info"] })
    },

    onError: (err, file, context) => {
      // ⭐ Remove only the failed temp deck
      queryClient.setQueryData<Deck[]>(["decks"], (old = []) =>
        old.filter((deck) => deck.id !== context?.tempId)
      )

      console.error("Upload failed:", err)

      queryClient.invalidateQueries({ queryKey: ["user-info"] })
    },
  })
}
