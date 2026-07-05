import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Countdown from "@/components/Countdown";
import {
  IconBuilding,
  IconTicket,
  IconMegaphone,
  IconGlobe,
  IconBook,
  IconMedal,
  IconTarget,
  IconNewspaper,
  IconUsers,
  IconShield,
  IconClock,
  IconCheck,
  IconArrow,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Partner with BYNC — Sponsors",
  description:
    "Sponsor Bangladesh Youth Nuclear Congress and put your brand on the journey from I4N Bangladesh 2026 in Dhaka to Bangladesh's first-ever National Pavilion at IYNC 2026 in Avignon, France.",
};

const costRows: [string, string, string?][] = [
  ["IYNC 2026 Bronze Package", "৳9,45,000", "official fee · €7,000"],
  ["Bank charges, VAT & transfer costs", "৳1,05,000"],
];

const bronze = [
  { icon: IconBuilding, t: "National Pavilion", b: "4 sqm reserved exhibition space at IYNC 2026, Avignon." },
  { icon: IconTicket, t: "Delegate Access", b: "2 complimentary delegate registrations (€800 value each)." },
  { icon: IconMegaphone, t: "On-Stage Visibility", b: "Public display banner in the lobby and during panel sessions." },
  { icon: IconGlobe, t: "Global Social Campaign", b: "Featured across IYNC's international social-media campaigns." },
  { icon: IconBook, t: "Official Recognition", b: "Named in the official IYNC program and proceedings." },
  { icon: IconMedal, t: "Certificate", b: "Official IYNC Certificate of Contribution." },
];

const valueAdd = [
  { icon: IconTarget, t: "Two stages, one sponsorship", b: "Your brand appears at I4N Bangladesh 2026 in Dhaka (1 August 2026) and at IYNC 2026 in Avignon (October). Most sponsors get one event — you get both." },
  { icon: IconNewspaper, t: "National media & press", b: "BYNC actively pursues national press for I4N. Your name appears in every press release, certificate (120+), banner and announcement." },
  { icon: IconUsers, t: "The nuclear talent pipeline", b: "Direct access to Bangladesh's best nuclear engineering students and young professionals — the people who will work at BAEC, NPCBL and Rooppur NPP." },
];

const tiers = [
  { lvl: "TITLE", role: "Founding Institutional Partner", amt: "৳8,00,000", color: "#62C7F2", benefit: "Global brand travel to France + full IYNC exhibition hall presence." },
  { lvl: "GOLD", role: "Principal Innovation Partner", amt: "৳6,50,000", color: "#F4B942", benefit: "VIP photo session + post-event media feature." },
  { lvl: "SILVER", role: "Strategic Supporting Partner", amt: "৳5,00,000", color: "#9CA3AF", benefit: "Stall at Russian House + IYNC exhibition hall." },
  { lvl: "BRONZE", role: "Community Innovation Partner", amt: "৳3,50,000", color: "#CD7F32", benefit: "Exclusive access to networking events." },
  { lvl: "SUPPORT", role: "Network Advancement Partner", amt: "৳2,00,000", color: "#8AA0B8", benefit: "Logo on all 120+ certificates + national media coverage." },
];

const payment = [
  { icon: IconShield, pn: "Confirm", t: "Sign the MOU", b: "Signing locks in your tier and all branding." },
  { icon: IconClock, pn: "20% upfront", t: "Within 7 days of signing", b: "Secures your spot and activates your branding across both events." },
  { icon: IconCheck, pn: "80% later", t: "After visa confirmation", b: "Invoiced only once delegate visas are confirmed (late Aug–Sep). No visa, no invoice — your money is safe. NB: for the IYNC 2026 Bronze Package only, not the regional I4N competition." },
];

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        crumb="Sponsors"
        title={
          <>
            Partner with BYNC — from Dhaka to <span className="hl">Avignon</span>
          </>
        }
        subtitle="Be part of Bangladesh's first-ever National Pavilion at an international nuclear congress."
      />

      {/* pitch line */}
      <section className="mx-auto max-w-[1100px] px-6 pt-16 lg:px-10">
        <Reveal className="rounded-r-2xl border-l-4 border-cyan bg-gradient-to-r from-cyan/10 to-transparent p-8 md:p-10">
          <p className="font-display text-[clamp(1.2rem,2.4vw,1.7rem)] font-medium leading-snug text-ink">
            Your sponsorship powers two connected milestones: <span className="text-cyan2">I4N Bangladesh 2026</span> in
            Dhaka on 1 August 2026, and Bangladesh&apos;s <span className="text-cyan2">first-ever National Pavilion at IYNC
            2026</span> in Avignon, France this October. Your brand travels with us — from the national stage in Dhaka
            to the historic <span className="text-cyan2">Palais des Papes</span>, in front of the global nuclear
            industry.
          </p>
        </Reveal>
      </section>

      {/* step 1 — cost */}
      <section className="mx-auto max-w-[1100px] px-6 py-20 lg:px-10">
        <SectionHeading
          eyebrow="Step 1"
          title="BYNC is securing the Bronze Package at IYNC 2026"
          subtitle="IYNC 2026 is the biennial International Youth Nuclear Congress — the largest global gathering of young nuclear professionals, in Avignon, France (October 4–9). BYNC is purchasing the official Bronze Package to bring Bangladesh's first-ever National Pavilion to this congress."
          center
        />
        <Reveal delay={0.1} className="mx-auto mt-12 max-w-xl overflow-hidden rounded-2xl border border-line bg-bg3/60">
          {costRows.map(([label, amt, sub]) => (
            <div key={label} className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
              <div className="text-sm text-silver">
                {label}
                {sub && <span className="mt-0.5 block text-xs text-muted">{sub}</span>}
              </div>
              <div className="whitespace-nowrap font-display text-ink">{amt}</div>
            </div>
          ))}
          <div className="flex items-center justify-between gap-4 bg-cyan/10 px-6 py-4">
            <div className="font-display font-bold text-ink">Total</div>
            <div className="whitespace-nowrap font-display text-lg font-bold text-cyan2">৳10,50,000</div>
          </div>
        </Reveal>
      </section>

      {/* bronze benefits */}
      <section className="border-y border-line bg-bg2/40">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
          <SectionHeading eyebrow="The Bronze Package" title="What it gives your brand at Avignon" center />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bronze.map((b, i) => (
              <Card key={b.t} icon={b.icon} title={b.t} delay={i * 0.06}>
                {b.b}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* step 2 — value add */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
        <SectionHeading
          eyebrow="Step 2"
          title="Why partnering with BYNC goes further"
          subtitle="Sponsors don't just get the IYNC benefits — they get everything BYNC adds on top."
          center
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {valueAdd.map((v, i) => (
            <Card key={v.t} icon={v.icon} title={v.t} delay={i * 0.08}>
              {v.b}
            </Card>
          ))}
        </div>
      </section>

      {/* tiers */}
      <section className="border-y border-line bg-bg2/40">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
          <SectionHeading
            eyebrow="Choose your level"
            title="Partnership tiers"
            subtitle="Every tier is a genuine partnership — not just a logo placement. Pick the level that matches your ambition."
            center
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {tiers.map((t, i) => (
              <Reveal
                key={t.lvl}
                delay={i * 0.06}
                className="flex h-full flex-col rounded-2xl border border-line bg-bg3/60 p-6 text-center transition-transform hover:-translate-y-1.5"
                y={20}
              >
                <div className="mx-auto h-1 w-12 rounded-full" style={{ background: t.color }} />
                <div className="mt-4 font-display text-lg font-bold tracking-wide text-ink">{t.lvl}</div>
                <div className="mt-1 min-h-[34px] text-xs text-muted">{t.role}</div>
                <div className="mt-3 font-display text-xl font-bold" style={{ color: t.color }}>
                  {t.amt}
                  <span className="block text-[11px] font-normal text-muted">BDT</span>
                </div>
                <p className="mt-4 border-t border-dashed border-line pt-4 text-left text-xs leading-relaxed text-silver">
                  {t.benefit}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mx-auto mt-8 max-w-2xl rounded-xl border border-line bg-cyan/5 p-5 text-center text-sm text-muted">
            The full tier-by-tier benefits breakdown is in the proposal. In-kind sponsorships (equipment, services,
            hospitality) are classified by equivalent value — <span className="text-cyan2">terms can be tailored on request.</span>
          </Reveal>
        </div>
      </section>


      {/* regional sponsor */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
        <SectionHeading
          eyebrow="Regional sponsor"
          title="Regional I4N Competition Sponsor"
          subtitle="For partners who want to support the national I4N Bangladesh competition directly, separate from the IYNC 2026 Bronze Package."
          center
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card icon={IconTarget} title="Competition visibility">
            Brand presence at I4N Bangladesh 2026 in Bangladesh, including event banners, announcements and certificates.
          </Card>
          <Card icon={IconNewspaper} title="National media & press" delay={0.08}>
            BYNC actively pursues national press for I4N Bangladesh 2026. Your name appears in event communications and post-event coverage.
          </Card>
          <Card icon={IconUsers} title="The nuclear talent pipeline" delay={0.16}>
            Direct access to Bangladesh&apos;s best nuclear engineering students and young professionals — the people who will work at BAEC, NPCBL and Rooppur NPP.
          </Card>
        </div>
        <Reveal delay={0.1} className="mx-auto mt-8 max-w-2xl rounded-xl border border-line bg-cyan/5 p-5 text-center text-sm text-muted">
          Regional sponsorship can be tailored by equivalent value, in-kind support, hospitality, equipment or services.
        </Reveal>
      </section>
      {/* payment */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
        <SectionHeading eyebrow="Zero financial risk" title="Payment structured to protect you" center />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {payment.map((p, i) => (
            <Reveal key={p.pn} delay={i * 0.08} className="rounded-2xl border border-line bg-bg3/60 p-7">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-cyan/10 text-cyan">
                <p.icon width={24} height={24} />
              </div>
              <div className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-coral">{p.pn}</div>
              <h4 className="mt-2 font-display text-lg font-semibold text-ink">{p.t}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.b}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1} className="mt-8 text-center text-sm text-muted">
          Exchange rate: 1 USD = 125 BDT
        </Reveal>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 lg:px-10">
        <Reveal className="relative mx-auto max-w-[1100px] overflow-hidden rounded-3xl border border-line2 bg-gradient-to-br from-bg3 to-bg2 p-10 text-center md:p-16">
          <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="conic-glow animate-spin-slow pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
          />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-coral/40 bg-coral/10 px-4 py-1.5 text-xs font-semibold text-coral2">
              <IconClock width={15} height={15} /> MOU deadline · June 25, 2026 — Title &amp; Gold spots limited
            </span>
            <div className="mt-7">
              <Countdown />
            </div>
            <h2 className="mx-auto mt-8 max-w-2xl text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-ink">
              Ready to partner with BYNC?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-silver">
              Spots are limited — especially Title and Gold. Let&apos;s put your brand on the journey from Dhaka to the
              Palais des Papes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact">
                Contact us <IconArrow width={18} height={18} />
              </Button>
              <Button href="/contact" variant="secondary">
                Request full proposal
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
