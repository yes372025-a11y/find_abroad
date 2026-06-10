import type { Metadata } from "next";
import { ScholarshipListClient } from "~/components/sections/scholarship-list-client";

export const metadata: Metadata = {
  title: "Scholarships",
  description:
    "Browse fully-funded and partial scholarships for studying abroad — deadlines, award amounts, CGPA requirements, and direct application links.",
};

export default function ScholarshipsPage() {
  return <ScholarshipListClient />;
}
