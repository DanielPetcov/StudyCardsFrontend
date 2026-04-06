"use client"

import { Link } from "@/i18n/navigation"

import { useState } from "react"
import { Eye, EyeClosed, MoveRight } from "lucide-react"

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

import FormError from "@/components/general/FormError"
import { useTranslations } from "next-intl"
import { SubmitHandler, useForm } from "react-hook-form"
import { RegisterSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterUser } from "@/actions/register-user"

interface AccountStepProps {
  onNext: () => void
}

export default function AccountStep({ onNext }: AccountStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  })
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [registerError, setRegisterError] = useState<string | null | undefined>(
    null
  )

  const t = useTranslations("RegisterPage")

  const handleSuccess = () => {
    onNext()
  }

  const handleError = (message?: string) => {
    setRegisterError(message)
  }

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    try {
      setLoading(true)
      const result = await RegisterUser({
        dto: data,
        onSuccess: handleSuccess,
        onError: handleError,
      })
      if (result) {
        onNext()
      }
    } catch (error) {
      console.log(error)
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
                type={passwordVisible ? "text" : "password"}
                disabled={loading}
                autoComplete="new-password"
                placeholder={t("placeHolders.password")}
                {...register("password")}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="button"
                  disabled={loading}
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

          {registerError && <FormError message={registerError} />}

          <Button disabled={loading} type="submit" size="lg" className="w-full">
            {t("createButton")}
            <MoveRight />
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
