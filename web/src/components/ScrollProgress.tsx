"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[80] h-[3px] w-full origin-left bg-gradient-to-r from-cyan via-cyan2 to-coral shadow-[0_0_12px_rgba(79,195,247,0.6)]"
    />
  );
}
