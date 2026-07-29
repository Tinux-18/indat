/**
 * @jest-environment node
 */
import { hashPasscode, isValidAuthCookie } from "lib/tonight/auth"

describe("tonight auth", () => {
  const originalPasscode = process.env.TONIGHT_PASSCODE

  afterEach(() => {
    process.env.TONIGHT_PASSCODE = originalPasscode
  })

  it("hashes the same passcode identically", async () => {
    const hashA = await hashPasscode("open-sesame")
    const hashB = await hashPasscode("open-sesame")
    expect(hashA).toBe(hashB)
    expect(hashA).not.toBe("open-sesame")
  })

  it("hashes different passcodes differently", async () => {
    const hashA = await hashPasscode("open-sesame")
    const hashB = await hashPasscode("open-seasame")
    expect(hashA).not.toBe(hashB)
  })

  it("accepts a cookie matching the hashed env passcode", async () => {
    process.env.TONIGHT_PASSCODE = "correct-horse-battery-staple"
    const cookie = await hashPasscode("correct-horse-battery-staple")
    await expect(isValidAuthCookie(cookie)).resolves.toBe(true)
  })

  it("rejects a cookie that does not match", async () => {
    process.env.TONIGHT_PASSCODE = "correct-horse-battery-staple"
    await expect(isValidAuthCookie(await hashPasscode("wrong-guess"))).resolves.toBe(false)
  })

  it("rejects when no cookie or no passcode is configured", async () => {
    process.env.TONIGHT_PASSCODE = "correct-horse-battery-staple"
    await expect(isValidAuthCookie(undefined)).resolves.toBe(false)

    delete process.env.TONIGHT_PASSCODE
    await expect(isValidAuthCookie(await hashPasscode("anything"))).resolves.toBe(false)
  })
})
