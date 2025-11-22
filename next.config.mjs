/** @type {import('next').NextConfig} */
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  output: "export",
  distDir: "out",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
  sassOptions: {
    includePaths: [join(__dirname, "css")],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
