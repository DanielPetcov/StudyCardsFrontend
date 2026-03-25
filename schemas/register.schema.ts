import z, { email, string } from "zod"

export const RegisterSchema = z.object({
  email: email().nonempty(),
  password: string().min(8).max(128),
  name: string().nonempty(),
})

export type RegisterSchema = z.infer<typeof RegisterSchema>
