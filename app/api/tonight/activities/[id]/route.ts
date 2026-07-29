import { NextRequest, NextResponse } from "next/server"
import { archiveActivity, renameActivity } from "lib/tonight/db"

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { name } = (await request.json()) as { name?: string }
  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  }

  const activity = await renameActivity(Number(id), name.trim())
  return NextResponse.json({ activity })
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await archiveActivity(Number(id))
  return NextResponse.json({ ok: true })
}
