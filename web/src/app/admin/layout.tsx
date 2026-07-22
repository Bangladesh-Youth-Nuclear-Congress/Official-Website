import type { Metadata } from "next";
import type { ReactNode } from "react";
import AdminShell from "@/components/admin/AdminShell";

// Server component purely so the admin area can declare its own metadata —
// the interactive shell (auth, nav) lives in AdminShell.
export const metadata: Metadata = {
  title: "BYNC admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
