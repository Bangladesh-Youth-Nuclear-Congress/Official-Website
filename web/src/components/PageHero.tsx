import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export default function PageHero({
  crumb,
  title,
  subtitle,
}: {
  crumb: string;
  title: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line px-6 pb-16 pt-32 lg:px-10 lg:pt-36">
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="conic-glow animate-spin-slow pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full opacity-20 blur-3xl"
      />
      <Reveal className="relative mx-auto max-w-[1200px]">
        <div className="text-xs uppercase tracking-[0.22em] text-muted">
          <Link href="/" className="transition hover:text-cyan2">
            Home
          </Link>{" "}
          <span className="text-line2">/</span>{" "}
          <span className="text-cyan2">{crumb}</span>
        </div>
        <h1 className="mt-4 text-[clamp(2.1rem,5vw,3.6rem)] font-bold leading-[1.08] text-ink">
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-silver">{subtitle}</p>}
      </Reveal>
    </section>
  );
}
