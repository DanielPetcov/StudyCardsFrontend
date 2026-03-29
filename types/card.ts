import z from "zod"
import { CardSchema } from "@/schemas/card.schema"

export type Card = z.infer<typeof CardSchema>
