import "styles/tailwind.css"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { ThemeProvider } from "app/providers/theme-provider"
import { routing } from "i18n/routing"
import { poppins } from "../fonts"

export default async function RootLayout(props: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const params = await props.params
  const { locale } = params
  const { children } = props

  if (!routing.locales.includes(locale)) {
    notFound()
  }

  const messages = await getMessages()
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="InDat" />
      </head>
      <body className={`${poppins.className} h-screen min-h-full`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
