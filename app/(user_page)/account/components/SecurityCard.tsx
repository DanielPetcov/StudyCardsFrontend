"use client"

import { Eye, EyeClosed, Lock } from "lucide-react"

import SettingsCardTitle from "./SettingsCardTitle"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"

import { ChangePasswordSchema } from "@/schemas/changePassword.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import FormError from "@/components/FormError"

export default function SecurityCard() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ChangePasswordSchema),
  })

  const onSubmit: SubmitHandler<ChangePasswordSchema> = async (data) => {
    console.log(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <SettingsCardTitle title="Security" Icon={Lock} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="currentPassword" className="text-muted-foreground">
              Current password
            </Label>
            <Input
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
              New password
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
                id="newPassword"
                type={passwordVisible ? "text" : "password"}
                {...register("newPassword")}
              />
            </InputGroup>
            {errors.newPassword && (
              <FormError message={errors.newPassword.message ?? ""} />
            )}
          </div>
          <Button type="submit" className="w-full">
            Change
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
