"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Hides the public site chrome (nav, footer, backdrop, smooth scroll) on
 * /admin, which brings its own shell. Children are rendered by the server
 * layout and merely gated here, so nothing becomes a client component just by
 * being wrapped.
 */
export default function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return null;
  return <>{children}</>;
}
