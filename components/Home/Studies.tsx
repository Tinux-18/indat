"use client"
import { useTranslations } from "next-intl"
import React from "react"

export function Studies() {
  const translate = useTranslations("Studies")
  return (
    <section className="mt-8 flex flex-col items-center space-y-6 lg:mb-8 lg:space-y-8">
      <h2 className="text-3xl">{translate("header")}</h2>
      <div></div>
    </section>
  )
}
