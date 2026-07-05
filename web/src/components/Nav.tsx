"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/i4n", label: "I4N" },
  { href: "/events", label: "Events" },
  { href: "/speakers", label: "Speakers" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/assets/bync-logo.png" alt="BYNC" width={34} height={34} priority />
          <span className="font-display text-lg font-bold tracking-wide text-ink">
            BY<span className="text-cyan">NC</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-silver transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          href="/get-involved"
          className="hidden rounded-full bg-gradient-to-br from-[#FF8163] to-[#EE5A38] px-5 py-2 text-sm font-semibold text-[#15110c] transition hover:brightness-105 lg:inline-block"
        >
          Join BYNC
        </Link>

        <button
          className="text-2xl leading-none text-ink lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "×" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="flex flex-col border-t border-line bg-bg2 px-6 py-3 lg:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="py-2.5 text-silver" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link
            href="/get-involved"
            className="mt-2 rounded-full bg-gradient-to-br from-[#FF8163] to-[#EE5A38] px-5 py-2.5 text-center text-sm font-semibold text-[#15110c]"
            onClick={() => setOpen(false)}
          >
            Join BYNC
          </Link>
        </div>
      )}
    </header>
  );
}
