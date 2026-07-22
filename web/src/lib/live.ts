"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabase";

/**
 * Live content, with the build-time copy as the floor.
 *
 * The site is a static export, so every page ships with its text already in the
 * HTML. These hooks fetch the database copy after hydration and swap it in if
 * it differs. That gives editors instant updates from /admin without a rebuild,
 * while search engines and users on a slow connection still get real content —
 * and if Supabase is unreachable, the page simply keeps what it shipped with.
 */

export function useSiteContent<T extends Record<string, string>>(fallback: T): T {
  const [values, setValues] = useState<T>(fallback);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("site_content")
      .select("key, value")
      .in("key", Object.keys(fallback))
      .then(({ data, error }) => {
        if (cancelled || error || !data?.length) return;
        const live = Object.fromEntries(
          data.filter((r) => r.value?.trim()).map((r) => [r.key, r.value])
        );
        setValues({ ...fallback, ...live });
      });
    return () => {
      cancelled = true;
    };
    // `fallback` is a module-level constant at every call site.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return values;
}

export type LiveNewsPost = {
  date_label: string;
  tag: string;
  title: string;
  body: string;
};

export function useLiveNews(fallback: LiveNewsPost[]): LiveNewsPost[] {
  const [posts, setPosts] = useState(fallback);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("news_posts")
      .select("date_label, tag, title, body")
      .eq("published", true)
      .order("sort_order")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled || error || !data?.length) return;
        setPosts(data as LiveNewsPost[]);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return posts;
}
