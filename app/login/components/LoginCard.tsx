"use client"

import Link from "next/link"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeClosed, Loader2, MoveRight } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardAction,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

import FormError from "@/components/FormError"

import { LoginSchema } from "@/schemas/login.schema"
import { LoginUser } from "@/actions/login-user"

export default function LoginCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
  })

  const [visiblePassword, setVisiblePassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formActionError, setFormActionError] = useState<string | null>(null)

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      setFormActionError(null)
      setLoading(true)

      const actionData = await LoginUser({
        dto: data,
        setLoading,
        setError: setFormActionError,
      })

      if (actionData) {
        toast.success("Successfully logged in")
      }
    } catch {
      setFormActionError("A network error happened. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      interactive={false}
      className="w-full max-w-md bg-surface-container-lowest/90 backdrop-blur-sm"
    >
      <CardHeader className="gap-3">
        <div className="space-y-1.5">
          <CardTitle className="text-xl tracking-[-0.02em]">
            Welcome back
          </CardTitle>
          <CardDescription className="max-w-[32ch] text-xs">
            Log in to continue studying, review your decks, and pick up where
            you left off.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2.5">
            <Label htmlFor="email">Email</Label>
            <InputGroup>
              <InputGroupInput
                id="email"
                type="email"
                disabled={loading}
                autoComplete="email"
                placeholder="you@example.com"
                {...register("email")}
              />
            </InputGroup>
            {errors.email && <FormError message={errors.email.message ?? ""} />}
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary transition-colors hover:text-primary/80"
              >
                Forgot password?
              </Link>
            </div>

            <InputGroup>
              <InputGroupInput
                id="password"
                type={visiblePassword ? "text" : "password"}
                disabled={loading}
                autoComplete="current-password"
                placeholder="Enter your password"
                {...register("password")}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setVisiblePassword((prev) => !prev)}
                  aria-label={
                    visiblePassword ? "Hide password" : "Show password"
                  }
                >
                  {visiblePassword ? <EyeClosed /> : <Eye />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>

            {errors.password && (
              <FormError message={errors.password.message ?? ""} />
            )}
          </div>

          {formActionError && <FormError message={formActionError} />}

          <Button disabled={loading} type="submit" className="w-full">
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                Log in
                <MoveRight />
              </>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary transition-colors hover:text-primary/80"
          >
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
