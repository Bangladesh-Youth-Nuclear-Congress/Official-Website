"use client";

import InboxView, { type InboxConfig } from "@/components/admin/InboxView";

const config: InboxConfig = {
  table: "contact_submissions",
  title: "Contact messages",
  statuses: ["new", "read", "archived"],
  columns: [
    { key: "name", label: "From" },
    { key: "email", label: "Email" },
    { key: "subject", label: "Subject" },
  ],
  details: [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "subject", label: "Subject" },
    { key: "message", label: "Message" },
  ],
  searchKeys: ["name", "email", "subject", "message"],
  csvName: "bync-messages",
  emptyLabel: "No messages yet.",
};

export default function SubmissionsPage() {
  return <InboxView config={config} />;
}
