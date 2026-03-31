"use server"

import { Language } from "@/types/enum"
import { cookies } from "next/headers"

export async function ChangeLocale(value: Language) {
  const store = await cookies()
  store.set("locale", value)
}
