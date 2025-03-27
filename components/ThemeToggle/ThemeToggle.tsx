"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { BsMoon, BsSun } from "react-icons/bs"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show the theme toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder with the same dimensions to avoid layout shift
    return (
      <button
        className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Loading theme toggle"
        disabled
      >
        <div className="size-8 animate-pulse rounded-full bg-gray-300" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? <BsSun className="size-8" /> : <BsMoon className="size-8" />}
    </button>
  )
}
