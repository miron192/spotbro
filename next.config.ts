import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.watchOptions = {
        ignored: [
          "**/Cookies/**",
          "**/Application Data/**",
          "**/Local Settings/**",
          "**/AppData/**",
          "**/node_modules/**",
        ],
      };
    }
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};
export default nextConfig;
