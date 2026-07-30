import withBundleAnalyzer from "@next/bundle-analyzer"
import withPlugins from "next-compose-plugins"
import createNextIntlPlugin from "next-intl/plugin"
import { env } from "./env.mjs"

const withNextIntl = createNextIntlPlugin()

/**
 * @type {import('next').NextConfig}
 */
const baseConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  },
  rewrites() {
    return [
      { source: "/healthz", destination: "/api/health" },
      { source: "/api/healthz", destination: "/api/health" },
      { source: "/health", destination: "/api/health" },
      { source: "/ping", destination: "/api/health" },
    ]
  },
}

// withNextIntl must wrap the plain config object before withPlugins does —
// next-compose-plugins returns a config-as-function, and next-intl's plugin
// merges via Object.assign(nextConfig), which silently drops everything when
// nextConfig is a function (functions have no enumerable own properties).
export default withPlugins([[withBundleAnalyzer({ enabled: env.ANALYZE })]], withNextIntl(baseConfig))
