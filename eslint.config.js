/* eslint-disable @typescript-eslint/no-require-imports */
const nextConfig = require("eslint-config-next")
const prettierConfig = require("eslint-config-prettier/flat")
const tseslint = require("typescript-eslint")
const fs = require("fs")
const path = require("path")

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

module.exports = [
  { plugins: { "@typescript-eslint": tseslint.plugin } },
  ...nextConfig.map(withoutTypescriptEslintPlugin),
  ...tseslint.configs.recommended.map(withoutTypescriptEslintPlugin),
  prettierConfig,
  {
    settings: {
      "import/resolver": {
        typescript: {},
      },
    },
    rules: {
      "testing-library/prefer-screen-queries": "off",
      "@next/next/no-html-link-for-pages": "off",
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
