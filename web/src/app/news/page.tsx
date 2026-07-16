import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "News & Updates — BYNC",
  description:
    "The latest from Bangladesh Youth Nuclear Congress — from the IYNC membership MOU to international keynotes and the run-up to I4N Bangladesh 2026.",
};

const news = [
  {
    date: "June 2026",
    tag: "Milestone",
    title: "I4N Bangladesh 2026 is locked in",
    body: "Over 500 students engaged and submissions rolling in across all three segments. Event day is confirmed: 8 August 2026 at Russian House, Dhaka.",
  },
  {
    date: "January 2026",
    tag: "Keynote",
    title: "Two more international keynotes for Bangladeshi students",
    body: "Dr. Dinara Ermakova (IYNC Innovation Chair) and George Caliment (I4N Europe Lead, Assystem) addressed Bangladeshi students directly — on innovation and what it takes on the global stage.",
  },
  {
    date: "December 2025",
    tag: "Programme",
    title: "“Road to I4N” launches across campuses",
    body: "Campus sessions kicked off at Dhaka University and MIST. BYNC was listed on IYNC's global Young Generation Network map, with a keynote from Alice Cunha da Silva (IYNC Vice President, Westinghouse).",
  },
  {
    date: "August 2025",
    tag: "Membership",
    title: "Bangladesh joins IYNC as the 49th member nation",
    body: "The MOU with IYNC made it official — Bangladesh entered the global young generation nuclear network, and BYNC was featured on IYNC's official platform.",
  },
];

export default function NewsPage() {
  return (
    <>
      <PageHero
        crumb="News"
        title={
          <>
            A lot can happen in <span className="hl">under a year</span>
          </>
        }
        subtitle="From a founding idea to a seat in the global nuclear network — here's the story so far, in the order it happened."
      />

      <section className="mx-auto max-w-[860px] px-6 py-20 lg:px-10">
        <div className="space-y-6">
          {news.map((n, i) => (
            <Reveal
              key={n.title}
              delay={i * 0.06}
              className="group grid gap-4 rounded-2xl border border-line bg-bg3/60 p-7 transition-colors hover:border-line2 sm:grid-cols-[160px_1fr]"
            >
              <div>
                <div className="font-display text-sm font-semibold text-cyan2">{n.date}</div>
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
      </section>

      <CtaBand
        eyebrow="Don't miss the next one"
        title="The best updates land first with our members"
        subtitle="Join BYNC or follow us to get news, keynotes and I4N announcements before anyone else."
        primary={{ href: "/get-involved", label: "Join BYNC" }}
        secondary={{ href: "/contact", label: "Get in touch" }}
      />
    </>
  );
}
