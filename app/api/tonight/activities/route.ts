import { NextRequest, NextResponse } from "next/server"
import { createActivity, getActiveActivities, updateActivityImage } from "lib/tonight/db"
import { fetchStockPhoto, type StockPhoto } from "lib/tonight/pexels"

export async function GET() {
  const activities = await getActiveActivities()
  return NextResponse.json({ activities })
}

export async function POST(request: NextRequest) {
  const { name, image } = (await request.json()) as { name?: string; image?: StockPhoto | null }
  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  }

  const activity = await createActivity(name.trim())

  // A caller (e.g. the AI suggestion flow) may already have a matching photo —
  // reuse it instead of re-rolling a different one from Pexels.
  if (image) {
    return NextResponse.json({ activity: await updateActivityImage(activity.id, image) }, { status: 201 })
  }

  try {
    const photo = await fetchStockPhoto(activity.name)
    if (photo) {
      return NextResponse.json({ activity: await updateActivityImage(activity.id, photo) }, { status: 201 })
    }
  } catch {
    // Activity is already created; a missing image just falls back to a placeholder in the UI.
  }

  return NextResponse.json({ activity }, { status: 201 })
}
