"use client"
import Image from "next/image"
import React from "react"
import { RiMailDownloadLine } from "react-icons/ri"
import LocaleSwitcher from "components/Locale/LocaleSwitcher"
import Link from "next/link"

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
    <section className="text-center">
      <div className="flex h-[70px] items-center justify-between pl-1 pr-4">
        {/* Navbar */}
        <Link href="/">
          {" "}
          <Image src="/logo.png" alt="Logo" width={100} height={70} />
        </Link>
        <LocaleSwitcher />
        <button onClick={scrollToBottom}>
          <RiMailDownloadLine className="size-12" />
        </button>
      </div>
      <h1 className="text-6xl font-bold tracking-widest">InDat</h1>
      <h2 className="pink-fade text-3xl">Innovation through Data</h2>
    </section>
  )
}
