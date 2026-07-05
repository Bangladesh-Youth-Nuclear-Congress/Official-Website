import Link from "next/link";
import Hero from "@/components/home/Hero";
import Ticker from "@/components/home/Ticker";
import Pillars from "@/components/home/Pillars";
import NuclearEra from "@/components/home/NuclearEra";
import Divider from "@/components/Divider";
import Reveal from "@/components/Reveal";
import { IconArrow } from "@/components/icons";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Pillars />
      <NuclearEra />
      <Divider />

      <section className="px-6 py-20 lg:px-10">
        <Reveal className="relative mx-auto max-w-[1100px] overflow-hidden rounded-3xl border border-line2 bg-gradient-to-br from-bg3 to-bg2 p-10 text-center md:p-16">
          {/* reactor accents */}
          <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="conic-glow animate-spin-slow pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
          />

          <div className="relative">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-coral">
              Your move
            </span>
            <h2 className="mx-auto mt-3 max-w-2xl text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-ink">
              Bangladesh&apos;s nuclear story needs more authors
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-silver">
              Whether you&apos;re a student ready to compete or an organisation ready to back the
              movement, there&apos;s a seat at this table with your name on it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/get-involved"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#4C93F2] to-[#2563EB] px-7 py-3.5 font-display font-semibold text-white shadow-[0_6px_18px_-10px_rgba(37,99,235,0.45)] transition hover:brightness-[1.05]"
              >
                Join BYNC <IconArrow width={18} height={18} />
              </Link>
              <Link
                href="/sponsors"
                className="inline-flex items-center gap-2 rounded-full border border-cyan/45 bg-cyan/15 px-7 py-3.5 font-display font-semibold text-cyan2 transition hover:bg-cyan/25"
              >
                Become a Partner
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
