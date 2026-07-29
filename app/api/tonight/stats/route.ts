import { NextRequest, NextResponse } from "next/server"
import { getStats } from "lib/tonight/db"
import type { StatsPeriod } from "models/tonight"

const VALID_PERIODS: StatsPeriod[] = ["week", "month", "year"]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const periodParam = searchParams.get("period") ?? "week"
  const offsetParam = searchParams.get("offset") ?? "0"

  if (!VALID_PERIODS.includes(periodParam as StatsPeriod)) {
    return NextResponse.json({ error: "Invalid period" }, { status: 400 })
  }

  const offset = Number(offsetParam)
  if (!Number.isInteger(offset) || offset < 0) {
    return NextResponse.json({ error: "Invalid offset" }, { status: 400 })
  }

  const stats = await getStats(periodParam as StatsPeriod, offset)
  return NextResponse.json(stats)
}
