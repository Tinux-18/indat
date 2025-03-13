"use client"
import { useTranslations } from "next-intl"
import React from "react"
import { TimelineItem } from "models/timeline"
import { Timeline } from "../Timeline/Timeline"

/**
 * Display my work experience.
 */
export function Background() {
  const translate = useTranslations("Background")
  const events = translate.raw("items") as TimelineItem[]
  return (
    <section className="my-8 flex w-full flex-col items-center">
      <h2 className="pink-fade mb-5 text-3xl">{translate("header")}</h2>
      <Timeline events={events}></Timeline>
    </section>
  )
}
