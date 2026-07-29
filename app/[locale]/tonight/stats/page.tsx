import { PeriodToggle } from "components/Tonight/PeriodToggle"
import { StatsBreakdown } from "components/Tonight/StatsBreakdown"
import { Link } from "i18n/routing"
import { getStats } from "lib/tonight/db"
import type { StatsPeriod } from "models/tonight"

export const dynamic = "force-dynamic"

const VALID_PERIODS: StatsPeriod[] = ["week", "month", "year"]

export default async function TonightStatsPage({ searchParams }: { searchParams: Promise<{ period?: string }> }) {
  const { period: periodParam } = await searchParams
  const period: StatsPeriod = VALID_PERIODS.includes(periodParam as StatsPeriod) ? (periodParam as StatsPeriod) : "week"
  const stats = await getStats(period, 0)

  return (
    <main className="flex flex-col gap-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Stats</h1>
        <Link href="/tonight" className="text-sm font-medium text-blue-600 dark:text-blue-400">
          Tonight
        </Link>
      </div>
      <PeriodToggle period={period} />
      <StatsBreakdown stats={stats} />
    </main>
  )
}
