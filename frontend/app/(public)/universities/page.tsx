import type { Metadata } from "next";
import { UniversitiesPage } from "~/components/sections/university-list-client";

export const metadata: Metadata = {
  title: "Explore Universities",
  description:
    "Browse and compare 500+ top universities worldwide — rankings, tuition, CGPA requirements, and intake dates.",
};

export default function UniversitiesPageRoute() {
  return <UniversitiesPage />;
}
