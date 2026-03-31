import { cardDifficulties } from "@/types/enum"
import { z } from "zod"

export const CardOptionSchema = z.object({
  id: z.uuid(),
  cardId: z.uuid(),
  text: z.string(),
  isCorrect: z.boolean(),
  explanation: z.string().nullable(),
  order: z.number().int().min(0),
})

export const CardSchema = z.object({
  id: z.uuid(),
  deckId: z.uuid(),
  question: z.string(),
  difficulty: z.enum(cardDifficulties),
  order: z.number().int().min(0),
  options: z.array(CardOptionSchema),
})
