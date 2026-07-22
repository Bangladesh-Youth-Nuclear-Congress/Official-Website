"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ErrorNote, Panel } from "@/components/admin/ui";

type Stat = { label: string; href: string; count: number | null; hint: string };

const sources: { label: string; href: string; table: string; hint: string; pending?: string }[] = [
  {
    label: "Registrations",
    href: "/admin/registrations",
    table: "registrations",
    hint: "awaiting review",
    pending: "pending",
  },
  {
    label: "Messages",
    href: "/admin/submissions",
    table: "contact_submissions",
    hint: "unread",
    pending: "new",
  },
  {
    label: "Members",
    href: "/admin/members",
    table: "members",
    hint: "awaiting review",
    pending: "pending",
  },
  { label: "News posts", href: "/admin/news", table: "news_posts", hint: "published & drafts" },
  { label: "Media files", href: "/admin/media", table: "media", hint: "in the library" },
];

export default function AdminOverview() {
  const [stats, setStats] = useState<Stat[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const out = await Promise.all(
          sources.map(async (s) => {
            let q = supabase.from(s.table).select("*", { count: "exact", head: true });
            if (s.pending) q = q.eq("status", s.pending);
            const { count, error } = await q;
            if (error) throw error;
            return { label: s.label, href: s.href, count: count ?? 0, hint: s.hint };
          })
        );
        setStats(out);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Overview</h1>
        <p className="mt-1 text-sm text-muted">
          Everything submitted through byncbd.org, and the content you can change without a
          developer.
        </p>
      </div>

      {error && <ErrorNote>{error}</ErrorNote>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(stats ?? sources.map((s) => ({ ...s, count: null }))).map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-line bg-bg3/60 p-6 transition hover:border-line2 hover:bg-bg3"
          >
            <div className="font-display text-3xl font-bold text-ink">
              {s.count === null ? "—" : s.count}
            </div>
            <div className="mt-1 text-sm font-semibold text-cyan2">{s.label}</div>
            <div className="text-xs text-muted">{s.hint}</div>
          </Link>
        ))}
      </div>

      <Panel title="How this works">
        <ul className="space-y-3 text-sm leading-relaxed text-silver">
          <li>
            <strong className="text-ink">News</strong> and <strong className="text-ink">Site content</strong>{" "}
            changes appear on byncbd.org immediately — the public pages read them live, so no
            rebuild is needed.
          </li>
          <li>
            <strong className="text-ink">Messages</strong> (contact form) and{" "}
            <strong className="text-ink">Members</strong> (the Join BYNC form) arrive here the
            moment someone submits. They are private — only signed-in administrators can read
            them; the public forms can write but never read back.
          </li>
          <li>
            <strong className="text-ink">Registrations</strong> is ready but empty: Innoventure
            entries still go through the external application forms for the 2026 event. Anything
            added here later, or imported, will show up in this tab.
          </li>
          <li>
            <strong className="text-ink">Media</strong> uploads go to public storage — treat every
            file there as world-readable.
          </li>
        </ul>
      </Panel>
    </div>
  );
}
