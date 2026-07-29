import { neon, NeonQueryFunction } from "@neondatabase/serverless"
import { env } from "env.mjs"
import type { StockPhoto } from "lib/tonight/pexels"
import type { Activity, Pick, StatsBucket, StatsPeriod, StatsResponse } from "models/tonight"

let cachedSql: NeonQueryFunction<false, false> | undefined

// Lazily constructed so a missing DATABASE_URL only breaks the Tonight
// routes at request time, not the whole site's build/dev startup.
function getSql(): NeonQueryFunction<false, false> {
  if (!cachedSql) {
    if (!env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not configured")
    }
    cachedSql = neon(env.DATABASE_URL)
  }
  return cachedSql
}

type Row = Record<string, unknown>

function toActivity(row: Row): Activity {
  return {
    id: row.id as number,
    name: row.name as string,
    isArchived: row.is_archived as boolean,
    createdAt: row.created_at as string,
    imageUrl: (row.image_url as string | null) ?? null,
  }
}

function toPick(row: Row): Pick {
  return {
    id: row.id as number,
    activityId: row.activity_id as number,
    activityName: row.activity_name as string,
    pickedAt: row.picked_at as string,
  }
}

export async function getActiveActivities(): Promise<Activity[]> {
  const rows = (await getSql()`
    SELECT id, name, is_archived, created_at, image_url
    FROM tonight_activities
    WHERE is_archived = FALSE
    ORDER BY created_at ASC
  `) as Row[]
  return rows.map(toActivity)
}

export async function createActivity(name: string): Promise<Activity> {
  const rows = (await getSql()`
    INSERT INTO tonight_activities (name)
    VALUES (${name})
    RETURNING id, name, is_archived, created_at, image_url
  `) as Row[]
  return toActivity(rows[0]!)
}

export async function renameActivity(id: number, name: string): Promise<Activity> {
  const rows = (await getSql()`
    UPDATE tonight_activities
    SET name = ${name}
    WHERE id = ${id}
    RETURNING id, name, is_archived, created_at, image_url
  `) as Row[]
  return toActivity(rows[0]!)
}

export async function archiveActivity(id: number): Promise<void> {
  await getSql()`
    UPDATE tonight_activities
    SET is_archived = TRUE
    WHERE id = ${id}
  `
}

export async function updateActivityImage(id: number, image: StockPhoto | null): Promise<Activity> {
  const rows = (await getSql()`
    UPDATE tonight_activities
    SET image_url = ${image?.url ?? null}
    WHERE id = ${id}
    RETURNING id, name, is_archived, created_at, image_url
  `) as Row[]
  return toActivity(rows[0]!)
}

// Local-day boundaries (matches the JS-side "isToday"/week logic used elsewhere
// in the Tonight app) so at most one pick row exists per calendar day.
function getTodayRange(): { start: Date; end: Date } {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1)
  return { start, end }
}

export async function recordPick(activityId: number): Promise<Pick> {
  const { start, end } = getTodayRange()
  const rows = (await getSql()`
    WITH existing AS (
      SELECT id FROM tonight_picks
      WHERE picked_at >= ${start.toISOString()} AND picked_at < ${end.toISOString()}
      LIMIT 1
    ),
    updated AS (
      UPDATE tonight_picks
      SET activity_id = ${activityId}, picked_at = now()
      WHERE id = (SELECT id FROM existing)
      RETURNING id, activity_id, picked_at
    ),
    inserted AS (
      INSERT INTO tonight_picks (activity_id)
      SELECT ${activityId}
      WHERE NOT EXISTS (SELECT id FROM existing)
      RETURNING id, activity_id, picked_at
    ),
    result AS (
      SELECT * FROM updated
      UNION ALL
      SELECT * FROM inserted
    )
    SELECT result.id, result.activity_id, result.picked_at, tonight_activities.name AS activity_name
    FROM result
    JOIN tonight_activities ON tonight_activities.id = result.activity_id
  `) as Row[]
  return toPick(rows[0]!)
}

export async function deletePick(id: number): Promise<void> {
  await getSql()`DELETE FROM tonight_picks WHERE id = ${id}`
}

export async function getPicksInRange(start: Date, end: Date): Promise<Pick[]> {
  const rows = (await getSql()`
    SELECT tonight_picks.id, tonight_picks.activity_id, tonight_picks.picked_at, tonight_activities.name AS activity_name
    FROM tonight_picks
    JOIN tonight_activities ON tonight_activities.id = tonight_picks.activity_id
    WHERE tonight_picks.picked_at >= ${start.toISOString()} AND tonight_picks.picked_at < ${end.toISOString()}
    ORDER BY tonight_picks.picked_at DESC
  `) as Row[]
  return rows.map(toPick)
}

// Monday-start week; month/year use calendar boundaries. `offset` steps back
// that many periods from the current one (0 = current period).
export function getPeriodRange(period: StatsPeriod, offset: number): { start: Date; end: Date } {
  const now = new Date()
  if (period === "week") {
    const dayIndex = now.getDay() // 0 = Sunday
    const diffToMonday = (dayIndex + 6) % 7
    const currentMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - diffToMonday)
    const start = new Date(currentMonday.getFullYear(), currentMonday.getMonth(), currentMonday.getDate() - offset * 7)
    const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7)
    return { start, end }
  }
  if (period === "month") {
    const start = new Date(now.getFullYear(), now.getMonth() - offset, 1)
    const end = new Date(now.getFullYear(), now.getMonth() - offset + 1, 1)
    return { start, end }
  }
  const start = new Date(now.getFullYear() - offset, 0, 1)
  const end = new Date(now.getFullYear() - offset + 1, 0, 1)
  return { start, end }
}

export async function getStats(period: StatsPeriod, offset: number): Promise<StatsResponse> {
  const { start, end } = getPeriodRange(period, offset)
  const rows = (await getSql()`
    SELECT tonight_activities.id AS activity_id, tonight_activities.name AS activity_name, COUNT(tonight_picks.id)::int AS count
    FROM tonight_activities
    LEFT JOIN tonight_picks
      ON tonight_picks.activity_id = tonight_activities.id
      AND tonight_picks.picked_at >= ${start.toISOString()}
      AND tonight_picks.picked_at < ${end.toISOString()}
    WHERE tonight_activities.is_archived = FALSE OR tonight_picks.id IS NOT NULL
    GROUP BY tonight_activities.id, tonight_activities.name
    ORDER BY count DESC, tonight_activities.name ASC
  `) as Row[]

  const breakdown: StatsBucket[] = rows.map((row) => ({
    activityId: row.activity_id as number,
    activityName: row.activity_name as string,
    count: row.count as number,
  }))
  const total = breakdown.reduce((sum, bucket) => sum + bucket.count, 0)

  return {
    period,
    rangeStart: start.toISOString(),
    rangeEnd: end.toISOString(),
    total,
    breakdown,
  }
}
