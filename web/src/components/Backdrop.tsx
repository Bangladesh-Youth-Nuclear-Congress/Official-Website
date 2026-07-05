"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Fixed, full-viewport ambient layer that sits behind all page content.
 * Because it's `fixed`, the drifting glow stays alive on every section as
 * you scroll — giving the lower parts of the page motion too.
 */
export default function Backdrop() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* static base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(79,195,247,0.10),transparent_42%),radial-gradient(circle_at_85%_85%,rgba(59,130,246,0.08),transparent_45%)]" />

      {/* slowly panning reactor grid */}
      <motion.div
        className="dot-grid absolute -inset-[20%] opacity-50"
        animate={reduce ? undefined : { x: [0, 28, 0], y: [0, 18, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* drifting aurora blobs */}
      <motion.div
        className="absolute left-[8%] top-[14%] h-[42rem] w-[42rem] rounded-full bg-cyan/10 blur-[150px]"
        animate={reduce ? undefined : { x: [0, 90, -40, 0], y: [0, -60, 50, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[6%] top-[48%] h-[36rem] w-[36rem] rounded-full bg-coral/10 blur-[150px]"
        animate={reduce ? undefined : { x: [0, -80, 30, 0], y: [0, 60, -30, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[6%] left-[40%] h-[32rem] w-[32rem] rounded-full bg-cyan2/10 blur-[150px]"
        animate={reduce ? undefined : { x: [0, 50, -50, 0], y: [0, -40, 30, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
