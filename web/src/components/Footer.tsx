import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

const columns: { heading: string; links: [string, string][] }[] = [
  {
    heading: "Explore",
    links: [
      ["About", "/about"],
      ["I4N Bangladesh", "/i4n"],
      ["Events", "/events"],
      ["Get Involved", "/get-involved"],
    ],
  },
  {
    heading: "Programs",
    links: [
      ["Partner With Us", "/sponsors"],
      ["I4N 2026", "/i4n"],
      ["IYNC Delegation", "/events"],
      ["Contact", "/contact"],
    ],
  },
  {
    heading: "Connect",
    links: [
      ["LinkedIn", "https://www.linkedin.com/company/bangladesh-youth-nuclear-congress-bync/"],
      ["Facebook", "https://www.facebook.com/profile.php?id=61577912678276"],
      ["Instagram", "https://www.instagram.com/bync.bd/"],
    ],
  },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/bangladesh-youth-nuclear-congress-bync/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="currentColor">
        <path d="M6.94 8.98H3.56V20h3.38V8.98ZM5.25 4a1.96 1.96 0 1 0 0 3.92A1.96 1.96 0 0 0 5.25 4Zm6.98 4.98H8.99V20h3.24v-5.78c0-1.52.29-2.99 2.17-2.99 1.86 0 1.89 1.74 1.89 3.09V20h3.25v-6.4c0-3.14-.68-5.55-4.35-5.55-1.76 0-2.94.97-3.43 1.88h-.05v-.95Z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61577912678276",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="currentColor">
        <path d="M14.2 8.4V6.8c0-.77.51-.95.87-.95h2.22V2.14L14.22 2.13c-3.41 0-4.18 2.55-4.18 4.18V8.4H7.36v3.82h2.68V22h4.16v-9.78h3.07l.4-3.82H14.2Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/bync.bd/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="4" width="16" height="16" rx="4.5" />
        <circle cx="12" cy="12" r="3.4" />
        <circle cx="16.7" cy="7.3" r=".8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  const className = "block py-1.5 text-[13.5px] text-muted transition hover:text-cyan";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-line bg-[#05090f] px-4 pb-7 pt-14 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image src="/assets/bync-logo.png" alt="BYNC" width={36} height={36} />
              <span className="font-display text-lg font-bold text-ink">
                BY<span className="text-cyan">NC</span>
              </span>
            </Link>
            <p className="mt-4 max-w-[260px] text-[13px] leading-relaxed text-muted">
              Bangladesh Youth Nuclear Congress - Bangladesh&apos;s first youth-led nuclear
              organisation and the 49th national member of IYNC.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <h4 className="mb-3.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-cyan2">
                {column.heading}
              </h4>
              <div>
                {column.links.map(([label, href]) => (
                  <FooterLink key={label} href={href}>
                    {label}
                  </FooterLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
          <p className="text-xs text-muted/70">
            &copy; {new Date().getFullYear()} Bangladesh Youth Nuclear Congress. All rights reserved.
          </p>
          <div className="flex gap-2.5">
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
                aria-label={label}
                className="grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-line bg-cyan/5 text-sm font-bold text-silver transition hover:-translate-y-0.5 hover:border-line2 hover:bg-cyan/15 hover:text-cyan"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
