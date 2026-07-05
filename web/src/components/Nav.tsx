"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/i4n", label: "I4N" },
  { href: "/events", label: "Events" },
  { href: "/speakers", label: "Activities" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname.replace(/^\/Official-Website/, "") || "/";
  const isActive = (href: string) => href === "/" ? currentPath === "/" : currentPath === href || currentPath.startsWith(`${href}/`);

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
          <Image src="/Official-Website/assets/bync-logo.png" alt="BYNC" width={34} height={34} priority />
          <span className="font-display text-sm font-semibold text-ink sm:text-base">
            Bangladesh Youth Nuclear Congress <span className="text-cyan">(BYNC)</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "relative py-5 text-sm transition-colors after:absolute after:inset-x-0 after:bottom-3 after:h-0.5 after:origin-center after:rounded-full after:bg-cyan after:transition-transform",
                isActive(l.href)
                  ? "text-ink after:scale-x-100"
                  : "text-silver after:scale-x-0 hover:text-ink hover:after:scale-x-100"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          href="/get-involved"
          className="hidden rounded-full bg-gradient-to-br from-[#4C93F2] to-[#2563EB] px-5 py-2 text-sm font-semibold text-white transition hover:brightness-105 lg:inline-block"
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
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "border-l-2 py-2.5 pl-3 transition-colors",
                isActive(l.href) ? "border-cyan text-ink" : "border-transparent text-silver"
              )}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/get-involved"
            className="mt-2 rounded-full bg-gradient-to-br from-[#4C93F2] to-[#2563EB] px-5 py-2.5 text-center text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Join BYNC
          </Link>
        </div>
      )}
    </header>
  );
}
