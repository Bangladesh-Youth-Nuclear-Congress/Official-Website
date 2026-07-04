import Link from "next/link";
import Image from "next/image";

const cols: { h: string; links: [string, string][] }[] = [
  {
    h: "Organisation",
    links: [
      ["About", "/about"],
      ["I4N 2026", "/i4n"],
      ["Events", "/events"],
      ["Speakers", "/speakers"],
    ],
  },
  {
    h: "Get Involved",
    links: [
      ["Join BYNC", "/get-involved"],
      ["Sponsors", "/sponsors"],
      ["News", "/news"],
      ["Contact", "/contact"],
    ],
  },
];

const socials: [string, string][] = [
  ["LinkedIn", "https://www.linkedin.com/company/bangladesh-youth-nuclear-congress-bync/"],
  ["Facebook", "https://www.facebook.com/profile.php?id=61577912678276"],
  ["Instagram", "https://www.instagram.com/bync.bd/"],
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg2">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <div className="flex items-center gap-2.5">
            <Image src="/assets/bync-logo.png" alt="BYNC" width={36} height={36} />
            <span className="font-display text-lg font-bold text-ink">
              BY<span className="text-cyan">NC</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Bangladesh&apos;s first youth-led nuclear organisation and the 49th national member of IYNC.
          </p>
          <div className="mt-5 flex gap-2.5">
            {socials.map(([n, u]) => (
              <a
                key={n}
                href={u}
                target="_blank"
                rel="noopener"
                aria-label={n}
                className="grid h-9 w-9 place-items-center rounded-lg border border-line text-sm font-semibold text-silver transition hover:border-line2 hover:text-cyan"
              >
                {n[0]}
              </a>
            ))}
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.h}>
            <h4 className="font-display text-sm font-semibold text-ink">{c.h}</h4>
            <ul className="mt-4 space-y-2.5">
              {c.links.map(([l, h]) => (
                <li key={l}>
                  <Link href={h} className="text-sm text-muted transition hover:text-cyan">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-6 py-5 text-xs text-muted lg:px-10">
          © {new Date().getFullYear()} Bangladesh Youth Nuclear Congress. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
