"use client"
import { useTranslations } from "next-intl"
import React from "react"

/**
 * Display embedded intro video, explaining who I am and what I can do.
 */
export function Video() {
  const translate = useTranslations("Video")
  return (
    <section className="mt-8 flex flex-col items-center space-y-6 font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:space-y-8 lg:text-xl">
      <p className="max-w-2xl">{translate("hi")}</p>
      <p className="max-w-2xl">{translate("indat")}</p>
      <p className="max-w-2xl">{translate("me")}</p>
    </section>
  )
}
