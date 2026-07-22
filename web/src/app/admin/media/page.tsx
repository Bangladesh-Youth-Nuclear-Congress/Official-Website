"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase, mediaUrl, type MediaItem } from "@/lib/supabase";
import { Btn, Empty, ErrorNote, Panel, formatDate } from "@/components/admin/ui";

const MAX_BYTES = 10 * 1024 * 1024; // matches the bucket's file_size_limit

/** Storage keys must be URL-safe and unique; the original name is kept alongside. */
function storageKey(name: string) {
  const clean = name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${Date.now()}-${clean}`;
}

export default function MediaPage() {
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return setError(error.message);
    setItems(data as MediaItem[]);
    setError(null);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setError(null);

    for (const file of Array.from(files)) {
      if (file.size > MAX_BYTES) {
        setError(`${file.name} is larger than 10 MB and was skipped.`);
        continue;
      }
      const path = storageKey(file.name);
      const { error: upErr } = await supabase.storage
        .from("media")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) {
        setError(`${file.name}: ${upErr.message}`);
        continue;
      }
      // Index the object so the library can be listed with metadata.
      const { error: dbErr } = await supabase.from("media").insert({
        bucket: "media",
        path,
        filename: file.name,
        mime_type: file.type,
        size_bytes: file.size,
        uploaded_by: (await supabase.auth.getUser()).data.user?.id ?? null,
      });
      if (dbErr) setError(`${file.name}: ${dbErr.message}`);
    }

    setUploading(false);
    if (fileInput.current) fileInput.current.value = "";
    load();
  }

  async function remove(item: MediaItem) {
    if (!confirm(`Delete ${item.filename}? Any page using it will show a broken image.`)) return;
    const { error: sErr } = await supabase.storage.from(item.bucket).remove([item.path]);
    if (sErr) return setError(sErr.message);
    const { error: dErr } = await supabase.from("media").delete().eq("id", item.id);
    if (dErr) return setError(dErr.message);
    setItems((x) => x?.filter((i) => i.id !== item.id) ?? null);
  }

  function copy(item: MediaItem) {
    navigator.clipboard.writeText(mediaUrl(item.path, item.bucket));
    setCopied(item.id);
    setTimeout(() => setCopied((c) => (c === item.id ? null : c)), 1800);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Media</h1>
        <p className="mt-1 text-sm text-muted">
          Images and PDFs, up to 10 MB each. Everything here is publicly readable — don&apos;t
          upload anything private.
        </p>
      </div>

      {error && <ErrorNote>{error}</ErrorNote>}

      <Panel title="Upload">
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            upload(e.dataTransfer.files);
          }}
          className="grid cursor-pointer place-items-center rounded-xl border border-dashed border-line2 bg-bg2/40 px-6 py-10 text-center transition hover:border-cyan/50"
        >
          <input
            ref={fileInput}
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,application/pdf"
            className="hidden"
            onChange={(e) => upload(e.target.files)}
          />
          <span className="text-sm text-silver">
            {uploading ? "Uploading…" : "Drop files here, or click to choose"}
          </span>
          <span className="mt-1 text-xs text-muted">PNG, JPG, WEBP, GIF, SVG or PDF</span>
        </label>
      </Panel>

      {items === null && !error && <p className="text-sm text-muted">Loading…</p>}
      {items !== null && !items.length && <Empty>Nothing uploaded yet.</Empty>}

      {!!items?.length && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const url = mediaUrl(item.path, item.bucket);
            const isImage = (item.mime_type ?? "").startsWith("image/");
            return (
              <div key={item.id} className="overflow-hidden rounded-2xl border border-line bg-bg3/60">
                <div className="relative grid aspect-[4/3] place-items-center bg-bg2">
                  {isImage ? (
                    <Image
                      src={url}
                      alt={item.alt_text ?? item.filename}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-sm text-muted">PDF</span>
                  )}
                </div>
                <div className="p-4">
                  <p className="truncate text-sm font-semibold text-ink" title={item.filename}>
                    {item.filename}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {item.size_bytes ? `${Math.round(item.size_bytes / 1024)} KB · ` : ""}
                    {formatDate(item.created_at)}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Btn variant="ghost" onClick={() => copy(item)}>
                      {copied === item.id ? "Copied" : "Copy URL"}
                    </Btn>
                    <Btn variant="danger" className="ml-auto" onClick={() => remove(item)}>
                      Delete
                    </Btn>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
