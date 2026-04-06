import { authClient } from "@/lib/auth-client"

import { RegisterSchema } from "@/schemas/register.schema"

interface RegisterUserProps {
  dto: RegisterSchema
  setLoading?: (value: boolean) => void
  setError?: (message: string) => void
  onSuccess?: () => void
  onError?: (message?: string) => void
}

export async function RegisterUser({
  dto,
  setLoading,
  setError,
  onSuccess,
  onError,
}: RegisterUserProps) {
  const { data, error } = await authClient.signUp.email(
    {
      email: dto.email,
      name: dto.name,
      password: dto.password,
      callbackURL: "/dashboard",
    },
    {
      onRequest: (ctx) => {
        if (setLoading) setLoading(true)
      },
      onSuccess: (ctx) => {
        if (onSuccess) {
          onSuccess()
          return
        }
        if (setLoading) setLoading(false)
      },
      onError: (ctx) => {
        if (onError) {
          onError(ctx.error.message)
          return
        }
        if (setError) setError(ctx.error.message)
        if (setLoading) setLoading(false)
      },
    }
  )

  return data
}
