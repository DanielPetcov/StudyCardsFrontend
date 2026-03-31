import z from "zod"
import { CardTestSchema } from "@/schemas/cardTest.schema"

export type CardTest = z.infer<typeof CardTestSchema>
