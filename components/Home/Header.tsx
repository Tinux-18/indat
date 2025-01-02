"use client"
import Image from "next/image"
import React from "react"
import { RiMailDownloadLine } from "react-icons/ri"
import LocaleSwitcher from "components/Locale/LocaleSwitcher"

export function Header() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    })
  }

  return (
    <section className="font-poppins text-center">
      <div className="flex h-[70px] items-center justify-between pl-1 pr-4">
        <Image src="/logo.png" alt="Logo" width={100} height={70} />
        <LocaleSwitcher />
        <button onClick={scrollToBottom}>
          <RiMailDownloadLine className="size-8" />
        </button>
      </div>
      <h1
        className="
       text-6xl font-bold tracking-widest"
      >
        InDat
      </h1>
      <h2 className="t bg-gradient-to-r from-[#9538ff] to-[#d405ff] bg-clip-text text-3xl text-transparent">
        Innovation through Data
      </h2>
    </section>
  )
}
