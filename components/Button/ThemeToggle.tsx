"use client"
import { useTheme } from "next-themes"
import { BsMoon, BsSun } from "react-icons/bs"

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {theme === "dark" ? <BsSun className="size-5" /> : <BsMoon className="size-5" />}
    </button>
  )
}
