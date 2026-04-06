import { languagesEnum, plansEnum } from "@/types/enum"
import z from "zod"

export const UserResponseSchema = z.object({
  name: z.string(),
  email: z.string(),
  language: z.enum(languagesEnum),
  uploadsUsed: z.number().int().min(0),
  activeDecks: z.number().int().min(0),
  plan: z.enum(plansEnum),
})
