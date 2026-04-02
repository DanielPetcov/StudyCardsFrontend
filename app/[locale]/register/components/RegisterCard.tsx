"use client"

import { Link } from "@/i18n/navigation"

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeClosed, Loader2, MoveRight } from "lucide-react"
import { toast } from "sonner"

import { RegisterSchema } from "@/schemas/register.schema"
import { RegisterUser } from "@/actions/register-user"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group"

import FormError from "@/components/FormError"
import { useTranslations } from "next-intl"

export default function RegisterCard() {
  const t = useTranslations("RegisterPage")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  })

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formActionError, setFormActionError] = useState<string | null>(null)

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    try {
      setFormActionError(null)
      setLoading(true)

      const actionData = await RegisterUser({
        dto: data,
        setLoading,
        setError: setFormActionError,
      })

      if (actionData) {
        toast.success("Account created successfully")
      }
    } catch {
      setFormActionError("A network error happened. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="gap-3">
        <div className="space-y-1.5">
          <CardTitle className="text-xl tracking-[-0.02em]">
            {t("title")}
          </CardTitle>
          <CardDescription className="max-w-[34ch]">
            {t("subTitle")}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              disabled={loading}
              autoComplete="email"
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && <FormError message={errors.email.message ?? ""} />}
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              disabled={loading}
              autoComplete="name"
              placeholder={t("placeHolders.name")}
              {...register("name")}
            />
            {errors.name && <FormError message={errors.name.message ?? ""} />}
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="password">Password</Label>
            <InputGroup>
              <InputGroupInput
                id="password"
                disabled={loading}
                type={passwordVisible ? "text" : "password"}
                autoComplete="new-password"
                placeholder={t("placeHolders.password")}
                {...register("password")}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setPasswordVisible((prev) => !prev)}
                  aria-label={
                    passwordVisible ? "Hide password" : "Show password"
                  }
                >
                  {passwordVisible ? <EyeClosed /> : <Eye />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            {errors.password && (
              <FormError message={errors.password.message ?? ""} />
            )}
          </div>

          {formActionError && <FormError message={formActionError} />}

          <Button disabled={loading} type="submit" size="lg" className="w-full">
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                {t("creating")}
              </>
            ) : (
              <>
                {t("createButton")}
                <MoveRight />
              </>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-center text-sm text-muted-foreground">
          {t("alreadyHaveAccount")}
          <Link
            href="/login"
            className="ml-1 font-medium text-primary transition-colors hover:text-primary/80"
          >
            {t("loginLink")}
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
