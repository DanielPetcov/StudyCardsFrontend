import z from "zod"
import {
  DeckSchema,
  CreateDeckSchema,
  UpdateDeckSchema,
} from "@/schemas/deck.schema"

export type Deck = z.infer<typeof DeckSchema>

export type DeckActive = Deck & {
  archived: false
}

export type DeckStarred = Deck & {
  starred: true
  archived: false
}

export type DeckArchived = Deck & {
  archived: true
  archivedAt: Date // Non-nullable for archived decks
}

export type DeckRecent = Deck & {
  lastAccessedAt: Date // Non-nullable for recent decks
}

//

export type CreateDeck = z.infer<typeof CreateDeckSchema>
export type UpdateDeck = z.infer<typeof UpdateDeckSchema>
