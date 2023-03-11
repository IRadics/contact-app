/** @type {import('next').NextConfig} */
const paths = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
};

module.exports = nextConfig;
