"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import * as React from "react"

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  // next-themes (unmaintained) always renders its anti-flash <script> with an
  // executable type, but React 19 warns when that script is part of a purely
  // client-side render (e.g. this provider remounting on a locale switch,
  // since [locale] is the outermost dynamic segment) — such a script was
  // always inert there anyway, since browsers never execute React-DOM-inserted
  // <script> tags. On the server the tag keeps its real executable type, so
  // the genuine SSR flash-prevention behavior is untouched; on the client the
  // now-inert copy gets a non-executable type so React stops warning about it.
  // See https://github.com/pacocoursey/next-themes/issues/387
  const scriptProps = typeof window === "undefined" ? undefined : ({ type: "application/json" } as const)

  return (
    <NextThemesProvider {...props} scriptProps={scriptProps}>
      {children}
    </NextThemesProvider>
  )
}
