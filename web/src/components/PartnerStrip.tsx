import Image from "next/image";
import Reveal from "@/components/Reveal";

/**
 * Sponsors as printed on the Innoventure 2026 poster.
 *
 * `logo` is optional on purpose: until we have clean transparent logo files,
 * each partner renders as a styled wordmark. Dropping a file into
 * public/assets/sponsors/ and setting `logo` here is all it takes to upgrade
 * one — no other change needed.
 */
export type Partner = { name: string; logo?: string; href?: string };

export const partners: Partner[] = [
  { name: "IDP Education" },
  { name: "Meghna Bank PLC" },
  { name: "ITC" },
  { name: "Supersign Cables" },
];

export default function PartnerStrip({
  heading = "Our partners",
  note,
}: {
  heading?: string;
  note?: string;
}) {
  return (
    <div>
      <h3 className="text-center text-[11.5px] font-semibold uppercase tracking-[0.2em] text-cyan2">
        {heading}
      </h3>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {partners.map((p, i) => {
          const inner = p.logo ? (
            <Image
              src={p.logo}
              alt={p.name}
              width={160}
              height={56}
              className="h-9 w-auto object-contain opacity-80 transition group-hover:opacity-100"
            />
          ) : (
            <span className="font-display text-sm font-semibold tracking-wide text-silver transition group-hover:text-ink">
              {p.name}
            </span>
          );

          return (
            <Reveal
              key={p.name}
              delay={i * 0.06}
              className="group grid min-h-[68px] min-w-[150px] flex-1 place-items-center rounded-xl border border-line bg-bg3/60 px-6 py-4 transition-colors hover:border-line2"
            >
              {p.href ? (
                <a href={p.href} target="_blank" rel="noopener" aria-label={p.name}>
                  {inner}
                </a>
              ) : (
                inner
              )}
            </Reveal>
          );
        })}
      </div>
      {note && <p className="mt-6 text-center text-xs text-muted">{note}</p>}
    </div>
  );
}
