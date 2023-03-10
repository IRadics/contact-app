/** @type {import('next').NextConfig} */

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const nextConfig = {
  reactStrictMode: true,

  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    if (!process.env.DATABASE_URL) return;

    //copy over DB file for production build if it has been provided as env. variable
    const path = process.env.DATABASE_URL.replace(/file:\.?(.*)/, "$1");
    if (!path) return;
    const absolutePath = process.env.DATABASE_URL.startsWith("file:/");

    //absolute path won't work with the current method, while as Prisma picks up at the absolute folder from system root, webpack does it in build folder
    if (absolutePath) return;

    if (isServer && !dev) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: `./prisma/${path}`,
              to: "../../prisma/[name][ext]",
            },
          ],
        })
      );
    }
    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
