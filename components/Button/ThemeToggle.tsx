"use client"
import { useTheme } from "next-themes"
import { BsSun, BsMoon } from "react-icons/bs"

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {theme === "dark" ? <BsSun className="h-5 w-5" /> : <BsMoon className="h-5 w-5" />}
    </button>
  )
}
