import z, { email, string } from "zod"

export const ChangePasswordSchema = z.object({
  currentPassword: string().min(8).max(128),
  newPassword: string().min(8).max(128),
})

export type ChangePasswordSchema = z.infer<typeof ChangePasswordSchema>
