import type { Metadata } from "next";
import { ServicesPage } from "~/components/sections/services-page-client";

export const metadata: Metadata = {
  title: "Services — Find Abroad",
  description:
    "Expert study abroad counseling — university shortlisting, application support, visa guidance, and loan assistance.",
};

export default function ServicesPageRoute() {
  return <ServicesPage />;
}
