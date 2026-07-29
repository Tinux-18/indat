import { NextRequest, NextResponse } from "next/server"
import { getPeriodRange, getPicksInRange, recordPick } from "lib/tonight/db"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const range = searchParams.get("range") ?? "week"
  if (range !== "week") {
    return NextResponse.json({ error: "Unsupported range" }, { status: 400 })
  }

  const { start, end } = getPeriodRange("week", 0)
  const picks = await getPicksInRange(start, end)
  return NextResponse.json({ picks })
}

export async function POST(request: NextRequest) {
  const { activityId } = (await request.json()) as { activityId?: number }
  if (!activityId) {
    return NextResponse.json({ error: "activityId is required" }, { status: 400 })
  }

  const pick = await recordPick(activityId)
  return NextResponse.json({ pick }, { status: 201 })
}
