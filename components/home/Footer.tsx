"use client"
import Link from "next/link"
import React from "react"
import { CiMail } from "react-icons/ci"
import { FaLinkedinIn } from "react-icons/fa"
import { FaXing } from "react-icons/fa"
import { LuCalendarPlus2 } from "react-icons/lu"

export function Footer() {
  return (
    <section className="mx-auto grid max-w-screen-xl text-center">
      <h2 className="text-5xl ">Let&apos;s talk!</h2>
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
