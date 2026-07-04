import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { IconMail, IconGlobe, IconPin } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact — BYNC",
  description:
    "Get in touch with Bangladesh Youth Nuclear Congress — to join, partner, compete or collaborate. Email bync.bd@gmail.com or send us a message.",
};

const socials: [string, string, string][] = [
  ["in", "LinkedIn", "https://www.linkedin.com/company/bangladesh-youth-nuclear-congress-bync/"],
  ["f", "Facebook", "https://www.facebook.com/profile.php?id=61577912678276"],
  ["◉", "Instagram", "https://www.instagram.com/bync.bd/"],
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        title={
          <>
            Let&apos;s <span className="hl">talk</span>
          </>
        }
        subtitle="Whether you want to join, partner, compete or just learn more — we'd genuinely love to hear from you."
      />

      <section className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="lg:pl-4">
            <h3 className="font-display text-lg font-semibold text-ink">Contact information</h3>

            <div className="mt-6 space-y-1">
              <div className="flex items-start gap-4 border-b border-line py-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan/10 text-cyan">
                  <IconMail width={20} height={20} />
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-ink">General enquiries</div>
                  <a href="mailto:bync.bd@gmail.com" className="text-sm text-cyan2 hover:underline">
                    bync.bd@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-line py-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan/10 text-cyan">
                  <IconGlobe width={20} height={20} />
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-ink">IYNC network</div>
                  <span className="text-sm text-muted">
                    49th national member ·{" "}
                    <a href="https://iync.org" target="_blank" rel="noopener" className="text-cyan2 hover:underline">
                      iync.org
                    </a>
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-line py-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan/10 text-cyan">
                  <IconPin width={20} height={20} />
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-ink">Based in</div>
                  <span className="text-sm text-muted">Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="font-display text-sm font-semibold text-ink">Follow us</div>
              <div className="mt-3 flex gap-2.5">
                {socials.map(([glyph, label, url]) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-lg border border-line text-sm font-semibold text-silver transition hover:border-line2 hover:text-cyan"
                  >
                    {glyph}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
