import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { IconTarget, IconEye, IconCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: "About — BYNC",
  description:
    "Bangladesh Youth Nuclear Congress (BYNC) — founded June 2025, Bangladesh's first youth-led nuclear organisation and the 49th national member of IYNC. Our mission, values, ecosystem and team.",
};

const values = [
  ["Knowledge Transfer", "Bridging senior scientists and the next generation through workshops, talks and IYNC programming."],
  ["Peaceful Nuclear Use", "Advocating strictly for civilian, clean-energy applications of nuclear science."],
  ["Global Representation", "Giving Bangladesh a clear, professional voice in the international youth nuclear network."],
  ["Innovation & SDGs", "Running I4N to push student-led nuclear problem-solving onto the global stage."],
];

const ecosystem: [string, string[]][] = [
  ["Academic", ["Dhaka University", "MIST", "BUET (INPE)"]],
  ["Government & Regulatory", ["BAEC", "BAERA", "NPCBL — Rooppur"]],
  ["International", ["IYNC", "Russian House Dhaka", "Rosatom"]],
];

const team = [
  { img: "/assets/team/sami.jpg", n: "Mhamudul Hasan Sami", r: "Founder & President" },
  { img: "/assets/team/sadia.jpg", n: "Sadia Noushin Promi", r: "Co-founder & Vice President" },
  { img: "/assets/team/nazifa.jpg", n: "Nazifa Tasnim", r: "Co-founder & General Secretary" },
  {
    img: "/assets/team/shafiq.jpg",
    n: "Prof. Dr. MD Shafiqul Islam",
    r: "Chief Advisor",
    o: "Ex-Director, BAEC · Nuclear Engineering, Dhaka University",
  },
  { img: "/assets/team/zareen.jpg", n: "Zareen Tahsin Anjum", r: "Treasurer" },
  { img: "/assets/team/fahim.jpg", n: "Fahim Sabab Siddique", r: "Advisor" },
  { img: "/assets/team/tamim.jpg", n: "Tamim Muhammad Rayeed", r: "Webmaster & Developer" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        title={
          <>
            We&apos;re building the people behind <span className="hl">the reactors</span>
          </>
        }
        subtitle="Founded in June 2025, Bangladesh Youth Nuclear Congress is the country's first and only youth-led nuclear organisation — and the official national partner of IYNC."
      />

      {/* origin */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="text-xl leading-relaxed text-silver">
            BYNC started with a simple frustration: Bangladesh was building reactors faster than it
            was building the people to run them. So in 2025, a handful of students at MIST and Dhaka
            University decided to do something about it — and within months we became the{" "}
            <span className="text-cyan2">49th national member of IYNC</span>, the global network of
            young nuclear professionals.
          </p>
        </Reveal>

        {/* mission + vision */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal className="relative overflow-hidden rounded-2xl border border-line2 bg-gradient-to-br from-bg3 to-bg2 p-8">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-cyan/10 text-cyan">
              <IconTarget width={24} height={24} />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-ink">Our Mission</h3>
            <p className="mt-3 leading-relaxed text-silver">
              To unite, empower and internationally represent the young generation of nuclear
              scientists and students in Bangladesh — working where nuclear innovation, youth
              empowerment and the UN Sustainable Development Goals meet.
            </p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="relative overflow-hidden rounded-2xl border border-line bg-bg3/60 p-8"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-coral/10 text-coral">
              <IconEye width={24} height={24} />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-ink">Our Vision</h3>
            <p className="mt-3 leading-relaxed text-silver">
              A Bangladesh where a skilled, globally-connected youth nuclear community drives the
              country&apos;s clean-energy transition — and leads the post-Rooppur future on the world
              stage.
            </p>
          </Reveal>
        </div>

        {/* banner */}
        <Reveal delay={0.1} className="mt-8 overflow-hidden rounded-3xl border border-line">
          <Image
            src="/assets/bync-banner.jpg"
            alt="Bangladesh Youth Nuclear Congress"
            width={1600}
            height={520}
            className="h-auto w-full object-cover"
          />
        </Reveal>
      </section>

      {/* values */}
      <section className="border-y border-line bg-bg2/40">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
          <SectionHeading eyebrow="What we stand for" title="Four things we won't compromise on" />
          <div className="mt-12 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {values.map(([t, d], i) => (
              <Reveal
                key={t}
                delay={i * 0.06}
                className="flex gap-4 border-b border-line py-5"
              >
                <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-cyan/10 text-cyan">
                  <IconCheck width={16} height={16} />
                </div>
                <div>
                  <h4 className="font-display text-base font-semibold text-ink">{t}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ecosystem */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
        <SectionHeading
          eyebrow="Who stands with us"
          title="An ecosystem, not an island"
          subtitle="We work hand-in-hand with the institutions shaping Bangladesh's nuclear era — and the global network beyond it."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ecosystem.map(([group, items], i) => (
            <Reveal
              key={group}
              delay={i * 0.08}
              className="rounded-2xl border border-line bg-bg3/60 p-7"
            >
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">{group}</h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {items.map((it) => (
                  <span
                    key={it}
                    className="rounded-lg border border-line bg-bg2/60 px-3 py-1.5 text-sm text-silver"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* team */}
      <section className="border-t border-line bg-bg2/40">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
          <SectionHeading
            eyebrow="The people behind BYNC"
            title="A student-led team, guided by senior nuclear academics"
            center
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal
                key={m.n}
                delay={i * 0.06}
                className="group overflow-hidden rounded-2xl border border-line bg-bg3/60 text-center transition-colors hover:border-line2"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={m.img}
                    alt={m.n}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg3 via-bg3/10 to-transparent" />
                </div>
                <div className="px-6 pb-7 pt-5">
                  <h4 className="font-display text-base font-semibold text-ink">{m.n}</h4>
                  <p className="mt-1 text-sm text-cyan2">{m.r}</p>
                  {m.o && <p className="mt-1 text-xs leading-relaxed text-muted">{m.o}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Your move"
        title="Want to be part of the story?"
        subtitle="Students, young professionals and organisations all have a place in what we're building."
        primary={{ href: "/get-involved", label: "Join BYNC" }}
        secondary={{ href: "/contact", label: "Talk to us" }}
      />
    </>
  );
}
