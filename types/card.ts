import z from "zod"
import { CardSchema, CardOptionSchema } from "@/schemas/card.schema"

export type CardOption = z.infer<typeof CardOptionSchema>
export type Card = z.infer<typeof CardSchema>
