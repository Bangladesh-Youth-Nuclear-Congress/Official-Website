"use client";

import Reveal from "@/components/Reveal";
import { useLiveNews, type LiveNewsPost } from "@/lib/live";

export default function NewsList({ fallback }: { fallback: LiveNewsPost[] }) {
  const news = useLiveNews(fallback);

  return (
    <div className="space-y-6">
      {news.map((n, i) => (
        <Reveal
          key={`${n.title}-${i}`}
          delay={i * 0.06}
          className="group grid gap-4 rounded-2xl border border-line bg-bg3/60 p-7 transition-colors hover:border-line2 sm:grid-cols-[160px_1fr]"
        >
          <div>
            <div className="font-display text-sm font-semibold text-cyan2">{n.date_label}</div>
            <span className="mt-2 inline-block rounded-full border border-line bg-coral/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-coral2">
              {n.tag}
            </span>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">{n.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{n.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
