import Anthropic from "@anthropic-ai/sdk"
import { env } from "env.mjs"

let cachedClient: Anthropic | undefined

function getClient(): Anthropic {
  if (!cachedClient) {
    if (!env.CLAUDE_API_KEY) {
      throw new Error("CLAUDE_API_KEY is not configured")
    }
    cachedClient = new Anthropic({ apiKey: env.CLAUDE_API_KEY })
  }
  return cachedClient
}

const SUGGESTION_SCHEMA = {
  type: "object",
  properties: {
    activity: { type: "string" },
  },
  required: ["activity"],
  additionalProperties: false,
} as const

export async function generateActivitySuggestion(exclude: string[] = []): Promise<string> {
  const excludeInstruction =
    exclude.length > 0
      ? ` Do not repeat any of these ideas already suggested: ${exclude.join("; ")}. Pick a genuinely different one — vary the kind of activity (outdoor, food/drink, culture, playful, cozy) rather than a small variation on the same idea.`
      : ""

  const response = await getClient().messages.create({
    model: "claude-opus-5",
    max_tokens: 300,
    output_config: {
      effort: "low",
      format: { type: "json_schema", schema: SUGGESTION_SCHEMA },
    },
    messages: [
      {
        role: "user",
        content:
          "Suggest one specific, concrete evening activity for a couple to do together tonight, starting around 9pm and finishing by 11pm (max 2 hours), in or near Blankenfelde-Mahlow, Germany. " +
          "Their kids are asleep at home, so the activity must be no more than a 10-minute journey from home (walking or a very short drive) — nothing that takes them further away. " +
          "Reply with a short, concrete title (max ~6 words) naming a specific place, walk, game, or small outing — not a generic category like 'watch a film'." +
          excludeInstruction,
      },
    ],
  })

  const textBlock = response.content.find((block) => block.type === "text")
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No suggestion returned")
  }

  const parsed = JSON.parse(textBlock.text) as { activity: string }
  return parsed.activity
}
