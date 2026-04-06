import { usePathname, useRouter } from "@/i18n/navigation"
import { Language } from "@/types/enum"

export function useLocaleNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  const changeLocale = (locale: Language) => {
    router.replace(pathname, { locale })
  }

  return changeLocale
}
