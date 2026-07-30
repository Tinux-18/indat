import nextConfig from "eslint-config-next"
import prettierConfig from "eslint-config-prettier/flat"
import tailwindcssPlugin from "eslint-plugin-tailwindcss"
import tseslint from "typescript-eslint"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const tailwindcssConfig = tailwindcssPlugin.configs.recommended
const __dirname = path.dirname(fileURLToPath(import.meta.url))

function getDirectoriesToSort() {
  const ignoredSortingDirectories = [".git", ".next", ".vscode", "node_modules"]
  return fs
    .readdirSync(__dirname)
    .filter(
      (entry) => !ignoredSortingDirectories.includes(entry) && fs.statSync(path.join(__dirname, entry)).isDirectory(),
    )
}

// eslint-config-next's "next/typescript" preset and tseslint.configs.recommended each
// bring their own (different-instance) registration of the @typescript-eslint plugin,
// which ESLint now rejects as a duplicate for files where both apply. Register the plugin
// exactly once, globally, and strip it out of every other source that would redefine it.
function withoutTypescriptEslintPlugin(config) {
  if (!config.plugins?.["@typescript-eslint"]) return config
  const plugins = { ...config.plugins }
  delete plugins["@typescript-eslint"]
  return { ...config, plugins }
}

const config = [
  { plugins: { "@typescript-eslint": tseslint.plugin } },
  ...nextConfig.map(withoutTypescriptEslintPlugin),
  ...tseslint.configs.recommended.map(withoutTypescriptEslintPlugin),
  {
    ...tailwindcssConfig,
    rules: {
      ...tailwindcssConfig.rules,
      "tailwindcss/no-custom-classname": ["error", { whitelist: ["pink-fade"] }],
      "tailwindcss/classnames-order": "error",
    },
  },
  prettierConfig,
  {
    settings: {
      "import/resolver": {
        typescript: {},
      },
      tailwindcss: {
        cssConfigPath: "styles/tailwind.css",
      },
    },
    rules: {
      "@next/next/no-html-link-for-pages": "error",
      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
      "import/order": [
        1,
        {
          groups: ["external", "builtin", "internal", "sibling", "parent", "index"],
          pathGroups: [
            ...getDirectoriesToSort().map((singleDir) => ({
              pattern: `${singleDir}/**`,
              group: "internal",
            })),
            {
              pattern: "env",
              group: "internal",
            },
            {
              pattern: "theme",
              group: "internal",
            },
            {
              pattern: "public/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["internal"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]

export default config
