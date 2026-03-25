import z, { email, string } from "zod"

export const LoginSchema = z.object({
  email: email().nonempty(),
  password: string().min(8).max(128),
})

export type LoginSchema = z.infer<typeof LoginSchema>
