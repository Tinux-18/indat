"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import type { Activity } from "models/tonight"

export function ActivityManager({ activities }: { activities: Activity[] }) {
  const router = useRouter()
  const [newName, setNewName] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState("")
  const [busy, setBusy] = useState(false)

  async function addActivity(event: React.FormEvent) {
    event.preventDefault()
    if (!newName.trim()) return
    setBusy(true)
    await fetch("/api/tonight/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim() }),
    })
    setNewName("")
    setBusy(false)
    router.refresh()
  }

  async function saveRename(id: number) {
    if (!editingName.trim()) return
    setBusy(true)
    await fetch(`/api/tonight/activities/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editingName.trim() }),
    })
    setEditingId(null)
    setBusy(false)
    router.refresh()
  }

  async function removeActivity(id: number) {
    setBusy(true)
    await fetch(`/api/tonight/activities/${id}`, { method: "DELETE" })
    setBusy(false)
    router.refresh()
  }

  async function refreshImage(id: number) {
    setBusy(true)
    await fetch(`/api/tonight/activities/${id}/image`, { method: "POST" })
    setBusy(false)
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-3">
        {activities.map((activity) => (
          <li key={activity.id} className="flex flex-col gap-1 border-b border-gray-200 pb-2 last:border-0 dark:border-gray-700">
            {editingId === activity.id ? (
              <div className="flex min-w-0 items-center gap-2">
                <input
                  value={editingName}
                  onChange={(event) => setEditingName(event.target.value)}
                  className="min-w-0 flex-1 rounded-lg border border-gray-300 px-2 py-1 dark:border-gray-600 dark:bg-gray-800"
                />
                <button
                  onClick={() => saveRename(activity.id)}
                  disabled={busy}
                  className="shrink-0 text-sm font-medium text-blue-600 dark:text-blue-400"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="shrink-0 text-sm text-gray-500 dark:text-gray-400"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span className="truncate font-medium">{activity.name}</span>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <button
                    onClick={() => refreshImage(activity.id)}
                    disabled={busy}
                    className="text-sm font-medium text-blue-600 dark:text-blue-400"
                  >
                    New photo
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(activity.id)
                      setEditingName(activity.name)
                    }}
                    className="text-sm font-medium text-blue-600 dark:text-blue-400"
                  >
                    Rename
                  </button>
                  <button
                    onClick={() => removeActivity(activity.id)}
                    disabled={busy}
                    className="text-sm font-medium text-red-600 dark:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={addActivity} className="flex min-w-0 gap-2">
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          placeholder="Add an activity..."
          className="min-w-0 flex-1 rounded-lg border border-gray-300 px-2 py-1 dark:border-gray-600 dark:bg-gray-800"
        />
        <button
          type="submit"
          disabled={busy}
          className="rounded-lg bg-blue-600 px-3 py-1 font-medium text-white disabled:opacity-50"
        >
          Add
        </button>
      </form>
    </div>
  )
}
