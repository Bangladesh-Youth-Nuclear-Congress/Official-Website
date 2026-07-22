"use client";

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY — see web/.env"
  );
}

/**
 * Browser-side Supabase client.
 *
 * The site is a static export with no server, so this is the only client there
 * is: public pages read content with it anonymously, and /admin uses the same
 * client carrying a signed-in session. Row Level Security is what separates
 * the two — see supabase/migrations/0001_init.sql.
 */
export const supabase = createClient(url, key, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// ---------------------------------------------------------------- types ---

export type Submission = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: "new" | "read" | "archived";
  admin_note: string | null;
  created_at: string;
};

export type Registration = {
  id: string;
  event_slug: string;
  full_name: string;
  email: string;
  phone: string | null;
  institution: string | null;
  department: string | null;
  study_level: string | null;
  segment: string | null;
  team_name: string | null;
  motivation: string | null;
  status: "pending" | "confirmed" | "waitlisted" | "rejected";
  admin_note: string | null;
  created_at: string;
};

export type Member = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  institution: string | null;
  interest: string | null;
  message: string | null;
  status: "pending" | "approved" | "rejected";
  admin_note: string | null;
  created_at: string;
};

export type NewsPost = {
  id: string;
  date_label: string;
  tag: string;
  title: string;
  body: string;
  published: boolean;
  sort_order: number;
};

export type Speaker = {
  id: string;
  name: string;
  role: string | null;
  org: string | null;
  bio: string | null;
  photo_url: string | null;
  published: boolean;
  sort_order: number;
};

export type SiteContent = {
  key: string;
  value: string;
  label: string | null;
  group: string;
};

export type MediaItem = {
  id: string;
  bucket: string;
  path: string;
  filename: string;
  mime_type: string | null;
  size_bytes: number | null;
  alt_text: string | null;
  created_at: string;
};

/** Public URL for an object in the public `media` bucket. */
export function mediaUrl(path: string, bucket = "media") {
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
