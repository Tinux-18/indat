import { NextResponse } from "next/server"
import { getActiveActivities, updateActivityImage } from "lib/tonight/db"
import { fetchStockPhoto } from "lib/tonight/pexels"

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const activities = await getActiveActivities()
  const activity = activities.find((item) => item.id === Number(id))
  if (!activity) {
    return NextResponse.json({ error: "Activity not found" }, { status: 404 })
  }

  const photo = await fetchStockPhoto(activity.name, { excludeUrl: activity.imageUrl })
  const updated = await updateActivityImage(activity.id, photo)
  return NextResponse.json({ activity: updated })
}
