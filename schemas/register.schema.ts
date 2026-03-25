import z, { email, string } from "zod"

export const RegisterSchema = z.object({
  email: email(),
  password: string(),
  name: string(),
})

export type RegisterSchema = z.infer<typeof RegisterSchema>
