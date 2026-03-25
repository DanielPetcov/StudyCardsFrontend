"use client"
import { useState } from "react"

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { RegisterSchema } from "@/schemas/register.schema"

import { EyeIcon, EyeOffIcon, Send } from "lucide-react"

import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group"

import FormError from "@/components/FormError"

import { RegisterUser } from "@/actions/register-user"

export default function RegisterCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  })

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formActionError, setFormActionError] = useState<string | null>(null)

  const setLoadingFunction = (value: boolean) => {
    setLoading(value)
  }

  const setFormActionErrorFunction = (message: string) => {
    setFormActionError(message)
  }

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    const actionData = await RegisterUser({
      dto: data,
      setLoading: setLoadingFunction,
      setError: setFormActionErrorFunction,
    })

    if (actionData) {
      toast.success("succesfully submited")
    }
  }

  return (
    <Card className="min-w-sm">
      <CardHeader>
        <CardTitle>Register Page</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register("email")} />
            {errors.email && <FormError message={errors.email.message || ""} />}
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <FormError message={errors.name.message || ""} />}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <InputGroup>
              <InputGroupInput
                id="password"
                type={passwordVisible ? "text" : "password"}
                {...register("password")}
              />
              <InputGroupAddon align="inline-end">
                {passwordVisible ? (
                  <EyeIcon onClick={() => setPasswordVisible(false)} />
                ) : (
                  <EyeOffIcon onClick={() => setPasswordVisible(true)} />
                )}
              </InputGroupAddon>
            </InputGroup>
            {errors.password && (
              <FormError message={errors.password.message || ""} />
            )}
          </div>

          <Button type="submit" size={"lg"} className="w-full">
            Create account
            <Send />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
