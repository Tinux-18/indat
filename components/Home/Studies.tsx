"use client"
import { useTranslations } from "next-intl"
import React from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./Card"
import { Textarea } from "./Text-area"
import { Timeline } from "./Timeline"
/**
 * Display my studies.
 */
export function Studies() {
  const translate = useTranslations("Studies")
  const events = [{ title: "test", date: "01.01.2024", content: "test" }]
  return (
    <section className="mt-8 flex flex-col items-center space-y-6 lg:mb-8 lg:space-y-8">
      <h2 className="pink-fade text-3xl">{translate("header")}</h2>
      <div>
        <Timeline events={...events}></Timeline>
      </div>
    </section>
  )
}
