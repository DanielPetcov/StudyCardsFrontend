import z from "zod"

import { useQuery } from "@tanstack/react-query"
import { BACKEND_URL } from "@/config"
import type { Deck } from "@/types/deck"
import { DeckSchema } from "@/schemas"

export function useDecks() {
  return useQuery({
    queryKey: ["decks"],
    queryFn: async (): Promise<Deck[]> => {
      const res = await fetch(`${BACKEND_URL}/decks`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) throw new Error("Failed to fetch decks")

      const data = await res.json()

      // ⭐ Zod automatically converts string dates to Date objects
      return z.array(DeckSchema).parse(data)
    },
    refetchInterval: (query) => {
      const hasProcessing = query.state.data?.some(
        (deck) => deck.status === "processing"
      )
      return hasProcessing ? 3000 : false
    },
    refetchOnWindowFocus: true,
    staleTime: 30 * 1000,
  })
}

// Specialized hooks
export function useActiveDecks() {
  const { data, ...rest } = useDecks()

  return {
    data: data?.filter((deck) => !deck.archived) ?? [],
    ...rest,
  }
}

export function useStarredDecks() {
  const { data, ...rest } = useDecks()

  return {
    data: data?.filter((deck) => deck.starred && !deck.archived) ?? [],
    ...rest,
  }
}

export function useArchivedDecks() {
  const { data, ...rest } = useDecks()

  return {
    data:
      data
        ?.filter((deck) => deck.archived)
        .sort(
          (a, b) =>
            (b.archivedAt?.getTime() ?? 0) - (a.archivedAt?.getTime() ?? 0)
        ) ?? [],
    ...rest,
  }
}

export function useRecentDecks(limit = 5) {
  const { data, ...rest } = useDecks()

  return {
    data:
      data
        ?.filter((deck) => !deck.archived && deck.lastAccessedAt)
        .sort(
          (a, b) =>
            (b.lastAccessedAt?.getTime() ?? 0) -
            (a.lastAccessedAt?.getTime() ?? 0)
        )
        .slice(0, limit) ?? [],
    ...rest,
  }
}
