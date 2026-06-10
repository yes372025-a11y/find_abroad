import type { Metadata } from "next";
import { AboutPage } from "~/components/sections/about-page-client";

export const metadata: Metadata = {
  title: "About Find Abroad",
  description:
    "Find Abroad was founded to make international education accessible to every ambitious student — connecting them with the right university, scholarship, and loan, all in one place.",
};

export default function AboutPageRoute() {
  return <AboutPage />;
}
