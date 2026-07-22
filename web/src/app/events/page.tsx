import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import Card from "@/components/Card";
import CtaBand from "@/components/CtaBand";
import { IconCalendar, IconPin, IconGlobe, IconArrow, IconBook, IconMegaphone, IconNetwork } from "@/components/icons";

export const metadata: Metadata = {
  title: "Events — BYNC",
  description:
    "BYNC's calendar — Innoventure 2026 (8 August 2026, Russian House Dhaka) and Bangladesh's first-ever National Pavilion at IYNC 2026 in Avignon, France (4–9 October).",
};

const iyncRows: [string, string][] = [
  ["Theme", "“The Chain of Change”"],
  ["Venue", "Palais des Papes, Avignon — a UNESCO World Heritage Site"],
  ["Dates", "4–9 October 2026"],
  ["BYNC presence", "Bangladesh's first-ever National Pavilion (IYNC Bronze Package)"],
  ["Reach", "50+ countries · 500+ attendees · IAEA & WNA support"],
];

const outreach = [
  { icon: IconBook, title: "Road to I4N", body: "Awareness campaigns and campus sessions across leading institutions, including Dhaka University and MIST." },
  { icon: IconMegaphone, title: "International Keynotes", body: "Direct sessions with senior figures from IYNC, Westinghouse and Assystem — brought to Bangladeshi students." },
  { icon: IconNetwork, title: "Global Exchange", body: "Connecting members into IYNC's 49-country network for mentoring, collaboration and co-authored research." },
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        crumb="Events"
        title="Bangladesh to Global stage"
        subtitle="Two milestones, one journey. Here's where BYNC shows up in 2026 — and how a competition in Bangladesh becomes a seat at the world's biggest young generation nuclear congress."
      />

      {/* flagship events */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Innoventure */}
          <Reveal className="flex flex-col overflow-hidden rounded-2xl border border-line2 bg-gradient-to-br from-bg3 to-bg2 p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">8 August 2026 · Dhaka</span>
            <h3 className="mt-3 font-display text-2xl font-bold text-ink">Innoventure 2026</h3>
            <p className="mt-3 leading-relaxed text-silver">
              BYNC&apos;s regional competition on nuclear, power and energy — two segments,
              500+ participants and a ৳40,000 prize pool.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-sm text-cyan2">
              <span className="inline-flex items-center gap-2"><IconCalendar width={18} height={18} /> 8 August 2026</span>
              <span className="inline-flex items-center gap-2"><IconPin width={18} height={18} /> Russian House, Dhaka</span>
            </div>
            <div className="mt-7 flex-1" />
            <Button href="/innoventure" className="mt-2 self-start text-sm">
              Explore Innoventure <IconArrow width={16} height={16} />
            </Button>
          </Reveal>

          {/* IYNC */}
          <Reveal delay={0.1} className="flex flex-col rounded-2xl border border-line bg-bg3/60 p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">4–9 October 2026 · Avignon</span>
            <h3 className="mt-3 font-display text-2xl font-bold text-ink">IYNC 2026, France</h3>
            <p className="mt-3 leading-relaxed text-silver">
              The biennial International Youth Nuclear Congress — where Bangladesh raises its first
              national flag, hosted in a UNESCO World Heritage palace.
            </p>
            <dl className="mt-6 space-y-0">
              {iyncRows.map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1 border-b border-line py-3 sm:flex-row sm:gap-4">
                  <dt className="min-w-[120px] text-sm text-muted">{k}</dt>
                  <dd className="text-sm text-cyan2">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* outreach */}
      <section className="border-y border-line bg-bg2/40">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
          <SectionHeading
            eyebrow="All year round"
            title="It's not just two days a year"
            subtitle="Between the headline events, BYNC runs the groundwork that makes them matter."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {outreach.map((o, i) => (
              <Card key={o.title} icon={o.icon} title={o.title} delay={i * 0.08}>
                {o.body}
              </Card>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-10 flex items-center gap-2 text-sm text-muted">
            <IconGlobe width={18} height={18} className="text-cyan" />
            Want us on your campus? <Link href="/contact" className="text-cyan2 underline-offset-2 hover:underline">Invite BYNC</Link>.
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Be there"
        title="Don't just read about it — show up"
        subtitle="Compete at Innoventure, join the delegation, or partner with the journey to Avignon."
        primary={{ href: "/innoventure", label: "See Innoventure 2026" }}
        secondary={{ href: "/get-involved", label: "Join BYNC" }}
      />
    </>
  );
}
