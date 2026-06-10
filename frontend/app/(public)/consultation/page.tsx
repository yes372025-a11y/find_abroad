import type { Metadata } from "next";
import { ConsultationPageClient } from "~/components/sections/consultation-page-client";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description:
    "Talk to our overseas education experts. Get personalised advice on university selection, scholarships, and visa — completely free.",
};

export default function ConsultationPage() {
  return <ConsultationPageClient />;
}
