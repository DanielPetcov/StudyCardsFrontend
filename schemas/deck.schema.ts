import z from "zod"

import { languagesEnum, deckStatusesEnum } from "./enums"

export const DeckSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  cardCount: z.number(),

  language: z.enum(languagesEnum),
  status: z.enum(deckStatusesEnum),

  createdAt: z.date(),
})

export type DeckSchemaType = z.infer<typeof DeckSchema>
