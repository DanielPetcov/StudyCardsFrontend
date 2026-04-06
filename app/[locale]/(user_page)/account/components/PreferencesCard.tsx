"use client"

import { Check, ChevronsUpDown, Settings } from "lucide-react"
import SettingsCardTitle from "./SettingsCardTitle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { useEffect, useState } from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { useMe } from "@/hooks/useMe"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

import { languagesEnum, type Language } from "@/types/enum"
import { Field, FieldLabel } from "@/components/ui/field"
import { useLocale, useTranslations } from "next-intl"
import { useLocaleNavigation } from "@/hooks/useChangeLocale"
import { Skeleton } from "@/components/ui/skeleton"
import SkeletonAccountCard from "@/components/general/SkeletonAccountCard"
import { usePathname, useRouter } from "@/i18n/navigation"

const languages: { value: Language; label: string }[] = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "ro",
    label: "Romanian",
  },
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
  const t = useTranslations("Account")

  const locale = useLocale()
  const systemLanguage = isLanguage(locale) ? locale : "ro"
  const changeLocale = useLocaleNavigation()

  const { data, isLoading } = useMe()
  const {
    control,
    handleSubmit,
    resetField,
    formState: { isDirty },
  } = useForm<PreferencesFormValues>({
    resolver: zodResolver(PreferencesSchema),
    defaultValues: {
      prefferedLanguage: data ? data.language : "ro",
      systemLanguage: systemLanguage,
    },
  })

  useEffect(() => {
    const systemLanguage = isLanguage(locale) ? locale : "ro"
    resetField("systemLanguage", {
      keepDirty: false,
      defaultValue: systemLanguage,
    })
  }, [locale])

  if (isLoading || !data) {
    return <SkeletonAccountCard />
  }

  const onSubmit: SubmitHandler<PreferencesFormValues> = async (data) => {
    try {
      changeLocale(data.systemLanguage)
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) {
    return <SkeletonAccountCard />
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

          <Button disabled={!isDirty} className="w-full" type="submit">
            {t("preferencesCard.change")}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
