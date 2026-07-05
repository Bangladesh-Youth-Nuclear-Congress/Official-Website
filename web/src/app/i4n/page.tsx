import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import {
  IconCalendar,
  IconPin,
  IconUsers,
  IconTrophy,
  IconArrow,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "I4N Bangladesh 2026 — BYNC",
  description:
    "Innovation for Nuclear (I4N) Bangladesh 2026 — the national qualifying round of IYNC's flagship competition. 25 July 2026, Russian House, Dhaka. Three segments, 300+ participants, winners advance to Avignon.",
};

const meta = [
  { icon: IconCalendar, label: "25 July 2026" },
  { icon: IconPin, label: "Russian House, Dhaka" },
  { icon: IconUsers, label: "300+ participants" },
  { icon: IconTrophy, label: "3 segments" },
];

const segments = [
  {
    num: "01",
    tag: "Segment 01",
    title: "I4N Competition",
    img: "/assets/i4n.jpg",
    body: "Abstract-based selection from 40+ submissions, judged on the IYNC-standard rubric to find Bangladesh's sharpest nuclear innovators.",
    facts: ["10 teams × 3 members", "Applied nuclear innovation, aligned to the UN SDGs"],
    prize: "৳10,000 travel grant + trophy · ৳5,000 · ৳3,000",
    apply: "https://i4n-form.pages.dev/",
  },
  {
    num: "02",
    tag: "Segment 02",
    title: "Project Showcase",
    img: "/assets/project.jpg",
    body: "Live presentation of working prototypes and energy / nuclear-adjacent solutions in front of guests and jurors.",
    facts: ["15 teams × 3 members", "Prototypes & applied innovation"],
    prize: "৳8,000 · ৳5,000 · ৳3,000 · certificates for all",
    apply:
      "https://docs.google.com/forms/d/1Duht7Si6hhVox45_YmHup0XTGB9VVWUa_G12w6pNiuI/edit",
  },
  {
    num: "03",
    tag: "Segment 03",
    title: "Poster Presentation",
    img: "/assets/poster.jpg",
    body: "A research poster exhibition and defence across energy, nuclear science, climate and SDG alignment — building the academic pipeline for Rooppur and IYNC.",
    facts: ["15 teams × 3 members", "Research & academic posters"],
    prize: "৳8,000 · ৳5,000 · ৳3,000 · certificates for all",
    apply: "https://poster-presentation.pages.dev/",
  },
];

export default function I4NPage() {
  return (
    <>
      <PageHero
        crumb="I4N 2026"
        title={
          <>
            Innovation for Nuclear <span className="hl">2026</span>
          </>
        }
        subtitle="Bangladesh's first national young generation nuclear innovation competition — and the qualifying round of IYNC's flagship I4N. The national winners carry Bangladesh's name to Avignon."
      />

      {/* event facts band */}
      <section className="mx-auto max-w-[1200px] px-6 pt-16 lg:px-10">
        <Reveal className="overflow-hidden rounded-3xl border border-line2 bg-gradient-to-br from-bg3 to-bg2 p-8 md:p-10">
          <h2 className="font-display text-2xl font-bold text-ink">
            Three days. Three ways to compete.
          </h2>
          <p className="mt-3 max-w-2xl text-silver">
            Whether you build, present or research — there&apos;s a track for you, and a real path
            from a Dhaka stage to the global congress in France.
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
        <div className="grid gap-6 lg:grid-cols-3">
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

      {/* global finale */}
      <section className="border-y border-line bg-bg2/40">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
          <SectionHeading
            eyebrow="The Global Finale"
            title="The winners don't just win — they travel"
            subtitle="National winners of I4N Bangladesh 2026 advance to the I4N Global Finale at IYNC 2026 in Avignon, France — carrying Bangladesh's nuclear innovation to the world stage, with an IYNC travel grant for finalists."
          />
          <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-3 text-sm text-silver">
            <span className="rounded-full border border-line bg-bg3/60 px-4 py-2">Dhaka · 25 July 2026</span>
            <IconArrow width={18} height={18} className="text-coral" />
            <span className="rounded-full border border-line bg-bg3/60 px-4 py-2">Avignon · 4–9 October 2026</span>
            <IconArrow width={18} height={18} className="text-coral" />
            <span className="rounded-full border border-cyan/40 bg-cyan/10 px-4 py-2 text-cyan2">
              The global nuclear stage
            </span>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Get in"
        title="Think you've got what it takes?"
        subtitle="Applications are open across all three segments. Bring your team and your idea — we'll bring the stage."
        primary={{ href: "/get-involved", label: "Join the Movement" }}
        secondary={{ href: "/contact", label: "Ask a question" }}
      />
    </>
  );
}
