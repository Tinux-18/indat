"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import type { StatsPeriod } from "models/tonight"

const PERIODS: StatsPeriod[] = ["week", "month", "year"]

export function PeriodToggle({ period }: { period: StatsPeriod }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function selectPeriod(next: StatsPeriod) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("period", next)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex gap-2">
      {PERIODS.map((candidate) => (
        <button
          key={candidate}
          onClick={() => selectPeriod(candidate)}
          className={`rounded-full px-4 py-1 text-sm font-medium capitalize ${
            candidate === period
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          {candidate}
        </button>
      ))}
    </div>
  )
}
