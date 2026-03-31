import { z } from "zod"

export const CardTestSchema = z.object({
  optionId: z.string().min(1, "You must select an option"),
})
