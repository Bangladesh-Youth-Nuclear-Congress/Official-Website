import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import NewsList from "@/components/NewsList";

export const metadata: Metadata = {
  title: "News & Updates — BYNC",
  description:
    "The latest from Bangladesh Youth Nuclear Congress — from the IYNC membership MOU to international keynotes and the run-up to Innoventure 2026.",
};

const fallback = [
  {
    date_label: "June 2026",
    tag: "Milestone",
    title: "Innoventure 2026 is locked in",
    body: "Over 500 students engaged and submissions rolling in across both segments. Event day is confirmed: 8 August 2026 at Russian House, Dhaka.",
  },
  {
    date_label: "January 2026",
    tag: "Keynote",
    title: "Two more international keynotes for Bangladeshi students",
    body: "Dr. Dinara Ermakova (IYNC Innovation Chair) and George Caliment (I4N Europe Lead, Assystem) addressed Bangladeshi students directly — on innovation and what it takes on the global stage.",
  },
  {
    date_label: "December 2025",
    tag: "Programme",
    title: "“Road to I4N” launches across campuses",
    body: "Campus sessions kicked off at Dhaka University and MIST. BYNC was listed on IYNC's global Young Generation Network map, with a keynote from Alice Cunha da Silva (IYNC Vice President, Westinghouse).",
  },
  {
    date_label: "August 2025",
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
        <NewsList fallback={fallback} />
      </section>

      <CtaBand
        eyebrow="Don't miss the next one"
        title="The best updates land first with our members"
        subtitle="Join BYNC or follow us to get news, keynotes and Innoventure announcements before anyone else."
        primary={{ href: "/get-involved", label: "Join BYNC" }}
        secondary={{ href: "/contact", label: "Get in touch" }}
      />
    </>
  );
}
