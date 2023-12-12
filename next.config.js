/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    reactRoot: true,
    supressHydrationWarning: true,
  },
};

module.exports = nextConfig;
