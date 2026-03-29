import z from "zod"

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(8).max(128),
  newPassword: z.string().min(8).max(128),
})

export type ChangePasswordSchema = z.infer<typeof ChangePasswordSchema>
