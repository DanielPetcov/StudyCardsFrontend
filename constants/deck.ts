import { DeckSchemaType } from "@/schemas/deck.schema"

export const deckIconNames = [
  "book-open",
  "brain",
  "clock",
  "star",
  "archive",
] as const

export type DeckIconName = (typeof deckIconNames)[number]

// dashboard deck
export interface Deck extends DeckSchemaType {
  icon: DeckIconName
  cardsStudied: number
}
export const deckDashboard: Deck[] = [
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
    cardsStudied: 20,
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
    cardsStudied: 30,
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
    cardsStudied: 28,
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
    cardsStudied: 45,
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
    cardsStudied: 5,
  },
]

// recently deck
export interface DeckRecently extends Deck {
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

// stared deck
export interface DeckStared extends Deck {
  starred: boolean
}

export const deckStarred: DeckStared[] = [
  {
    id: "deck_s1",
    userId: "user_1",
    title: "TypeScript Essentials",
    description: "Types, interfaces, generics, and best practices.",
    cardCount: 110,
    language: "en",
    status: "ready",
    createdAt: new Date("2025-01-20"),

    icon: "book-open",
    cardsStudied: 80,
    starred: true,
  },
  {
    id: "deck_s2",
    userId: "user_1",
    title: "Node.js Fundamentals",
    description: "Event loop, streams, and backend basics.",
    cardCount: 95,
    language: "en",
    status: "ready",
    createdAt: new Date("2025-02-10"),

    icon: "brain",
    cardsStudied: 50,
    starred: true,
  },
  {
    id: "deck_s3",
    userId: "user_1",
    title: "System Design",
    description: "Scalability, load balancing, and architecture patterns.",
    cardCount: 140,
    language: "en",
    status: "ready",
    createdAt: new Date("2025-03-05"),

    icon: "archive",
    cardsStudied: 65,
    starred: true,
  },
  {
    id: "deck_s4",
    userId: "user_1",
    title: "Next.js Deep Dive",
    description: "SSR, SSG, routing, and performance optimization.",
    cardCount: 120,
    language: "en",
    status: "ready",
    createdAt: new Date("2025-03-25"),

    icon: "star",
    cardsStudied: 90,
    starred: true,
  },
  {
    id: "deck_s5",
    userId: "user_1",
    title: "Docker Basics",
    description: "Containers, images, and deployment workflows.",
    cardCount: 70,
    language: "en",
    status: "ready",
    createdAt: new Date("2025-04-10"),

    icon: "clock",
    cardsStudied: 25,
    starred: true,
  },
]

// archived deck
export interface DeckArchived extends Deck {
  archived: boolean
  archivedTime: Date
}

export const deckArchived: DeckArchived[] = [
  {
    id: "deck_a1",
    userId: "user_1",
    title: "HTML Basics",
    description: "Structure of web pages, tags, and semantic HTML.",
    cardCount: 60,
    language: "en",
    status: "ready",
    createdAt: new Date("2024-11-15"),

    icon: "book-open",
    cardsStudied: 60,
    archived: true,
    archivedTime: new Date("2026-03-25T08:42:15"),
  },
  {
    id: "deck_a2",
    userId: "user_1",
    title: "CSS Fundamentals",
    description: "Selectors, box model, and basic layouts.",
    cardCount: 85,
    language: "en",
    status: "ready",
    createdAt: new Date("2024-12-05"),

    icon: "star",
    cardsStudied: 85,
    archived: true,
    archivedTime: new Date("2026-03-25T08:42:15"),
  },
  {
    id: "deck_a3",
    userId: "user_1",
    title: "Git & GitHub",
    description: "Version control, branching, and collaboration.",
    cardCount: 70,
    language: "en",
    status: "ready",
    createdAt: new Date("2025-01-08"),

    icon: "archive",
    cardsStudied: 40,
    archived: true,
    archivedTime: new Date("2026-03-25T08:42:15"),
  },
  {
    id: "deck_a4",
    userId: "user_1",
    title: "REST APIs",
    description: "HTTP methods, status codes, and API design.",
    cardCount: 100,
    language: "en",
    status: "ready",
    createdAt: new Date("2025-02-18"),

    icon: "brain",
    cardsStudied: 100,
    archived: true,
    archivedTime: new Date("2026-03-25T08:42:15"),
  },
  {
    id: "deck_a5",
    userId: "user_1",
    title: "Authentication",
    description: "JWT, sessions, OAuth basics.",
    cardCount: 90,
    language: "en",
    status: "ready",
    createdAt: new Date("2025-03-10"),

    icon: "clock",
    cardsStudied: 55,
    archived: true,
    archivedTime: new Date("2026-03-25T08:42:15"),
  },
]
