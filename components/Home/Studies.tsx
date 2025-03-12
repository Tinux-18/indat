"use client"
import { useTranslations } from "next-intl"
import React from "react"
import { TimelineItem } from "models/timeline"
import { Timeline } from "../Timeline/Timeline"
/**
 * Display my studies.
 */
export function Studies() {
  const translate = useTranslations("Studies")
  const events = translate.raw("items") as TimelineItem[]
  return (
    <section className="mt-8 flex flex-col items-center space-y-6 lg:mb-8 lg:space-y-8">
      <h2 className="pink-fade text-3xl">{translate("header")}</h2>
      <Timeline events={events}></Timeline>
    </section>
  )
}
