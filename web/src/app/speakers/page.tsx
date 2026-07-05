import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Activities — BYNC",
  description:
    "The international voices who have addressed Bangladeshi students through BYNC — including IYNC Vice President Alice Cunha da Silva, IYNC Innovation Chair Dr. Dinara Ermakova, and I4N Europe Lead George Caliment.",
};

const speakers = [
  {
    img: "/Official-Website/assets/speakers/alice.jpg",
    n: "Alice Cunha da Silva",
    r: "IYNC Vice President",
    o: "Westinghouse",
    bio: "Opened BYNC's Road to I4N with a candid talk on building a global nuclear career — from anywhere in the world, Bangladesh included.",
  },
  {
    img: "/Official-Website/assets/speakers/dinara.jpg",
    n: "Dr. Dinara Ermakova",
    r: "IYNC Innovation Chair",
    o: "International Youth Nuclear Congress",
    bio: "Spoke to Bangladeshi students on turning early nuclear ideas into real, fundable innovation — and what judges actually look for.",
  },
  {
    img: "/Official-Website/assets/speakers/george.jpg",
    n: "George Caliment",
    r: "I4N Europe Lead",
    o: "Assystem",
    bio: "Walked students through how I4N works on the world stage, and what a Bangladeshi team should aim for to stand out at the global finale.",
  },
];

export default function SpeakersPage() {
  return (
    <>
      <PageHero
        crumb="Activities"
        title={
          <>
            The voices that <span className="hl">crossed borders</span> for our students
          </>
        }
        subtitle="Long before the event, BYNC brought senior figures from the global nuclear world straight to Bangladeshi students — on screen, in their own classrooms."
      />

      <section className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {speakers.map((speaker, i) => (
            <Reveal
              key={speaker.n}
              delay={i * 0.08}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-bg3/60 transition-colors hover:border-line2"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg2">
                <Image
                  src={speaker.img}
                  alt={speaker.n}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-xl font-semibold text-ink">{speaker.n}</h3>
                <p className="mt-1 text-sm font-semibold text-cyan2">{speaker.r}</p>
                <p className="text-xs text-muted">{speaker.o}</p>
                <p className="mt-4 text-sm leading-relaxed text-silver">{speaker.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10 rounded-2xl border border-dashed border-line2 bg-bg2/40 p-7 text-center">
          <p className="text-silver">
            The full I4N Bangladesh 2026 speaker line-up is being finalised.{" "}
            <span className="text-cyan2">More names coming soon</span> — follow us to hear them first.
          </p>
        </Reveal>
      </section>

      <CtaBand
        eyebrow="Stay close"
        title="Want to hear them live?"
        subtitle="Members get first access to keynotes, sessions and the people shaping nuclear worldwide."
        primary={{ href: "/get-involved", label: "Become a member" }}
        secondary={{ href: "/events", label: "See upcoming events" }}
      />
    </>
  );
}