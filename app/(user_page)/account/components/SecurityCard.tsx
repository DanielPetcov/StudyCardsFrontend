"use client"
import { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { Eye, EyeClosed, Loader2, Lock } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import FormError from "@/components/FormError"
import SettingsCardTitle from "./SettingsCardTitle"
import { ChangePasswordSchema } from "@/schemas/changePassword.schema"

import { ChangePassword } from "@/actions/change-password"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

export default function SecurityCard() {
  const t = useTranslations("Account")

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [apiError, setApiError] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  })

  const currentPassword = watch("currentPassword")
  const newPassword = watch("newPassword")

  useEffect(() => {
    if (apiError) {
      setApiError(null)
    }
  }, [currentPassword, newPassword])

  const onSubmit: SubmitHandler<ChangePasswordSchema> = async (data) => {
    setApiError(null)
    setLoading(true)

    const error = await ChangePassword(data.currentPassword, data.newPassword)

    if (error) {
      setApiError(error)
    } else {
      toast.success("Password changed")
      reset()
    }

    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <SettingsCardTitle title={t("title")} Icon={Lock} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="currentPassword" className="text-muted-foreground">
              {t("securityCard.currentPassword")}
            </Label>
            <Input
              disabled={loading}
              id="currentPassword"
              type="password"
              {...register("currentPassword")}
            />
            {errors.currentPassword && (
              <FormError message={errors.currentPassword.message ?? ""} />
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-muted-foreground">
              {t("securityCard.newPassword")}
            </Label>
            <InputGroup>
              <InputGroupAddon align="inline-end">
                {passwordVisible ? (
                  <Eye onClick={() => setPasswordVisible(false)} />
                ) : (
                  <EyeClosed onClick={() => setPasswordVisible(true)} />
                )}
              </InputGroupAddon>
              <InputGroupInput
                disabled={loading}
                id="newPassword"
                type={passwordVisible ? "text" : "password"}
                {...register("newPassword")}
              />
            </InputGroup>
            {errors.newPassword && (
              <FormError message={errors.newPassword.message ?? ""} />
            )}
          </div>
          {apiError && <FormError message={apiError} />}
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                {t("securityCard.changing")}
              </>
            ) : (
              <p>{t("securityCard.change")}</p>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
