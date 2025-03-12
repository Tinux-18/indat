import "styles/tailwind.css"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
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
    <html lang={locale} className={poppins.className}>
      <NextIntlClientProvider messages={messages}>
        <body>{children}</body>
      </NextIntlClientProvider>
    </html>
  )
}
