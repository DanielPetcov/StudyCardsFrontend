import z from "zod"

export const RegisterSchema = z.object({
  email: z.email().nonempty(),
  password: z.string().min(8).max(128),
  name: z.string().nonempty(),
})

export type RegisterSchema = z.infer<typeof RegisterSchema>
