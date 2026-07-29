import { Client } from "@neondatabase/serverless"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const connectionString = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL
if (!connectionString) {
  console.error("Missing DATABASE_URL_UNPOOLED (or DATABASE_URL) env var.")
  process.exit(1)
}

const schemaPath = join(dirname(fileURLToPath(import.meta.url)), "schema.sql")
const schema = readFileSync(schemaPath, "utf8")

const statements = schema
  .split(";")
  .map((statement) => statement.trim())
  .filter((statement) => statement.length > 0)

const client = new Client(connectionString)
await client.connect()

try {
  for (const statement of statements) {
    await client.query(statement)
  }
  console.log(`Applied ${statements.length} statement(s) from db/tonight/schema.sql`)
} finally {
  await client.end()
}
