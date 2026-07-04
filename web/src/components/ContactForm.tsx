"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { IconArrow } from "@/components/icons";

const subjects = [
  "Membership / Join BYNC",
  "I4N Competition 2026",
  "Sponsorship / Partnership Inquiry",
  "Media / Press",
  "General Inquiry",
];

const field =
  "w-full rounded-lg border border-line bg-bg3/80 px-3.5 py-3 text-sm text-ink placeholder:text-muted/70 transition focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20";
const labelCls = "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted";

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  // Preselect subject from ?subject= without needing Suspense.
  useEffect(() => {
    const sub = new URLSearchParams(window.location.search).get("subject");
    if (sub && selectRef.current && subjects.includes(sub)) selectRef.current.value = sub;
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        form.reset();
        setStatus({
          type: "ok",
          msg: "Thank you! Your message is on its way to BYNC — we'll be in touch shortly.",
        });
      } else {
        throw new Error();
      }
    } catch {
      setStatus({ type: "err", msg: "couldn't-send" });
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-bg3/40 p-7">
      <input type="hidden" name="access_key" value="cb604bf8-f59d-4fb9-95a6-26930ea1aae2" />
      <input type="hidden" name="from_name" value="BYNC Website" />
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>Full name</label>
          <input id="name" name="name" type="text" required placeholder="Your name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>Email address</label>
          <input id="email" name="email" type="email" required placeholder="you@email.com" className={field} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="organisation" className={labelCls}>Organisation</label>
        <input id="organisation" name="organisation" type="text" placeholder="Company / university (optional)" className={field} />
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className={labelCls}>Subject</label>
        <select id="subject" name="subject" ref={selectRef} className={field} defaultValue={subjects[4]}>
          {subjects.map((s) => (
            <option key={s} value={s} className="bg-bg2">
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelCls}>Message</label>
        <textarea id="message" name="message" required rows={5} placeholder="Tell us how we can help…" className={`${field} resize-y`} />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#FF8163] to-[#EE5A38] px-7 py-3.5 font-display font-semibold text-[#15110c] transition hover:brightness-[1.05] disabled:opacity-70"
      >
        {sending ? "Sending…" : "Send message"} {!sending && <IconArrow width={18} height={18} />}
      </button>

      {status?.type === "ok" && (
        <p className="mt-4 rounded-lg border border-emerald-400/35 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200" role="status">
          ✅ {status.msg}
        </p>
      )}
      {status?.type === "err" && (
        <p className="mt-4 rounded-lg border border-red-400/35 bg-red-400/10 px-4 py-3 text-sm text-red-200" role="status">
          ⚠️ Couldn&apos;t send just now. Please email us directly at{" "}
          <a href="mailto:bync.bd@gmail.com" className="underline">bync.bd@gmail.com</a>.
        </p>
      )}

      <p className="mt-4 text-xs text-muted">
        Submissions are emailed straight to BYNC. Prefer email? Write to{" "}
        <a href="mailto:bync.bd@gmail.com" className="text-cyan2 hover:underline">bync.bd@gmail.com</a>.
      </p>
    </form>
  );
}
