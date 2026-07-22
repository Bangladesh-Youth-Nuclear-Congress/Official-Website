"use client";

import InboxView, { type InboxConfig } from "@/components/admin/InboxView";

const config: InboxConfig = {
  table: "members",
  title: "Membership applications",
  statuses: ["pending", "approved", "rejected"],
  columns: [
    { key: "full_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "institution", label: "Institution" },
    { key: "interest", label: "Interest" },
  ],
  details: [
    { key: "full_name", label: "Full name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "institution", label: "Institution" },
    { key: "interest", label: "Area of interest" },
    { key: "message", label: "Message" },
  ],
  searchKeys: ["full_name", "email", "institution", "interest"],
  csvName: "bync-members",
  emptyLabel: "No membership applications yet.",
};

export default function MembersPage() {
  return <InboxView config={config} />;
}
