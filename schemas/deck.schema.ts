import { z } from "zod"

import { languagesEnum, deckStatusesEnum, deckIconNames } from "@/types/enum"

export const DeckSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1).max(255),
  description: z.string().nullable(),

  pdfUrl: z.url(),
  cardCount: z.number().int().min(0).default(0),
  cardsStudied: z.number().int().min(0).default(0),

  language: z.enum(languagesEnum),
  status: z.enum(deckStatusesEnum),
  icon: z.enum(deckIconNames),

  starred: z.boolean().default(false),
  archived: z.boolean().default(false),
  archivedAt: z.coerce.date().nullable(),
  lastAccessedAt: z.coerce.date().nullable(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const CreateDeckSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  pdfUrl: z.url(),
  language: z.enum(languagesEnum).optional(),
  icon: z.enum(deckIconNames).optional(),
})

export const UpdateDeckSchema = CreateDeckSchema.partial().extend({
  starred: z.boolean().optional(),
  archived: z.boolean().optional(),
})

export const DeckResponseSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string().nullable(),

  pdfUrl: z.url(),
  fileId: z.string(),
  cardCount: z.number(),
  cardsStudied: z.number(),

  language: z.enum(languagesEnum),
  status: z.enum(deckStatusesEnum),
  icon: z.enum(deckIconNames),

  starred: z.boolean(),
  archived: z.boolean(),
  archivedAt: z.coerce.date().nullable(),
  lastAccessedAt: z.coerce.date().nullable(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
