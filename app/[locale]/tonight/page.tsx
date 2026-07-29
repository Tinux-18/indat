import { ActivityManager } from "components/Tonight/ActivityManager"
import { ActivityPicker } from "components/Tonight/ActivityPicker"
import { WeekHistory } from "components/Tonight/WeekHistory"
import { Link } from "i18n/routing"
import { getActiveActivities, getPeriodRange, getPicksInRange } from "lib/tonight/db"

export const dynamic = "force-dynamic"

function isToday(isoDate: string) {
  const date = new Date(isoDate)
  const now = new Date()
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()
}

export default async function TonightPage() {
  const { start, end } = getPeriodRange("week", 0)
  const [activities, picks] = await Promise.all([getActiveActivities(), getPicksInRange(start, end)])
  const todayPick = picks.find((pick) => isToday(pick.pickedAt)) ?? null

  return (
    <main className="flex flex-col gap-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tonight</h1>
        <Link href="/tonight/stats" className="text-sm font-medium text-blue-600 dark:text-blue-400">
          Stats
        </Link>
      </div>
      <ActivityPicker activities={activities} todayPick={todayPick} />
      <WeekHistory picks={picks} />
      <details className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
        <summary className="cursor-pointer text-sm font-medium">Edit list</summary>
        <div className="mt-3">
          <ActivityManager activities={activities} />
        </div>
      </details>
    </main>
  )
}
