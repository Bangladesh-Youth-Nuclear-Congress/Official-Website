import Link from "next/link";
import Hero from "@/components/home/Hero";
import Pillars from "@/components/home/Pillars";
import Reveal from "@/components/Reveal";
import { IconArrow } from "@/components/icons";

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />

      <section className="px-6 py-20 lg:px-10">
        <Reveal className="mx-auto max-w-[1100px] overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-bg3 to-bg2 p-10 text-center md:p-16">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-ink">
            Be part of Bangladesh&apos;s nuclear story
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-silver">
            Whether you&apos;re a student ready to compete or an organisation ready to back the
            movement — there&apos;s a place for you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/get-involved"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-coral px-7 py-3.5 font-display font-semibold text-bg"
            >
              Join BYNC <IconArrow width={18} height={18} />
            </Link>
            <Link
              href="/sponsors"
              className="inline-flex items-center gap-2 rounded-full border border-line2 px-7 py-3.5 font-display font-semibold text-cyan2 transition hover:bg-cyan/10"
            >
              Become a Partner
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
