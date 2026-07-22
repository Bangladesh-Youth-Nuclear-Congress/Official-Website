"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Badge, Btn, Empty, ErrorNote, Panel, downloadCsv, formatDate, inputCls } from "./ui";
import { cn } from "@/lib/cn";

type Row = Record<string, unknown> & { id: string; status: string; created_at: string };

export type InboxConfig = {
  /** Postgres table name. */
  table: string;
  title: string;
  /** Allowed values of `status`, in the order they should appear as filters. */
  statuses: string[];
  /** Columns shown in the list. */
  columns: { key: string; label: string; className?: string }[];
  /** Extra fields revealed when a row is expanded. */
  details: { key: string; label: string }[];
  /** Field searched by the search box, plus email. */
  searchKeys: string[];
  csvName: string;
  emptyLabel: string;
};

export default function InboxView({ config }: { config: InboxConfig }) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from(config.table)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else {
      setRows(data as Row[]);
      setError(null);
    }
  }, [config.table]);

  useEffect(() => {
    load();
  }, [load]);

  async function setStatus(id: string, status: string) {
    setBusy(id);
    const { error } = await supabase.from(config.table).update({ status }).eq("id", id);
    setBusy(null);
    if (error) return setError(error.message);
    setRows((r) => r?.map((x) => (x.id === id ? { ...x, status } : x)) ?? null);
  }

  async function remove(id: string) {
    if (!confirm("Delete this entry permanently? This cannot be undone.")) return;
    setBusy(id);
    const { error } = await supabase.from(config.table).delete().eq("id", id);
    setBusy(null);
    if (error) return setError(error.message);
    setRows((r) => r?.filter((x) => x.id !== id) ?? null);
  }

  const visible = useMemo(() => {
    if (!rows) return [];
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (!q) return true;
      return config.searchKeys.some((k) => String(r[k] ?? "").toLowerCase().includes(q));
    });
  }, [rows, filter, query, config.searchKeys]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows?.length ?? 0 };
    for (const s of config.statuses) c[s] = rows?.filter((r) => r.status === s).length ?? 0;
    return c;
  }, [rows, config.statuses]);

  return (
    <Panel
      title={config.title}
      action={
        <div className="flex gap-2">
          <Btn variant="ghost" onClick={load}>
            Refresh
          </Btn>
          <Btn
            variant="ghost"
            disabled={!visible.length}
            onClick={() => downloadCsv(`${config.csvName}-${Date.now()}.csv`, visible)}
          >
            Export CSV
          </Btn>
        </div>
      }
    >
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {["all", ...config.statuses].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-semibold capitalize transition",
              filter === s
                ? "border-cyan/50 bg-cyan/12 text-cyan2"
                : "border-line text-muted hover:border-line2 hover:text-silver"
            )}
          >
            {s} <span className="opacity-60">{counts[s] ?? 0}</span>
          </button>
        ))}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          className={cn(inputCls, "ml-auto max-w-[220px]")}
        />
      </div>

      {error && <ErrorNote>{error}</ErrorNote>}

      {rows === null && !error && <p className="text-sm text-muted">Loading…</p>}

      {rows !== null && !visible.length && <Empty>{config.emptyLabel}</Empty>}

      {visible.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-[0.1em] text-muted">
                {config.columns.map((c) => (
                  <th key={c.key} className={cn("px-3 py-2.5 font-semibold", c.className)}>
                    {c.label}
                  </th>
                ))}
                <th className="px-3 py-2.5 font-semibold">Status</th>
                <th className="px-3 py-2.5 font-semibold">Received</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <Fragment key={r.id}>
                  <tr
                    onClick={() => setOpen(open === r.id ? null : r.id)}
                    className="cursor-pointer border-b border-line/60 transition hover:bg-bg2/60"
                  >
                    {config.columns.map((c) => (
                      <td key={c.key} className={cn("px-3 py-3 text-silver", c.className)}>
                        {String(r[c.key] ?? "—")}
                      </td>
                    ))}
                    <td className="px-3 py-3">
                      <Badge value={r.status} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-xs text-muted">
                      {formatDate(r.created_at)}
                    </td>
                    <td className="px-3 py-3 text-right text-xs text-muted">
                      {open === r.id ? "▲" : "▼"}
                    </td>
                  </tr>

                  {open === r.id && (
                    <tr className="border-b border-line/60 bg-bg2/40">
                      <td colSpan={config.columns.length + 3} className="px-3 py-5">
                        <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                          {config.details.map((d) => (
                            <div key={d.key}>
                              <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                                {d.label}
                              </dt>
                              <dd className="mt-1 whitespace-pre-wrap text-sm text-silver">
                                {String(r[d.key] ?? "—")}
                              </dd>
                            </div>
                          ))}
                        </dl>

                        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4">
                          <span className="text-xs uppercase tracking-[0.1em] text-muted">
                            Set status
                          </span>
                          {config.statuses.map((s) => (
                            <Btn
                              key={s}
                              variant={r.status === s ? "primary" : "ghost"}
                              disabled={busy === r.id}
                              onClick={() => setStatus(r.id, s)}
                              className="capitalize"
                            >
                              {s}
                            </Btn>
                          ))}
                          <Btn
                            variant="danger"
                            disabled={busy === r.id}
                            className="ml-auto"
                            onClick={() => remove(r.id)}
                          >
                            Delete
                          </Btn>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  );
}
