"use client";

import InboxView, { type InboxConfig } from "@/components/admin/InboxView";

const config: InboxConfig = {
  table: "registrations",
  title: "Innoventure registrations",
  statuses: ["pending", "confirmed", "waitlisted", "rejected"],
  columns: [
    { key: "full_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "institution", label: "Institution" },
    { key: "segment", label: "Segment" },
  ],
  details: [
    { key: "full_name", label: "Full name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "institution", label: "Institution" },
    { key: "department", label: "Department" },
    { key: "study_level", label: "Level of study" },
    { key: "segment", label: "Segment" },
    { key: "team_name", label: "Team" },
    { key: "motivation", label: "Motivation" },
    { key: "event_slug", label: "Event" },
  ],
  searchKeys: ["full_name", "email", "institution", "team_name", "segment"],
  csvName: "innoventure-registrations",
  emptyLabel: "No registrations yet. They appear here the moment someone submits the form.",
};

export default function RegistrationsPage() {
  return <InboxView config={config} />;
}
