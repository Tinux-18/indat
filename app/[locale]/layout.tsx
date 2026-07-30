import "styles/tailwind.css"
import { ThemeProvider } from "@teispace/next-themes"
import { getTheme } from "@teispace/next-themes/server"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { routing } from "i18n/routing"
import { poppins } from "../fonts"
import "flowbite-react"
export default async function RootLayout(props: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const params = await props.params
  const { locale } = params
  const { children } = props

  if (!routing.locales.includes(locale)) {
    notFound()
  }

  const [messages, initialTheme] = await Promise.all([getMessages(), getTheme()])
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="InDat" />
      </head>
      <body className={`${poppins.className} h-screen min-h-full`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            initialTheme={initialTheme ?? undefined}
          >
            {children}
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
