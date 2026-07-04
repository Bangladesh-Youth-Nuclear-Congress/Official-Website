import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
}) {
  return (
    <Reveal className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-coral">{eyebrow}</span>
      )}
      <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.7rem)] font-bold leading-[1.1] text-ink">{title}</h2>
      {subtitle && (
        <p className={cn("mt-4 max-w-xl text-silver", center && "mx-auto")}>{subtitle}</p>
      )}
    </Reveal>
  );
}
