"use client"

import { Settings } from "lucide-react"
import SettingsCardTitle from "./SettingsCardTitle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMe } from "@/hooks/useMe"
import { useLocale, useTranslations } from "next-intl"
import SkeletonAccountCard from "@/components/general/SkeletonAccountCard"
import { authClient } from "@/lib/auth-client"
import { useLocaleNavigation } from "@/hooks/useChangeLocale"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { languagesEnum, type Language } from "@/types/enum"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

const languages: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "ro", label: "Romanian" },
]

const PreferencesSchema = z.object({
  prefferedLanguage: z.enum(languagesEnum),
  systemLanguage: z.enum(languagesEnum),
})

type PreferencesFormValues = z.infer<typeof PreferencesSchema>

function isLanguage(value: string): value is Language {
  return languagesEnum.includes(value as Language)
}

export default function PreferencesCard() {
  const { data, isLoading } = useMe()

  if (isLoading || !data) {
    return <SkeletonAccountCard />
  }

  return <PreferencesCardForm initialPreferredLanguage={data.language} />
}

function PreferencesCardForm({
  initialPreferredLanguage,
}: {
  initialPreferredLanguage: Language
}) {
  const [loading, setLoading] = useState(false)
  const t = useTranslations("Account")
  const locale = useLocale()
  const changeLocale = useLocaleNavigation()

  const systemLanguage = isLanguage(locale) ? locale : "ro"

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<PreferencesFormValues>({
    resolver: zodResolver(PreferencesSchema),
    defaultValues: {
      prefferedLanguage: initialPreferredLanguage,
      systemLanguage,
    },
  })

  const queryClient = useQueryClient()

  const onSubmit: SubmitHandler<PreferencesFormValues> = async (formData) => {
    try {
      setLoading(true)

      if (formData.prefferedLanguage !== initialPreferredLanguage) {
        await authClient.updateUser({
          language: formData.prefferedLanguage,
        })

        queryClient.invalidateQueries({ queryKey: ["user-info"] })
      }

      changeLocale(formData.systemLanguage)

      reset({
        prefferedLanguage: formData.prefferedLanguage,
        systemLanguage: formData.systemLanguage,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <SettingsCardTitle
            title={t("preferencesCard.title")}
            Icon={Settings}
          />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="prefferedLanguage"
            control={control}
            disabled={loading}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="prefferedLanguage">
                  {t("preferencesCard.prefferenceLabel")}
                </FieldLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>

                  <SelectContent>
                    {languages.map((l) => (
                      <SelectItem key={l.value} value={l.value}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Controller
            name="systemLanguage"
            control={control}
            disabled={loading}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="systemLanguage">
                  {t("preferencesCard.systemLanguageLabel")}
                </FieldLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>

                  <SelectContent>
                    {languages.map((l) => (
                      <SelectItem key={l.value} value={l.value}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Button
            disabled={!isDirty || loading}
            className="w-full"
            type="submit"
          >
            {loading ? "Updating..." : t("preferencesCard.change")}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
