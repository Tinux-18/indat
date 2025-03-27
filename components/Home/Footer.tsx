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
    <footer className="mx-auto my-5">
      <div className="flex flex-col items-center md:flex-row">
        {/* Left Column */}
        <div className="w-full p-4 md:w-1/3">{/* Content for left column */}</div>
        {/* Middle Column*/}
        <div className="w-full p-4 text-center md:w-1/3">
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
        </div>
        {/* Right Column */}
        <div className="w-full p-4 text-sm md:ml-auto md:w-1/3 md:self-end">
          <p className="text-right">
            <span className="font-bold">{translate("acknowledgements.title")}</span>
            <br />
            {translate("acknowledgements.photography")}{" "}
            <Link
              href="https://www.oanapopa.de"
              className="text-blue-500 underline transition-colors hover:text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Oana Popa-Costea
            </Link>
            ,
            <br />
            {translate("acknowledgements.logo")}{" "}
            <Link
              href="https://juliettepatissier.com/"
              className="text-blue-500 underline transition-colors hover:text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Juliette Patissier
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
