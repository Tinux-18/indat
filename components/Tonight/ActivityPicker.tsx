"use client"
import { AnimatePresence, motion, type PanInfo } from "motion/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import type { Activity, Pick } from "models/tonight"

const SWIPE_THRESHOLD = 80

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0, scale: 0.9 }),
}

interface Suggestion {
  name: string
  imageUrl: string | null
}

type Card = { kind: "activity"; activity: Activity } | { kind: "suggestion" }

export function ActivityPicker({ activities, todayPick }: { activities: Activity[]; todayPick: Pick | null }) {
  const router = useRouter()
  const [[index, direction], setPage] = useState([0, 0])
  const [picking, setPicking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null)
  const [suggestionLoading, setSuggestionLoading] = useState(false)
  const [seenSuggestions, setSeenSuggestions] = useState<string[]>([])

  const cards: Card[] = [...activities.map((activity): Card => ({ kind: "activity", activity })), { kind: "suggestion" }]
  const count = cards.length
  const current = count > 0 ? cards[((index % count) + count) % count] : undefined
  const isPickedToday = current?.kind === "activity" && current.activity.id === todayPick?.activityId

  function paginate(step: 1 | -1) {
    setPage([index + step, step])
  }

  function handleDragEnd(_event: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) paginate(1)
    else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1)
  }

  async function fetchSuggestion() {
    if (suggestionLoading) return
    setSuggestionLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/tonight/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exclude: [...activities.map((activity) => activity.name), ...seenSuggestions] }),
      })
      if (!response.ok) throw new Error("Failed to get a suggestion")
      const data = (await response.json()) as { activity: string; imageUrl: string | null }
      setSuggestion({ name: data.activity, imageUrl: data.imageUrl })
      setSeenSuggestions((prev) => [...prev, data.activity])
    } catch {
      setError("Couldn't get a suggestion, try again.")
    } finally {
      setSuggestionLoading(false)
    }
  }

  async function pick(activityId: number) {
    setPicking(true)
    setError(null)
    try {
      const response = await fetch("/api/tonight/picks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activityId }),
      })
      if (!response.ok) throw new Error("Failed to record pick")
      router.refresh()
    } catch {
      setError("Couldn't save your pick, try again.")
    } finally {
      setPicking(false)
    }
  }

  async function pickSuggestion() {
    if (!suggestion) return
    setPicking(true)
    setError(null)
    try {
      const createResponse = await fetch("/api/tonight/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: suggestion.name,
          image: suggestion.imageUrl ? { url: suggestion.imageUrl } : null,
        }),
      })
      if (!createResponse.ok) throw new Error("Failed to add suggestion")
      const { activity } = (await createResponse.json()) as { activity: Activity }
      setPicking(false)
      await pick(activity.id)
    } catch {
      setError("Couldn't save your pick, try again.")
      setPicking(false)
    }
  }

  return (
    <section className="flex flex-col items-center gap-4">
      {current ? (
        <>
          <div className="relative h-72 w-60 overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current.kind === "activity" ? current.activity.id : "suggestion"}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 350, damping: 35 }}
                drag={count > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={handleDragEnd}
                className={`absolute inset-0 flex cursor-grab flex-col overflow-hidden rounded-2xl border-4 bg-gray-100 shadow-lg active:cursor-grabbing dark:bg-gray-800 ${
                  isPickedToday ? "border-green-500" : "border-transparent"
                }`}
              >
                <div className="relative h-52 w-full bg-gray-200 dark:bg-gray-700">
                  {current.kind === "suggestion" ? (
                    suggestion ? (
                      suggestion.imageUrl ? (
                        <Image
                          src={suggestion.imageUrl}
                          alt=""
                          fill
                          sizes="240px"
                          draggable={false}
                          priority
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-5xl">✨</div>
                      )
                    ) : (
                      <motion.button
                        onTap={fetchSuggestion}
                        disabled={suggestionLoading}
                        className="flex flex-col items-center justify-center gap-2 text-center disabled:opacity-60 size-full"
                      >
                        <span className="text-5xl">✨</span>
                        <span className="px-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                          {suggestionLoading ? "Thinking..." : "Tap for an idea"}
                        </span>
                      </motion.button>
                    )
                  ) : current.activity.imageUrl ? (
                    <Image
                      src={current.activity.imageUrl}
                      alt=""
                      fill
                      sizes="240px"
                      draggable={false}
                      priority
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl">🎲</div>
                  )}
                </div>
                <p className="flex flex-1 items-center justify-center p-3 text-center text-lg font-semibold">
                  {current.kind === "suggestion" ? (suggestion?.name ?? "Need an idea?") : current.activity.name}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {current.kind === "suggestion" && suggestion && (
            <button
              onClick={fetchSuggestion}
              disabled={suggestionLoading}
              className="-mt-2 text-xs font-medium text-blue-600 hover:underline disabled:opacity-60 dark:text-blue-400"
            >
              Try another idea
            </button>
          )}

          <div className="flex items-center gap-4">
            <button
              onClick={() => paginate(-1)}
              disabled={count < 2}
              className="rounded-full bg-gray-100 p-3 text-xl leading-none disabled:opacity-40 dark:bg-gray-800"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={() => (current.kind === "activity" ? pick(current.activity.id) : pickSuggestion())}
              disabled={picking || (current.kind === "suggestion" && !suggestion)}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition active:scale-0.98 disabled:opacity-50"
            >
              Pick this
            </button>
            <button
              onClick={() => paginate(1)}
              disabled={count < 2}
              className="rounded-full bg-gray-100 p-3 text-xl leading-none disabled:opacity-40 dark:bg-gray-800"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">No activities yet — add one below.</p>
      )}

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}
    </section>
  )
}
