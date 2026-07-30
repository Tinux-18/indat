import { acceptClientHintsHeader } from "@teispace/next-themes/server"
import { NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"
import { routing } from "i18n/routing"
import { isValidAuthCookie, TONIGHT_AUTH_COOKIE } from "lib/tonight/auth"

const intlMiddleware = createMiddleware(routing)

const LOCALE_PATTERN = routing.locales.join("|")
const TONIGHT_PAGE_REGEX = new RegExp(`^/(?:(${LOCALE_PATTERN})/)?tonight(?:/(.*))?$`)

// Opts the browser into sending the Sec-CH-Prefers-Color-Scheme client hint on
// future requests, so @teispace/next-themes' getTheme() can resolve a
// system-theme user's dark/light preference server-side even before any theme
// cookie exists (e.g. they've never manually toggled) -- without this, the
// server always defaults "system" to light, causing a flash on dark-mode
// devices whenever the root layout remounts (like our locale switch).
function withColorSchemeHint(response: NextResponse) {
  response.headers.set("Accept-CH", acceptClientHintsHeader())
  return response
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/api/tonight")) {
    if (pathname === "/api/tonight/auth") {
      return withColorSchemeHint(NextResponse.next())
    }

    const authed = await isValidAuthCookie(request.cookies.get(TONIGHT_AUTH_COOKIE)?.value)
    if (!authed) {
      return withColorSchemeHint(NextResponse.json({ error: "Unauthorized" }, { status: 401 }))
    }

    return withColorSchemeHint(NextResponse.next())
  }

  const match = pathname.match(TONIGHT_PAGE_REGEX)
  if (match) {
    const [, locale, rest] = match
    const isPasscodePage = (rest ?? "").startsWith("passcode")

    if (!isPasscodePage) {
      const authed = await isValidAuthCookie(request.cookies.get(TONIGHT_AUTH_COOKIE)?.value)
      if (!authed) {
        const url = request.nextUrl.clone()
        url.pathname = `${locale ? `/${locale}` : ""}/tonight/passcode`
        url.searchParams.set("next", pathname)
        return withColorSchemeHint(NextResponse.redirect(url))
      }
    }
  }

  return withColorSchemeHint(await intlMiddleware(request))
}

export const config = {
  // Match internationalized pathnames, plus the Tonight app's pages and API routes
  matcher: ["/", "/(de|en|ro)/:path*", "/tonight/:path*", "/api/tonight/:path*"],
}
