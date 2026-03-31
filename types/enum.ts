export const plansEnum = ["free", "pro"] as const
export const languagesEnum = ["en", "ro", "es", "fr", "de"] as const
export const deckStatusesEnum = ["processing", "ready", "failed"] as const
export const deckIconNames = [
  "language",
  "book-open",
  "brain",
  "code",
  "flask",
  "dna",
  "atom",
  "calculator",
  "globe",
  "landmark",
  "scale",
  "briefcase",
  "palette",
  "music",
  "heart",
  "cpu",
  "database",
  "chart",
  "rocket",
  "leaf",
  "microscope",
  "book",
  "theater",
  "gamepad",
  "clock",
] as const

export type Plan = (typeof plansEnum)[number]
export type Language = (typeof languagesEnum)[number]
export type DeckStatus = (typeof deckStatusesEnum)[number]
export type DeckIconName = (typeof deckIconNames)[number]

export const cardDifficulties = ["easy", "medium", "hard"] as const
export type CardDifficulty = (typeof cardDifficulties)[number]
