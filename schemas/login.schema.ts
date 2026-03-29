import z from "zod"

export const LoginSchema = z.object({
  email: z.email().nonempty(),
  password: z.string().min(8).max(128),
})

export type LoginSchema = z.infer<typeof LoginSchema>
