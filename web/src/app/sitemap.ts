import type { MetadataRoute } from "next";

// Required under output: "export" — the sitemap is baked at build time.
export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://byncbd.org";

// Public pages only — /admin is excluded here and in robots.txt.
const routes = [
  "",
  "/about",
  "/innoventure",
  "/events",
  "/speakers",
  "/sponsors",
  "/news",
  "/get-involved",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((path) => ({
    url: `${siteUrl}${path}/`.replace(/\/+$/, "/"),
    lastModified,
    changeFrequency: path === "" || path === "/news" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/innoventure" ? 0.9 : 0.7,
  }));
}
