import { NextRequest, NextResponse } from "next/server"
import { hashPasscode, TONIGHT_AUTH_COOKIE } from "lib/tonight/auth"

export async function POST(request: NextRequest) {
  const { passcode } = (await request.json()) as { passcode?: string }
  const expected = process.env.TONIGHT_PASSCODE

  if (!expected || !passcode || passcode !== expected) {
    return NextResponse.json({ error: "Invalid passcode" }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(TONIGHT_AUTH_COOKIE, await hashPasscode(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 180,
    path: "/",
  })
  return response
}
