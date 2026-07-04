import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { IconArrow } from "@/components/icons";

type Action = { href: string; label: string; external?: boolean };

export default function CtaBand({
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  primary: Action;
  secondary?: Action;
}) {
  return (
    <section className="px-6 py-20 lg:px-10">
      <Reveal className="relative mx-auto max-w-[1100px] overflow-hidden rounded-3xl border border-line2 bg-gradient-to-br from-bg3 to-bg2 p-10 text-center md:p-16">
        <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
        <div
          aria-hidden
          className="conic-glow animate-spin-slow pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
        />
        <div className="relative">
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-coral">
              {eyebrow}
            </span>
          )}
          <h2 className="mx-auto mt-3 max-w-2xl text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-ink">
            {title}
          </h2>
          {subtitle && <p className="mx-auto mt-4 max-w-xl text-silver">{subtitle}</p>}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={primary.href} external={primary.external}>
              {primary.label} <IconArrow width={18} height={18} />
            </Button>
            {secondary && (
              <Button href={secondary.href} variant="secondary" external={secondary.external}>
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
