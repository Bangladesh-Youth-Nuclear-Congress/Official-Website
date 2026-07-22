"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { IconArrow, IconFlag } from "@/components/icons";
import Particles from "@/components/home/Particles";
import Marked from "@/components/Marked";
import { useSiteContent } from "@/lib/live";

const ease = [0.22, 0.61, 0.36, 1] as const;
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

function Magnetic({ children }: { children: ReactNode }) {
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  return (
    <motion.span
      style={{ x, y, display: "inline-block" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/**
 * Bohr model of the atom: the ground-state electron (n = 1) moves at
 * v₁ = 2.18×10⁶ m/s, and every higher orbit is slower with vₙ = v₁ / n.
 *   n=1 → 2.18×10⁶   n=2 → 1.09×10⁶   n=3 → 7.27×10⁵  (m/s)
 * We can't render atomic speeds on screen, but we preserve the physics:
 * the on-screen tangential speed of each electron is kept ∝ vₙ (∝ 1/n),
 * so the time for one revolution = circumference / speed ∝ (rₙ · n).
 */
const V1 = 2.18e6; // m/s — ground-state Bohr velocity
const TIME = 16; // visual time-scale (seconds per unit of r·n)

type OrbitDef = {
  n: number;
  rvis: number; // visual orbit radius as a fraction of the box
  inset: string;
  dir: string; // keyframe class sets rotation direction
  dot: string;
  dot2?: string;
};

const orbits: OrbitDef[] = [
  {
    n: 3,
    rvis: 0.5,
    inset: "inset-0",
    dir: "animate-spin-slow",
    dot: "h-3 w-3 bg-cyan shadow-[0_0_12px_3px_rgba(98,199,242,0.5)]",
    dot2: "h-2 w-2 bg-cyan2 shadow-[0_0_9px_2px_rgba(143,216,247,0.45)]",
  },
  {
    n: 2,
    rvis: 0.36,
    inset: "inset-[14%]",
    dir: "animate-spin-rev",
    dot: "h-2.5 w-2.5 bg-cyan2 shadow-[0_0_10px_3px_rgba(143,216,247,0.5)]",
  },
  {
    n: 1,
    rvis: 0.22,
    inset: "inset-[28%]",
    dir: "animate-spin-med",
    dot: "h-2.5 w-2.5 bg-coral shadow-[0_0_11px_3px_rgba(59,130,246,0.5)]",
    dot2: "h-1.5 w-1.5 bg-coral2 shadow-[0_0_8px_2px_rgba(96,165,250,0.45)]",
  },
];

/** Electrons tracing a circular orbit; duration derived from the Bohr speed. */
function Orbit({ o }: { o: OrbitDef }) {
  const vn = V1 / o.n; // m/s (kept for clarity / future labels)
  const seconds = (TIME * o.rvis * o.n).toFixed(2); // ∝ circumference / vₙ
  return (
    <div className={`absolute ${o.inset}`} data-vn={vn}>
      <div className={`relative h-full w-full ${o.dir}`} style={{ animationDuration: `${seconds}s` }}>
        <span
          className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${o.dot}`}
        />
        {o.dot2 && (
          <span
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full ${o.dot2}`}
          />
        )}
      </div>
    </div>
  );
}

// Build-time defaults. Anything edited under /admin → Site content overrides
// these once the page hydrates; see src/lib/live.ts.
const copy = {
  "home.hero.badge": "Innoventure 2026 — 8 August 2026",
  "home.hero.title": "Powering Bangladesh's [[Nuclear Future]]",
  "home.hero.subtitle":
    "Bangladesh's first youth-led nuclear organisation — connecting the nation's brightest STEM minds to the global nuclear community as we enter the post-Rooppur era.",
  "home.stats.1.value": "49th",
  "home.stats.1.label": "IYNC member nation",
  "home.stats.2.value": "500+",
  "home.stats.2.label": "Innoventure participants",
  "home.stats.3.value": "1000+",
  "home.stats.3.label": "student engagement",
};

export default function Hero() {
  const t = useSiteContent(copy);
  const stats = [
    [t["home.stats.1.value"], t["home.stats.1.label"]],
    [t["home.stats.2.value"], t["home.stats.2.label"]],
    [t["home.stats.3.value"], t["home.stats.3.label"]],
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const sx = useSpring(mvX, { stiffness: 120, damping: 18 });
  const sy = useSpring(mvY, { stiffness: 120, damping: 18 });
  // atom drifts a little for parallax depth
  const atomX = useTransform(sx, (v) => v * 16);
  const atomY = useTransform(sy, (v) => v * 16);

  const onMove = (e: React.MouseEvent) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    mvX.set((e.clientX - r.left) / r.width - 0.5);
    mvY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-24 pb-16 sm:px-6 lg:px-10"
    >
      {/* reactor dot-grid + particle + aurora field */}
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0" />
      <Particles />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 h-[42rem] w-[42rem] rounded-full bg-cyan/15 blur-[130px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-[34rem] w-[34rem] rounded-full bg-coral/12 blur-[130px]"
        animate={{ scale: [1, 1.18, 1], opacity: [0.32, 0.5, 0.32] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-coral/40 bg-coral/10 px-3.5 py-1.5 text-xs font-semibold text-coral2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-blink rounded-full bg-coral" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
              </span>
              {t["home.hero.badge"]}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-line2 bg-cyan/5 px-3.5 py-1.5 text-xs font-semibold text-cyan2">
              <IconFlag /> Official Young Generation Network of IYNC
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 max-w-3xl text-[clamp(2.25rem,5.4vw,4.35rem)] font-semibold leading-[1.08] text-ink"
          >
            <Marked text={t["home.hero.title"]} />
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-silver">
            {t["home.hero.subtitle"]}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <Magnetic>
              <Link
                href="/get-involved"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#4C93F2] to-[#2563EB] px-7 py-3.5 font-display text-base font-semibold text-white shadow-[0_6px_18px_-10px_rgba(37,99,235,0.45)] transition hover:brightness-[1.05]"
              >
                Join the Movement <IconArrow width={18} height={18} />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/sponsors"
                className="inline-flex items-center gap-2 rounded-full border border-cyan/45 bg-cyan/15 px-7 py-3.5 font-display text-base font-semibold text-cyan2 transition hover:bg-cyan/25"
              >
                Partner With Us
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div variants={item} className="mt-12 flex flex-wrap gap-8">
            {stats.map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-2xl font-bold text-ink">{n}</div>
                <div className="mt-0.5 text-xs text-muted">{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* live reactor / atom motif (with mouse parallax) */}
        <motion.div
          className="relative mx-auto hidden aspect-square w-full max-w-md place-items-center lg:grid"
          style={{ x: atomX, y: atomY }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
        >
          {/* rotating reactor glow */}
          <div className="conic-glow animate-spin-slow absolute inset-[6%] rounded-full opacity-40 blur-2xl" />

          {/* dashed outer reactor ring (counter-rotating) */}
          <div className="animate-spin-rev absolute -inset-[4%] rounded-full border border-dashed border-line2/50" />

          {/* orbital rings */}
          <div className="absolute inset-0 rounded-full border border-line" />
          <div className="absolute inset-[14%] rounded-full border border-line2" />
          <div className="absolute inset-[28%] rounded-full border border-coral/25" />

          {/* electrons — speeds from the Bohr model (vₙ = v₁/n) */}
          {orbits.map((o) => (
            <Orbit key={o.n} o={o} />
          ))}

          {/* pulsing core */}
          <div className="absolute inset-[20%] animate-pulse rounded-full bg-cyan/12 blur-2xl" />
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <Image
              src="/assets/bync-logo.png"
              alt="BYNC emblem"
              width={300}
              height={300}
              priority
              className="drop-shadow-[0_0_34px_rgba(98,199,242,0.4)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
