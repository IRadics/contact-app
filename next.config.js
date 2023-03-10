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
    const debugWebpack = process.env.DEBUG_WEBPACK === "TRUE";

    //copy over DB file for production build if it has been provided as env. variable
    const path = process.env.DATABASE_URL.replace(/file:\.?(.*)/, "$1");
    if (!path) return config;
    const absolutePath = process.env.DATABASE_URL.startsWith("file:/");

    //absolute path won't work with the current method, while as Prisma picks up at the absolute folder from system root, webpack does it in build folder
    if (absolutePath) return config;

    //if client, the output path is the root .next folder - this is what we need.
    if (!isServer && !dev) {
      const root = require("path").resolve(__dirname, "./");
      if (debugWebpack) console.log(`root path: ${root}`);

      const outputPath = config.output.path;
      if (debugWebpack) console.log(`output path: ${outputPath}`);

      const from = require("path").resolve(__dirname, `${root}/prisma/${path}`);
      if (debugWebpack) console.log(`copying db file from: ${from}`);

      const to = require("path").resolve(
        __dirname,
        `${outputPath}/../prisma/[name][ext]`
      );
      if (debugWebpack) console.log(`copying db file to: ${to}`);

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
