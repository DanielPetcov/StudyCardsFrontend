import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { cookies } from "next/headers"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === "/") {
    return NextResponse.next()
  }

  const cookie = await cookies()
  const token = cookie.get("better-auth.session_token")

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: ["/((?!^$|login|register|_next|favicon.ico|.*\\..*).*)"],
}
