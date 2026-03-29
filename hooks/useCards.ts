import { useQuery } from "@tanstack/react-query"

import { BACKEND_URL } from "@/config"

import z from "zod"
import { CardSchema } from "@/schemas/card.schema"

export function useCards(deckId: string) {
  return useQuery({
    queryKey: ["deck-cards", deckId],
    queryFn: async () => {
      const res = await fetch(`${BACKEND_URL}/decks/${deckId}/cards`, {
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to fetch cards")

      const data = await res.json()

      return z.array(CardSchema).parse(data)
    },
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
  })
}
