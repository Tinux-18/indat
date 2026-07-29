"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function PasscodeForm({ next }: { next: string }) {
  const router = useRouter()
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError(null)
    const response = await fetch("/api/tonight/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passcode }),
    })
    setBusy(false)
    if (!response.ok) {
      setError("Wrong passcode.")
      return
    }
    router.push(next)
    router.refresh()
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <input
        type="password"
        value={passcode}
        onChange={(event) => setPasscode(event.target.value)}
        placeholder="Passcode"
        autoFocus
        className="rounded-lg border border-gray-300 px-3 py-2 text-center text-lg dark:border-gray-600 dark:bg-gray-800"
      />
      <button
        type="submit"
        disabled={busy || !passcode}
        className="rounded-lg bg-blue-600 px-3 py-2 font-medium text-white disabled:opacity-50"
      >
        Enter
      </button>
      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}
    </form>
  )
}
