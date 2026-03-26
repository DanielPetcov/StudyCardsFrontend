"use client"

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardAction,
} from "@/components/ui/card"
import Link from "next/link"

import { LoginSchema } from "@/schemas/login.schema"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Eye, EyeClosed, Loader, Send } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useState } from "react"

import FormError from "@/components/FormError"

import { LoginUser } from "@/actions/login-user"

import { toast } from "sonner"

export default function LoginCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  })

  const [visiblePassword, setVisiblePassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formActionError, setFormActionError] = useState<string | null>(null)

  const setLoadingFunction = (value: boolean) => {
    setLoading(value)
  }

  const setFormActionErrorFunction = (message: string) => {
    setFormActionError(message)
  }

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      const actionData = await LoginUser({
        dto: data,
        setLoading: setLoadingFunction,
        setError: setFormActionErrorFunction,
      })

      if (actionData) {
        toast.success("succesfully submited")
      }
    } catch (e) {
      setFormActionError("A network error happend. Try again")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="min-w-sm">
      <CardHeader>
        <CardTitle>Login page</CardTitle>
        <CardAction>
          <Link href="/register">Register</Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              disabled={loading}
              type="email"
              {...register("email")}
            />
            {errors.email && <FormError message={errors.email.message ?? ""} />}
          </div>

          <div className="space-y-2">
            <Label htmlFor="passowrd">Password</Label>
            <InputGroup>
              <InputGroupInput
                id="password"
                type={visiblePassword ? "text" : "password"}
                disabled={loading}
                {...register("password")}
              />
              <InputGroupAddon align="inline-end">
                {visiblePassword ? (
                  <Eye onClick={() => setVisiblePassword(false)} />
                ) : (
                  <EyeClosed onClick={() => setVisiblePassword(true)} />
                )}
              </InputGroupAddon>
            </InputGroup>

            {errors.password && (
              <FormError message={errors.password.message ?? ""} />
            )}
          </div>

          {loading ? (
            <Loader className="mx-auto animate-spin" />
          ) : (
            <Button disabled={loading} type="submit" className="w-full">
              Login
              <Send />
            </Button>
          )}
        </form>
        {formActionError && <FormError message={formActionError} />}
      </CardContent>
    </Card>
  )
}
