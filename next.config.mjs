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
  transpilePackages: [
    "framer-motion",
    "gsap",
    "react-scroll-parallax",
    "@nextui-org/react",
    "@nextui-org/button",
    "@nextui-org/card",
    "@nextui-org/modal",
    "@nextui-org/navbar",
    "@nextui-org/system",
    "@nextui-org/theme",
    "@nextui-org/accordion",
    "@nextui-org/autocomplete",
    "@nextui-org/calendar",
    "@nextui-org/date-picker",
    "@nextui-org/dropdown",
    "@nextui-org/popover",
    "@nextui-org/select",
    "@nextui-org/snippet",
    "@nextui-org/tabs",
    "@nextui-org/tooltip",
    "react-icons",
  ],
};

export default nextConfig;
