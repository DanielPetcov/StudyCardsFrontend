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

export interface DeckRecently extends DeckSchemaType {
  icon: DeckIconName
  cardsStudied: number
  lastTimeAccessed: Date
}

export const deckRecenlty: DeckRecently[] = [
  {
    id: "deck_1",
    userId: "user_1",
    title: "JavaScript Basics",
    description:
      "Fundamentals of JS including variables, functions, and loops.",
    cardCount: 120,
    language: "en",
    status: "ready",
    createdAt: new Date("2025-01-10"),

    icon: "book-open",
    cardsStudied: 45,
    lastTimeAccessed: new Date("2026-03-25T08:42:15"),
  },
  {
    id: "deck_2",
    userId: "user_1",
    title: "React Hooks",
    description: "Understanding useState, useEffect, and custom hooks.",
    cardCount: 80,
    language: "en",
    status: "ready",
    createdAt: new Date("2025-02-15"),

    icon: "brain",
    cardsStudied: 60,
    lastTimeAccessed: new Date("2026-03-26T14:27:53"),
  },
  {
    id: "deck_3",
    userId: "user_1",
    title: "Databases",
    description: "SQL, PostgreSQL, and basic data modeling.",
    cardCount: 150,
    language: "en",
    status: "ready",
    createdAt: new Date("2025-03-01"),

    icon: "archive",
    cardsStudied: 30,
    lastTimeAccessed: new Date("2026-03-20T19:05:22"),
  },
  {
    id: "deck_4",
    userId: "user_1",
    title: "CSS Advanced",
    description: "Flexbox, Grid, and responsive design techniques.",
    cardCount: 95,
    language: "en",
    status: "ready",
    createdAt: new Date("2025-04-12"),

    icon: "star",
    cardsStudied: 70,
    lastTimeAccessed: new Date("2026-03-27T11:58:39"),
  },
  {
    id: "deck_5",
    userId: "user_1",
    title: "Algorithms",
    description: "Sorting, searching, and complexity analysis.",
    cardCount: 200,
    language: "en",
    status: "ready",
    createdAt: new Date("2025-05-20"),

    icon: "clock",
    cardsStudied: 200,
    lastTimeAccessed: new Date("2026-03-22T22:13:07"),
  },
]
