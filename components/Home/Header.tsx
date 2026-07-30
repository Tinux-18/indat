"use client"
import Image from "next/image"
import React from "react"
import { TbMailDown } from "react-icons/tb"

import LocaleSwitcher from "components/Locale/LocaleSwitcher"
import { ThemeToggle } from "components/ThemeToggle/ThemeToggle"

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
      <div className="flex h-[70px] items-center justify-between pr-4 pl-1">
        <Image
          src="/media/logos/full-color.png"
          alt="Logo"
          width={100}
          height={70}
          className="h-auto w-[70px] shrink-0 pt-3 md:w-25"
        />
        <div className="flex items-center gap-2 md:gap-4">
          <LocaleSwitcher />
          <ThemeToggle />
          <button onClick={scrollToBottom}>
            <TbMailDown className="size-8" />
          </button>
        </div>
      </div>
    </header>
  )
}
