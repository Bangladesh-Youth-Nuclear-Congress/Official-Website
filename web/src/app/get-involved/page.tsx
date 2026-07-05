import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { IconCheck, IconChevronDown } from "@/components/icons";

export const metadata: Metadata = {
  title: "Join BYNC — Get Involved",
  description:
    "Join Bangladesh Youth Nuclear Congress — membership is open to students and young professionals under 35 in nuclear science, engineering and related fields. Free to join.",
};

const tiers = [
  {
    badge: "Student",
    name: "Student Member",
    price: "Free",
    unit: "/ year",
    featured: false,
    perks: [
      "Access to all BYNC events & workshops",
      "Eligible to compete in I4N",
      "Newsletter & community updates",
      "BYNC member certificate",
    ],
    cta: { href: "/contact", label: "Apply now", variant: "secondary" as const },
  },
  {
    badge: "Most popular",
    name: "Young Professional",
    price: "Free",
    unit: "/ year",
    featured: true,
    perks: [
      "Everything in Student Member",
      "Considered for the IYNC delegation",
      "Industry networking sessions",
      "International representation opportunities",
    ],
    cta: { href: "/contact", label: "Apply now", variant: "primary" as const },
  },
  {
    badge: "Institutional",
    name: "Institutional Partner",
    price: "Let's talk",
    unit: "",
    featured: false,
    perks: [
      "Corporate / institutional recognition",
      "Co-branded event presence",
      "MOU-based partnership",
      "Access to BYNC's talent pipeline",
    ],
    cta: { href: "/sponsors", label: "Partner options", variant: "secondary" as const },
  },
];

const faqs = [
  ["Who can join BYNC?", "Any student or young professional (under 35) in nuclear science, nuclear engineering or a related field in Bangladesh. Students from MIST, Dhaka University and BUET are especially encouraged."],
  ["How do I get on the IYNC delegation?", "It's competitive — based on your I4N performance, academic background and overall contribution to BYNC. Top performers at I4N Bangladesh 2026 are strongly prioritised."],
  ["Is BYNC formally registered?", "BYNC operates as a young generation nuclear network under academic supervision, and is the official national partner of IYNC. Formal registration is in progress."],
  ["Can companies partner with BYNC?", "Yes. We offer MOU-based partnerships and sponsorship roles for organisations in energy, technology and beyond. See the Sponsors page or get in touch."],
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        crumb="Join"
        title={
          <>
            Find your way <span className="hl">in</span>
          </>
        }
        subtitle="Whether you're here to compete, learn or lead, there's a place for you. Membership is open to students and young professionals under 35 — and it's free."
      />

      {/* tiers */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.08}
              className={`flex h-full flex-col rounded-2xl border p-8 ${
                t.featured
                  ? "border-cyan/50 bg-bg3/80 shadow-[0_0_0_1px_rgba(98,199,242,0.25),0_22px_50px_-20px_rgba(98,199,242,0.25)]"
                  : "border-line bg-bg3/60"
              }`}
            >
              <span
                className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${
                  t.featured ? "bg-cyan/20 text-cyan2" : "bg-cyan/10 text-silver"
                }`}
              >
                {t.badge}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">{t.name}</h3>
              <div className="mt-2 font-display text-3xl font-bold text-cyan2">
                {t.price} <span className="text-base font-normal text-muted">{t.unit}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {t.perks.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm text-silver">
                    <IconCheck width={18} height={18} className="mt-0.5 shrink-0 text-cyan" />
                    {p}
                  </li>
                ))}
              </ul>
              <Button href={t.cta.href} variant={t.cta.variant} className="mt-8 w-full text-sm">
                {t.cta.label}
              </Button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* faq */}
      <section className="border-y border-line bg-bg2/40">
        <div className="mx-auto max-w-[820px] px-6 py-20 lg:px-10">
          <SectionHeading eyebrow="Good questions" title="Things people ask us" center />
          <div className="mt-12 space-y-3">
            {faqs.map(([q, a], i) => (
              <Reveal key={q} delay={i * 0.05}>
                <details className="group rounded-xl border border-line bg-bg3/60 p-5 open:border-line2">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {q}
                    <IconChevronDown
                      width={20}
                      height={20}
                      className="shrink-0 text-cyan transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="One click away"
        title="Ready when you are"
        subtitle="Tell us a little about yourself and we'll get you plugged into the community."
        primary={{ href: "/contact", label: "Apply now" }}
        secondary={{ href: "/i4n", label: "Explore I4N" }}
      />
    </>
  );
}
