import nextJest from "next/jest.js"

const createJestConfig = nextJest({
  dir: "./",
})

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testPathIgnorePatterns: ["<rootDir>/e2e"],
  // tsconfig.json sets baseUrl "." for root-relative imports (e.g. "lib/foo");
  // mirror that here so Jest's resolver matches TypeScript's.
  modulePaths: ["<rootDir>"],
}

export default createJestConfig(customJestConfig)
