import { authClient } from "@/lib/auth-client"

import { RegisterSchema } from "@/schemas/register.schema"

interface RegisterUserProps {
  dto: RegisterSchema
  setLoading: (value: boolean) => void
  setError: (message: string) => void
}

export async function RegisterUser({
  dto,
  setLoading,
  setError,
}: RegisterUserProps) {
  const { data, error } = await authClient.signUp.email(
    {
      email: dto.email,
      name: dto.name,
      password: dto.password,
    },
    {
      onRequest: (ctx) => {
        setLoading(true)
      },
      onSuccess: (ctx) => {
        setLoading(false)
      },
      onError: (ctx) => {
        setError(ctx.error.message)
        setLoading(false)
      },
    }
  )

  return data
}
