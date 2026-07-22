"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase, type SiteContent } from "@/lib/supabase";
import { Btn, Empty, ErrorNote, Panel, inputCls } from "@/components/admin/ui";

export default function ContentPage() {
  const [rows, setRows] = useState<SiteContent[] | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("site_content")
      .select("key, value, label, group")
      .order("group")
      .order("key");
    if (error) return setError(error.message);
    setRows(data as SiteContent[]);
    setDraft(Object.fromEntries((data as SiteContent[]).map((r) => [r.key, r.value])));
    setError(null);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const groups = useMemo(() => {
    const g = new Map<string, SiteContent[]>();
    for (const r of rows ?? []) {
      const list = g.get(r.group) ?? [];
      list.push(r);
      g.set(r.group, list);
    }
    return [...g.entries()];
  }, [rows]);

  async function save(key: string) {
    setSaving(key);
    const { error } = await supabase
      .from("site_content")
      .update({ value: draft[key] })
      .eq("key", key);
    setSaving(null);
    if (error) return setError(error.message);
    setRows((r) => r?.map((x) => (x.key === key ? { ...x, value: draft[key] } : x)) ?? null);
    setSaved(key);
    setTimeout(() => setSaved((s) => (s === key ? null : s)), 2000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Site content</h1>
        <p className="mt-1 text-sm text-muted">
          Text used across byncbd.org. Changes go live as soon as you save.
        </p>
      </div>

      {error && <ErrorNote>{error}</ErrorNote>}
      {rows === null && !error && <p className="text-sm text-muted">Loading…</p>}
      {rows !== null && !rows.length && <Empty>No editable content defined yet.</Empty>}

      {groups.map(([group, items]) => (
        <Panel key={group} title={group}>
          <div className="space-y-5">
            {items.map((item) => {
              const dirty = draft[item.key] !== item.value;
              const long = item.value.length > 90;
              return (
                <div key={item.key}>
                  <div className="mb-1.5 flex items-baseline justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                      {item.label ?? item.key}
                    </span>
                    <code className="text-[11px] text-muted/60">{item.key}</code>
                  </div>
                  {long ? (
                    <textarea
                      rows={3}
                      value={draft[item.key] ?? ""}
                      onChange={(e) => setDraft({ ...draft, [item.key]: e.target.value })}
                      className={`${inputCls} resize-y`}
                    />
                  ) : (
                    <input
                      value={draft[item.key] ?? ""}
                      onChange={(e) => setDraft({ ...draft, [item.key]: e.target.value })}
                      className={inputCls}
                    />
                  )}
                  <div className="mt-2 flex items-center gap-3">
                    <Btn disabled={!dirty || saving === item.key} onClick={() => save(item.key)}>
                      {saving === item.key ? "Saving…" : "Save"}
                    </Btn>
                    {dirty && (
                      <Btn
                        variant="ghost"
                        onClick={() => setDraft({ ...draft, [item.key]: item.value })}
                      >
                        Revert
                      </Btn>
                    )}
                    {saved === item.key && <span className="text-xs text-emerald-300">Saved</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      ))}
    </div>
  );
}
