/** @type {import('next').NextConfig} */
const paths = require("path");
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
    if (!path) return config;
    const absolutePath = process.env.DATABASE_URL.startsWith("file:/");

    //absolute path won't work with the current method, while as Prisma picks up at the absolute folder from system root, webpack does it in build folder
    if (absolutePath) return config;

    //if client, the output path is the root .next folder - this is what we need.
    if (!isServer && !dev) {
      const root = require("path").resolve(__dirname, "./");
      const outputPath = config.output.path;
      const from = `${root}/prisma/${path}`;
      const to = `${outputPath}/../prisma/[name][ext]`;

      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: from,
              to: to,
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
