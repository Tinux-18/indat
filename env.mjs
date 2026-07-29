import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    TONIGHT_PASSCODE: z.string().min(4).optional(),
    DATABASE_URL: z.string().min(1).optional(),
    PEXELS_API_KEY: z.string().min(1).optional(),
    CLAUDE_API_KEY: z.string().min(1).optional(),
  },
  client: {},
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    TONIGHT_PASSCODE: process.env.TONIGHT_PASSCODE,
    DATABASE_URL: process.env.DATABASE_URL,
    PEXELS_API_KEY: process.env.PEXELS_API_KEY,
    CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
  },
})
