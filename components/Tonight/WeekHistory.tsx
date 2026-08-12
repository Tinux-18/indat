import type { Pick } from "models/tonight"

function formatDay(pickedAt: string) {
  return new Date(pickedAt).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })
}

export function WeekHistory({ picks }: { picks: Pick[] }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">This week</h2>
      {picks.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">Nothing picked yet this week.</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {picks.map((pick) => (
            <li
              key={pick.id}
              className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm dark:bg-gray-800"
            >
              <span className="text-gray-500 dark:text-gray-400">{formatDay(pick.pickedAt)}</span>
              <span className="font-medium">{pick.activityName}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
