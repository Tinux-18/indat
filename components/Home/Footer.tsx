"use client"
import Link from "next/link"
import { useTranslations } from "next-intl"
import React from "react"
import { CiMail } from "react-icons/ci"
import { FaLinkedinIn } from "react-icons/fa"
import { FaXing } from "react-icons/fa"
import { LuCalendarPlus2 } from "react-icons/lu"

/**
 * Display contact information and website footer.
 */
export function Footer() {
  const translate = useTranslations("Footer")
  return (
    <section className="mx-auto grid max-w-screen-xl text-center">
      {/* TODO: hyperlink h2 as well to calendar. */}
      <h2 className="text-5xl ">{translate("title")}</h2>
      <div className="mt-4 flex justify-center space-x-4">
        <Link href="https://calendar.app.google/ousBZpi9mFogSm5b7" target="_blank" rel="noopener noreferrer">
          <LuCalendarPlus2 className="size-8" />
        </Link>
        <Link href="https://www.linkedin.com/company/indat-mcv" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn className="size-8" />
        </Link>
        <Link href="https://www.xing.com/profile/Constantin_Rigu" target="_blank" rel="noopener noreferrer">
          <FaXing className="size-8" />
        </Link>
        <Link href="mailto:constantin@indat.tech">
          <CiMail className="size-8" />
        </Link>
      </div>
    </section>
  )
}
