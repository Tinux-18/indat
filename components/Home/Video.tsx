"use client"
import React from "react"

/**
 * Display embedded intro video, explaining who I am and what I can do.
 */
export function Video() {
  return (
    <section className="mt-8 flex flex-col items-center space-y-6 font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:space-y-8 lg:text-xl">
      <p className="max-w-2xl">Hi! I&apos;m Constantin.</p>
      <p className="max-w-2xl ">
        InDat got off the ground because I want to build technical solutions in a diverse range of industries.
      </p>
      <p className="max-w-2xl ">
        I am a full-stack software developer with a backend focus, and I&apos;m really looking forward to hearing what
        problem you want to solve.
      </p>
    </section>
  )
}
