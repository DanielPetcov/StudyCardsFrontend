import { cardDifficulties } from "@/types/enum"
import { z } from "zod"

export const CardSchema = z.object({
  id: z.uuid(),
  deckId: z.uuid(),
  question: z.string(),
  explanation: z.string(),
  difficulty: z.enum(cardDifficulties),
  order: z.number().int().min(0),
})
