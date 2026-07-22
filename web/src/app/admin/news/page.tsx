"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase, type NewsPost } from "@/lib/supabase";
import { Btn, Empty, ErrorNote, Field, Panel, inputCls } from "@/components/admin/ui";

type Draft = Omit<NewsPost, "id"> & { id?: string };

const blank: Draft = {
  date_label: "",
  tag: "Update",
  title: "",
  body: "",
  published: true,
  sort_order: 0,
};

export default function NewsAdminPage() {
  const [rows, setRows] = useState<NewsPost[] | null>(null);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("news_posts")
      .select("*")
      .order("sort_order")
      .order("created_at", { ascending: false });
    if (error) return setError(error.message);
    setRows(data as NewsPost[]);
    setError(null);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function save() {
    if (!editing) return;
    setBusy(true);
    const { id, ...fields } = editing;
    const { error } = id
      ? await supabase.from("news_posts").update(fields).eq("id", id)
      : await supabase.from("news_posts").insert(fields);
    setBusy(false);
    if (error) return setError(error.message);
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this news post?")) return;
    const { error } = await supabase.from("news_posts").delete().eq("id", id);
    if (error) return setError(error.message);
    load();
  }

  async function togglePublished(post: NewsPost) {
    const { error } = await supabase
      .from("news_posts")
      .update({ published: !post.published })
      .eq("id", post.id);
    if (error) return setError(error.message);
    setRows((r) =>
      r?.map((x) => (x.id === post.id ? { ...x, published: !post.published } : x)) ?? null
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">News</h1>
          <p className="mt-1 text-sm text-muted">
            Posts shown on the News page, newest first. Lower sort order appears higher.
          </p>
        </div>
        <Btn onClick={() => setEditing({ ...blank })}>New post</Btn>
      </div>

      {error && <ErrorNote>{error}</ErrorNote>}

      {editing && (
        <Panel title={editing.id ? "Edit post" : "New post"}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Date label" hint="Free text, e.g. “June 2026”">
              <input
                value={editing.date_label}
                onChange={(e) => setEditing({ ...editing, date_label: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label="Tag" hint="Milestone, Keynote, Programme…">
              <input
                value={editing.tag}
                onChange={(e) => setEditing({ ...editing, tag: e.target.value })}
                className={inputCls}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Title">
                <input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className={inputCls}
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Body">
                <textarea
                  rows={4}
                  value={editing.body}
                  onChange={(e) => setEditing({ ...editing, body: e.target.value })}
                  className={`${inputCls} resize-y`}
                />
              </Field>
            </div>
            <Field label="Sort order">
              <input
                type="number"
                value={editing.sort_order}
                onChange={(e) =>
                  setEditing({ ...editing, sort_order: Number(e.target.value) || 0 })
                }
                className={inputCls}
              />
            </Field>
            <label className="flex items-end gap-2 pb-2 text-sm text-silver">
              <input
                type="checkbox"
                checked={editing.published}
                onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                className="h-4 w-4 accent-[#2563EB]"
              />
              Published
            </label>
          </div>
          <div className="mt-5 flex gap-2 border-t border-line pt-4">
            <Btn onClick={save} disabled={busy || !editing.title.trim()}>
              {busy ? "Saving…" : "Save post"}
            </Btn>
            <Btn variant="ghost" onClick={() => setEditing(null)}>
              Cancel
            </Btn>
          </div>
        </Panel>
      )}

      {rows === null && !error && <p className="text-sm text-muted">Loading…</p>}
      {rows !== null && !rows.length && <Empty>No news posts yet.</Empty>}

      <div className="space-y-3">
        {rows?.map((post) => (
          <div
            key={post.id}
            className="flex flex-wrap items-start gap-4 rounded-2xl border border-line bg-bg3/60 p-5"
          >
            <div className="min-w-[120px]">
              <div className="font-display text-sm font-semibold text-cyan2">{post.date_label}</div>
              <span className="mt-1.5 inline-block rounded-full border border-line bg-coral/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-coral2">
                {post.tag}
              </span>
            </div>
            <div className="min-w-[240px] flex-1">
              <h3 className="font-display text-base font-semibold text-ink">{post.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{post.body}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => togglePublished(post)}
                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition ${
                  post.published
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                    : "border-line2 bg-bg2 text-muted"
                }`}
              >
                {post.published ? "Live" : "Draft"}
              </button>
              <Btn variant="ghost" onClick={() => setEditing(post)}>
                Edit
              </Btn>
              <Btn variant="danger" onClick={() => remove(post.id)}>
                Delete
              </Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
