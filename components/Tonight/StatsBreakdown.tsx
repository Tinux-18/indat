import type { StatsResponse } from "models/tonight"

export function StatsBreakdown({ stats }: { stats: StatsResponse }) {
  const max = Math.max(1, ...stats.breakdown.map((bucket) => bucket.count))

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {stats.total} pick{stats.total === 1 ? "" : "s"} from {new Date(stats.rangeStart).toLocaleDateString()} to{" "}
        {new Date(stats.rangeEnd).toLocaleDateString()}
      </p>
      {stats.breakdown.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No picks in this period.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {stats.breakdown.map((bucket) => (
            <li key={bucket.activityId}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{bucket.activityName}</span>
                <span className="font-medium">{bucket.count}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="h-full rounded-full bg-blue-500" style={{ width: `${(bucket.count / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
