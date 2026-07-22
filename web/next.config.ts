import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page is static, so export to plain HTML/CSS/JS. GitHub Pages then
  // just serves the `out/` folder — no Next.js server runtime needed.
  output: "export",
  images: {
    // No image optimizer in a static export — serve the images as-is.
    unoptimized: true,
    // Media uploaded through /admin is served from Supabase Storage.
    remotePatterns: [
      { protocol: "https", hostname: "asyxebpwkpzgqyhpegkj.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
  // Emit /about/index.html so clean URLs resolve on a static host.
  trailingSlash: true,
  // Served from the root of the custom domain (byncbd.org) — no base path.
};

export default nextConfig;
