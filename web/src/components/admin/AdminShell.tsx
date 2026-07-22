"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { Btn, ErrorNote, Field, inputCls } from "./ui";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/registrations", label: "Registrations" },
  { href: "/admin/submissions", label: "Messages" },
  { href: "/admin/members", label: "Members" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/content", label: "Site content" },
  { href: "/admin/media", label: "Media" },
];

type AuthState =
  | { phase: "loading" }
  | { phase: "signed-out" }
  | { phase: "not-admin"; email: string }
  | { phase: "ready"; session: Session };

export default function AdminShell({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ phase: "loading" });
  const pathname = usePathname() || "/admin";

  // Membership of `admins` is the real gate — a valid session is not enough.
  // RLS would block everything anyway, but checking here lets us say why.
  const resolve = useCallback(async (session: Session | null) => {
    if (!session) return setState({ phase: "signed-out" });
    const { data, error } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", session.user.id)
      .maybeSingle();
    if (error || !data) {
      return setState({ phase: "not-admin", email: session.user.email ?? "" });
    }
    setState({ phase: "ready", session });
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => resolve(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      resolve(session);
    });
    return () => sub.subscription.unsubscribe();
  }, [resolve]);

  if (state.phase === "loading") {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-muted">Checking session…</div>
    );
  }

  if (state.phase === "signed-out") return <SignIn />;

  if (state.phase === "not-admin") {
    return (
      <div className="mx-auto grid min-h-screen max-w-md place-items-center px-6">
        <div className="w-full space-y-4 text-center">
          <ErrorNote>
            <strong>{state.email}</strong> is signed in, but is not an administrator of this site.
          </ErrorNote>
          <Btn variant="ghost" onClick={() => supabase.auth.signOut()}>
            Sign out
          </Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <Image src="/assets/bync-logo.png" alt="BYNC" width={32} height={32} />
            <span className="font-display text-sm font-bold text-ink">
              BY<span className="text-cyan">NC</span>
              <span className="ml-2 font-normal text-muted">admin</span>
            </span>
          </Link>

          <nav className="order-3 -mx-1 flex w-full gap-1 overflow-x-auto sm:order-none sm:mx-0 sm:w-auto sm:flex-1">
            {nav.map((n) => {
              const active = n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={cn(
                    "whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition",
                    active ? "bg-cyan/12 text-cyan2" : "text-silver hover:bg-bg2 hover:text-ink"
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-3">
            <span className="hidden text-xs text-muted md:inline">{state.session.user.email}</span>
            <Btn variant="ghost" onClick={() => supabase.auth.signOut()}>
              Sign out
            </Btn>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/admin/` },
    });
    setBusy(false);
    if (error) setError(error.message);
    else setSent(true);
  }

  return (
    <div className="grid min-h-screen place-items-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-3">
          <Image src="/assets/bync-logo.png" alt="BYNC" width={44} height={44} />
          <span className="font-display text-xl font-bold text-ink">
            BY<span className="text-cyan">NC</span>
            <span className="ml-2 text-base font-normal text-muted">admin</span>
          </span>
        </div>

        {sent ? (
          <div className="rounded-2xl border border-line bg-bg3/60 p-6 text-center">
            <p className="text-sm text-silver">
              A sign-in link is on its way to <strong className="text-ink">{email}</strong>. Open it
              on this device — the link expires shortly.
            </p>
            <Btn variant="ghost" className="mt-5" onClick={() => setSent(false)}>
              Use a different address
            </Btn>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 rounded-2xl border border-line bg-bg3/60 p-6">
            <Field label="Email address" hint="Only allowlisted BYNC addresses can sign in.">
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputCls}
              />
            </Field>
            {error && <ErrorNote>{error}</ErrorNote>}
            <Btn type="submit" disabled={busy} className="w-full">
              {busy ? "Sending…" : "Email me a sign-in link"}
            </Btn>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-muted">
          <Link href="/" className="hover:text-cyan">
            ← Back to byncbd.org
          </Link>
        </p>
      </div>
    </div>
  );
}
