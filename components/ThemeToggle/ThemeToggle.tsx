"use client"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"
import { BsMoon, BsSun } from "react-icons/bs"

const subscribeNever = () => () => {}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  // Avoids the next-themes hydration-mismatch flicker without a useEffect+setState
  // render pass: useSyncExternalStore returns the server snapshot (false) during SSR
  // and the initial client render, then the client snapshot (true) once hydrated.
  const mounted = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  )

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
