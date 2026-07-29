import { NextRequest, NextResponse } from "next/server"
import { fetchStockPhoto } from "lib/tonight/pexels"
import { generateActivitySuggestion } from "lib/tonight/suggest"

export async function POST(request: NextRequest) {
  try {
    const { exclude } = (await request.json().catch(() => ({}))) as { exclude?: string[] }
    const activity = await generateActivitySuggestion(exclude ?? [])
    const photo = await fetchStockPhoto(activity).catch(() => null)
    return NextResponse.json({ activity, imageUrl: photo?.url ?? null })
  } catch {
    return NextResponse.json({ error: "Couldn't get a suggestion, try again." }, { status: 502 })
  }
}
