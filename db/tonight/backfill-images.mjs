import { neon } from "@neondatabase/serverless"

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error("Missing DATABASE_URL env var.")
  process.exit(1)
}

const apiKey = process.env.PEXELS_API_KEY
if (!apiKey) {
  console.error("Missing PEXELS_API_KEY env var.")
  process.exit(1)
}

const sql = neon(connectionString)

const rows = await sql`
  SELECT id, name FROM tonight_activities WHERE image_url IS NULL AND is_archived = FALSE
`

for (const row of rows) {
  const url = new URL("https://api.pexels.com/v1/search")
  url.searchParams.set("query", row.name)
  url.searchParams.set("per_page", "1")
  url.searchParams.set("orientation", "portrait")

  const response = await fetch(url, { headers: { Authorization: apiKey } })
  if (!response.ok) {
    console.warn(`Pexels lookup failed for "${row.name}": ${response.status}`)
    continue
  }

  const data = await response.json()
  const photo = data.photos[0]
  if (!photo) {
    console.warn(`No photo found for "${row.name}"`)
    continue
  }

  await sql`
    UPDATE tonight_activities
    SET image_url = ${photo.src.portrait}
    WHERE id = ${row.id}
  `
  console.log(`Set image for "${row.name}"`)
}
