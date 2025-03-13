"use client"
import Link from "next/link"
import { useTranslations } from "next-intl"
import React from "react"
import { FaLinkedinIn } from "react-icons/fa"
import { FaXing } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa6"
import { LuCalendarPlus2 } from "react-icons/lu"
import { MdMailOutline } from "react-icons/md"

/**
 * Display contact information and website footer.
 */
export function Footer() {
  const translate = useTranslations("Footer")
  return (
    <footer className="mx-auto my-5 grid max-w-screen-xl text-center">
      <Link href="https://calendar.app.google/ousBZpi9mFogSm5b7" target="_blank" rel="noopener noreferrer">
        <h2 className="text-4xl">{translate("title")}</h2>
      </Link>
      <div className="mt-4 flex justify-center space-x-4 [&>a>svg]:size-8">
        <Link href="https://calendar.app.google/ousBZpi9mFogSm5b7" target="_blank" rel="noopener noreferrer">
          <LuCalendarPlus2 />
        </Link>
        <Link href="https://www.linkedin.com/company/indat-mcv" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn />
        </Link>
        <Link href="https://www.xing.com/profile/Constantin_Rigu" target="_blank" rel="noopener noreferrer">
          <FaXing />
        </Link>
        <Link href="mailto:constantin@indat.tech">
          <MdMailOutline />
        </Link>
        <Link href="https://www.instagram.com/indat.tech/">
          <FaInstagram />
        </Link>
      </div>
    </footer>
  )
}
