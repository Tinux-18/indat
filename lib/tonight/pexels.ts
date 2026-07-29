import { env } from "env.mjs"

export interface StockPhoto {
  url: string
}

interface PexelsPhoto {
  src: { portrait: string }
}

interface PexelsSearchResponse {
  photos: PexelsPhoto[]
}

export async function fetchStockPhoto(query: string, options?: { excludeUrl?: string | null }): Promise<StockPhoto | null> {
  if (!env.PEXELS_API_KEY) return null

  const url = new URL("https://api.pexels.com/v1/search")
  url.searchParams.set("query", query)
  url.searchParams.set("per_page", "10")
  url.searchParams.set("orientation", "portrait")

  const response = await fetch(url, {
    headers: { Authorization: env.PEXELS_API_KEY },
  })
  if (!response.ok) return null

  const data = (await response.json()) as PexelsSearchResponse
  if (data.photos.length === 0) return null

  const candidates = options?.excludeUrl
    ? data.photos.filter((photo) => photo.src.portrait !== options.excludeUrl)
    : data.photos
  const pool = candidates.length > 0 ? candidates : data.photos
  const photo = pool[Math.floor(Math.random() * pool.length)]!

  return { url: photo.src.portrait }
}
