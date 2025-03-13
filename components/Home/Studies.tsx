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
    <section className="my-8 flex w-full flex-col items-center">
      <h2 className="pink-fade mb-5 text-3xl">{translate("header")}</h2>
      <Timeline events={events}></Timeline>
    </section>
  )
}
