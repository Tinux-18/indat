"use client"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { TbMailDown } from "react-icons/tb"

import LocaleSwitcher from "components/Locale/LocaleSwitcher"

/**
 * Display top navbar and website header.
 */
export function Header() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    })
  }

  return (
    <header className="text-center">
      <div className="flex h-[70px] items-center justify-between pl-1 pr-4">
        <Link href="/">
          {" "}
          <Image src="/media/logos/full-color.png" alt="Logo" width={100} height={70} />
        </Link>
        <LocaleSwitcher />
        <button onClick={scrollToBottom}>
          <TbMailDown className="size-10" />
        </button>
      </div>
    </header>
  )
}
