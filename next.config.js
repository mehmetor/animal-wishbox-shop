const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

const createNextIntlPlugin = require("next-intl/plugin")

const withNextIntl = createNextIntlPlugin()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: false,
  staticPageGenerationTimeout: 300,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "vwtwktgmqoqlwspzteqb.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "mscrosugxoblkqhymkux.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.experiments = { ...config.experiments, topLevelAwait: true }
    }
    return config
  },
  experimental: {
    turbo: {
      resolveAlias: {
        // Turbopack için özel ayarlar
      },
    },
  },
}

module.exports = withNextIntl(nextConfig)
