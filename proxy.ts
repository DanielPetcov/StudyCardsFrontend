import createMiddleware from "next-intl/middleware"
import { type NextRequest, NextResponse } from "next/server"
import { routing } from "./i18n/routing"

const handleI18nRouting = createMiddleware(routing)

export default function proxy(request: NextRequest) {
  const cookie = request.cookies
  const token =
    cookie.get("__Secure-better-auth.session_token") ??
    cookie.get("better-auth.session_token")

  const response = handleI18nRouting(request)

  const pathname = response.headers.get("x-middleware-rewrite")
    ? new URL(response.headers.get("x-middleware-rewrite")!).pathname
    : request.nextUrl.pathname

  const segments = pathname.split("/").filter(Boolean)
  const maybeLocale = segments[0]
  const locale = routing.locales.includes(
    maybeLocale as (typeof routing.locales)[number]
  )
    ? maybeLocale
    : routing.defaultLocale

  const pathWithoutLocale = routing.locales.includes(
    maybeLocale as (typeof routing.locales)[number]
  )
    ? `/${segments.slice(1).join("/")}`
    : pathname

  const isPublicRoute =
    pathWithoutLocale === "/" ||
    pathWithoutLocale === "/login" ||
    pathWithoutLocale === "/register"

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  return response
}

export const config = {
  matcher: ["/", "/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
}
