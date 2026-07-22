import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import PartnerStrip from "@/components/PartnerStrip";
import {
  IconCalendar,
  IconPin,
  IconUsers,
  IconTrophy,
  IconArrow,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Innoventure 2026 — BYNC",
  description:
    "Innoventure — Regional Competition, Bangladesh 2026. Powering ideas, energizing tomorrow. 8 August 2026, Russian House, Dhaka. Two segments: Project Showcasing and Poster Presentation, with a ৳40,000 combined prize pool.",
};

const meta = [
  { icon: IconCalendar, label: "8 August 2026" },
  { icon: IconPin, label: "Russian House, Dhaka" },
  { icon: IconUsers, label: "500+ participants" },
  { icon: IconTrophy, label: "2 segments" },
];

const segments = [
  {
    num: "01",
    tag: "Segment 01",
    title: "Project Showcasing",
    img: "/assets/project.jpg",
    body: "Live presentation of working prototypes and energy / nuclear-adjacent solutions in front of guests and jurors.",
    facts: ["15 teams × 3 members", "Prototypes & applied innovation"],
    prize: "৳24,000 prize pool · certificates for all",
    apply:
      "https://docs.google.com/forms/d/1Duht7Si6hhVox45_YmHup0XTGB9VVWUa_G12w6pNiuI/edit",
  },
  {
    num: "02",
    tag: "Segment 02",
    title: "Poster Presentation",
    img: "/assets/poster.jpg",
    body: "A research poster exhibition and defence across energy, nuclear science, climate and SDG alignment — building the academic pipeline for Rooppur and IYNC.",
    facts: ["15 teams × 3 members", "Research & academic posters"],
    prize: "৳16,000 prize pool — ৳8,000 · ৳5,000 · ৳3,000 · certificates for all",
    apply: "https://poster-presentation.pages.dev/",
  },
];

// The official poster is dropped in by hand rather than tracked as code, so the
// panel only renders once the file is actually there. Evaluated at build time —
// this is a server component and the site is a static export.
const POSTER = "/assets/innoventure-poster.jpg";
const hasPoster = existsSync(join(process.cwd(), "public", POSTER));

// Themes a submission can fall under, as published on the Innoventure poster.
const scope = [
  "Power & Reactor Technology",
  "Clean Energy & Sustainability",
  "SDG-Aligned Innovation",
  "Innovative or Working Model",
  "Smart & Green Energy Systems",
  "AI, Data & Smart Technology for Energy and Industry",
  "Environment, Climate & Resource Management",
  "Health, Safety & Radiation Applications",
  "Policy, Education & Public Awareness on Energy and Science",
  "General Engineering & Applied Science Innovation",
];

export default function InnoventurePage() {
  return (
    <>
      <PageHero
        crumb="Innoventure 2026"
        title={
          <>
            Powering ideas, <span className="hl">energizing tomorrow</span>
          </>
        }
        subtitle="Innoventure — Regional Competition, Bangladesh 2026. BYNC's flagship platform for exploring innovative ideas on nuclear, power and energy, and presenting the solutions that shape our future."
      />

      {/* event facts band */}
      <section className="mx-auto max-w-[1200px] px-6 pt-16 lg:px-10">
        <Reveal className="overflow-hidden rounded-3xl border border-line2 bg-gradient-to-br from-bg3 to-bg2 p-8 md:p-10">
          <h2 className="font-display text-2xl font-bold text-ink">
            One day. Two ways to compete.
          </h2>
          <p className="mt-3 max-w-2xl text-silver">
            Whether you build a working prototype or defend a research poster — there&apos;s a track
            for you, and ৳40,000 on the table across the two segments.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
            {meta.map((m) => (
              <span key={m.label} className="inline-flex items-center gap-2.5 text-sm text-cyan2">
                <m.icon width={20} height={20} /> {m.label}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* segments */}
      <section className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-[860px] gap-6 md:grid-cols-2">
          {segments.map((s, i) => (
            <Reveal
              key={s.num}
              delay={i * 0.08}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-bg3/60 transition-colors hover:border-line2"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  sizes="(max-width:1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full border border-line2 bg-bg/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan2 backdrop-blur">
                  {s.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm text-silver">
                  {s.facts.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-cyan">•</span> {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted">
                  Prizes — <span className="font-display text-cyan2">{s.prize}</span>
                </p>
                <div className="mt-6 flex-1" />
                <Button href={s.apply} external className="w-full text-sm">
                  Apply now <IconArrow width={16} height={16} />
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* scope + poster */}
      <section className="border-y border-line bg-bg2/40">
        <div
          className={`mx-auto grid max-w-[1200px] gap-12 px-6 py-20 lg:px-10 ${
            hasPoster ? "lg:grid-cols-[1fr_minmax(0,420px)]" : ""
          }`}
        >
          <div>
            <SectionHeading
              eyebrow="Scope"
              title="What you can bring to the table"
              subtitle="Submissions can sit anywhere across nuclear, power and energy — and the problems they touch."
            />
            <div className="mt-10 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {scope.map((s, i) => (
                <Reveal
                  key={s}
                  delay={i * 0.03}
                  className="flex gap-3 border-b border-line py-3 text-sm text-silver"
                >
                  <span className="font-display text-xs text-cyan2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s}
                </Reveal>
              ))}
            </div>
          </div>

          {hasPoster && (
            <Reveal delay={0.1} className="lg:pt-4">
              <div className="overflow-hidden rounded-2xl border border-line2 bg-bg3/60">
                <Image
                  src={POSTER}
                  alt="Innoventure — Regional Competition, Bangladesh 2026. 8 August 2026, Russian House, Dhaka."
                  width={904}
                  height={1280}
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="h-auto w-full"
                />
              </div>
              <p className="mt-4 text-center text-xs text-muted">
                Innoventure 2026 — official poster
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* sponsors */}
      <section className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10">
        <PartnerStrip
          heading="Innoventure 2026 partners"
          note="Hosted at Russian House, Dhaka. Interested in supporting Innoventure? See our sponsorship packages."
        />
      </section>

      {/* beyond the stage */}
      <section className="mx-auto max-w-[1200px] px-6 pb-20 lg:px-10">
        <SectionHeading
          eyebrow="Beyond the stage"
          title="Dhaka is the start, not the finish"
          subtitle="Standout performers at Innoventure 2026 are prioritised for BYNC's delegation to IYNC 2026 in Avignon, France — where Bangladesh raises its first-ever National Pavilion."
        />
        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-3 text-sm text-silver">
          <span className="rounded-full border border-line bg-bg3/60 px-4 py-2">Dhaka · 8 August 2026</span>
          <IconArrow width={18} height={18} className="text-coral" />
          <span className="rounded-full border border-line bg-bg3/60 px-4 py-2">Avignon · 4–9 October 2026</span>
          <IconArrow width={18} height={18} className="text-coral" />
          <span className="rounded-full border border-cyan/40 bg-cyan/10 px-4 py-2 text-cyan2">
            The global nuclear stage
          </span>
        </Reveal>
      </section>

      <CtaBand
        eyebrow="Get in"
        title="Think you've got what it takes?"
        subtitle="Applications are open for both segments. Bring your team and your idea — we'll bring the stage."
        primary={{ href: "/get-involved", label: "Join the Movement" }}
        secondary={{ href: "/contact", label: "Ask a question" }}
      />
    </>
  );
}
