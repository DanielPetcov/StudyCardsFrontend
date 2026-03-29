"use client"

import { Check, ChevronsUpDown, Settings } from "lucide-react"
import SettingsCardTitle from "./SettingsCardTitle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { languagesEnum } from "@/types/enums"
import { useState } from "react"
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

const languages: { value: (typeof languagesEnum)[number]; label: string }[] = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "ro",
    label: "Romanian",
  },
  {
    value: "ru",
    label: "Russian",
  },
]

export default function PreferencesCard() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <SettingsCardTitle title="Preferences" Icon={Settings} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label className="text-muted-foreground">Preferred Language</Label>
          <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger asChild>
              <Button
                aria-expanded={open}
                className="w-full justify-between"
                role="combobox"
                variant="outline"
              >
                {value
                  ? languages.find((language) => language.value === value)
                      ?.label
                  : "Select language..."}
                <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup>
                    {languages.map((country) => (
                      <CommandItem
                        key={country.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setOpen(false)
                        }}
                        value={country.value}
                      >
                        <Check
                          className={cn(
                            "mr-2 size-4",
                            value === country.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {country.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  )
}
