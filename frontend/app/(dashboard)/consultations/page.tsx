import type { Metadata } from "next";
import { ConsultationsClient } from "~/components/sections/consultations-client";

export const metadata: Metadata = { title: "My Consultations — Find Abroad" };

export default function ConsultationsPage() {
  return <ConsultationsClient />;
}
