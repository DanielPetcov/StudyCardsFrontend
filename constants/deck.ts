import { DeckSchemaType } from "@/schemas/deck.schema"

export const deckIconNames = [
  "book-open",
  "brain",
  "clock",
  "star",
  "archive",
] as const

export type DeckIconName = (typeof deckIconNames)[number]

export interface DeckDashboard extends DeckSchemaType {
  icon: DeckIconName
}
export const deckDashboard: DeckDashboard[] = [
  {
    id: "deck-1",
    userId: "user-1",
    title: "JavaScript Fundamentals",
    description: "Core concepts like closures, promises, and async/await.",
    cardCount: 42,
    language: "en",
    status: "ready",
    createdAt: new Date("2026-03-01"),
    icon: "book-open",
  },
  {
    id: "deck-2",
    userId: "user-1",
    title: "React Patterns",
    description: "Hooks, state management, and reusable component patterns.",
    cardCount: 36,
    language: "en",
    status: "ready",
    createdAt: new Date("2026-03-05"),
    icon: "brain",
  },
  {
    id: "deck-3",
    userId: "user-1",
    title: "Database Systems",
    description: "SQL, indexing, transactions, and normalization.",
    cardCount: 28,
    language: "en",
    status: "processing",
    createdAt: new Date("2026-03-10"),
    icon: "clock",
  },
  {
    id: "deck-4",
    userId: "user-1",
    title: "Algorithms & Data Structures",
    description: "Sorting, trees, graphs, and complexity analysis.",
    cardCount: 55,
    language: "en",
    status: "ready",
    createdAt: new Date("2026-03-15"),
    icon: "star",
  },
  {
    id: "deck-5",
    userId: "user-1",
    title: "Operating Systems",
    description: "Processes, threads, memory management, and scheduling.",
    cardCount: 31,
    language: "en",
    status: "failed",
    createdAt: new Date("2026-03-20"),
    icon: "archive",
  },
]
