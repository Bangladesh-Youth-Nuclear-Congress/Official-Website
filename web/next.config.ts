import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page is static, so export to plain HTML/CSS/JS. Netlify then just
  // serves the `out/` folder — no Next.js server runtime needed, which avoids
  // any Next 16 vs. runtime-plugin compatibility issues.
  output: "export",
  // No image optimizer in a static export — serve the images as-is.
  images: { unoptimized: true },
  // Emit /about/index.html so clean URLs resolve on a static host.
  trailingSlash: true,
  basePath: "/Official-Website",
  assetPrefix: "/Official-Website/",
};

export default nextConfig;
