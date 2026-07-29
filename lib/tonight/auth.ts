export const TONIGHT_AUTH_COOKIE = "tonight_auth"

export async function hashPasscode(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}

export async function isValidAuthCookie(cookieValue: string | undefined): Promise<boolean> {
  const expected = process.env.TONIGHT_PASSCODE
  if (!cookieValue || !expected) return false
  return cookieValue === (await hashPasscode(expected))
}
