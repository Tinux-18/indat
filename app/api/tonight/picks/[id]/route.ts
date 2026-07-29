import { NextRequest, NextResponse } from "next/server"
import { deletePick } from "lib/tonight/db"

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await deletePick(Number(id))
  return NextResponse.json({ ok: true })
}
