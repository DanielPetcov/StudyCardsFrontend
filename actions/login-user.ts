import { LoginSchema } from "@/schemas/login.schema"

import { authClient } from "@/lib/auth-client"

interface LoginUserProps {
  dto: LoginSchema
  setLoading: (value: boolean) => void
  setError: (message: string) => void
}

export async function LoginUser({ dto, setLoading, setError }: LoginUserProps) {
  const { data, error } = await authClient.signIn.email(
    {
      email: dto.email,
      password: dto.password,
      callbackURL: "/dashboard",
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
