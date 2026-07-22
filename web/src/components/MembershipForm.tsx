"use client";

import { useState, type FormEvent } from "react";
import { IconArrow } from "@/components/icons";
import { supabase } from "@/lib/supabase";

const interests = [
  "Student Member",
  "Young Professional",
  "Volunteering with BYNC",
  "Research collaboration",
  "Institutional partnership",
];

const field =
  "w-full rounded-lg border border-line bg-bg3/80 px-3.5 py-3 text-sm text-ink placeholder:text-muted/70 transition focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20";
const labelCls = "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted";

export default function MembershipForm() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"ok" | "err" | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("botcheck")) {
      form.reset();
      setStatus("ok");
      return;
    }

    setSending(true);
    setStatus(null);
    const str = (k: string) => String(data.get(k) ?? "").trim();

    const { error } = await supabase.from("members").insert({
      full_name: str("full_name"),
      email: str("email"),
      phone: str("phone") || null,
      institution: str("institution") || null,
      interest: str("interest") || null,
      message: str("message") || null,
    });

    setSending(false);
    if (error) {
      setStatus("err");
    } else {
      form.reset();
      setStatus("ok");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-bg3/40 p-7">
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="m-name" className={labelCls}>Full name</label>
          <input id="m-name" name="full_name" type="text" required placeholder="Your name" className={field} />
        </div>
        <div>
          <label htmlFor="m-email" className={labelCls}>Email address</label>
          <input id="m-email" name="email" type="email" required placeholder="you@email.com" className={field} />
        </div>
        <div>
          <label htmlFor="m-phone" className={labelCls}>Phone</label>
          <input id="m-phone" name="phone" type="tel" placeholder="01XXXXXXXXX (optional)" className={field} />
        </div>
        <div>
          <label htmlFor="m-institution" className={labelCls}>Institution</label>
          <input id="m-institution" name="institution" type="text" placeholder="University / organisation" className={field} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="m-interest" className={labelCls}>I&apos;m joining as</label>
        <select id="m-interest" name="interest" className={field} defaultValue={interests[0]}>
          {interests.map((i) => (
            <option key={i} value={i} className="bg-bg2">
              {i}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="m-message" className={labelCls}>Anything else?</label>
        <textarea
          id="m-message"
          name="message"
          rows={4}
          placeholder="Your field of study, what you'd like to work on with BYNC… (optional)"
          className={`${field} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#4C93F2] to-[#2563EB] px-7 py-3.5 font-display font-semibold text-white transition hover:brightness-[1.05] disabled:opacity-70"
      >
        {sending ? "Sending…" : "Submit application"} {!sending && <IconArrow width={18} height={18} />}
      </button>

      {status === "ok" && (
        <p className="mt-4 rounded-lg border border-emerald-400/35 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200" role="status">
          ✅ Application received — welcome aboard. BYNC will be in touch by email.
        </p>
      )}
      {status === "err" && (
        <p className="mt-4 rounded-lg border border-red-400/35 bg-red-400/10 px-4 py-3 text-sm text-red-200" role="status">
          ⚠️ Couldn&apos;t submit just now. Please email us at{" "}
          <a href="mailto:bync.bd@gmail.com" className="underline">bync.bd@gmail.com</a>.
        </p>
      )}

      <p className="mt-4 text-xs text-muted">
        Membership is free. We only use your details to contact you about BYNC.
      </p>
    </form>
  );
}
