import { defineRouting } from "next-intl/routing"

import { localesEnum } from "@/types/enum"

export const routing = defineRouting({
  locales: localesEnum,

  defaultLocale: "en",
})
