import type { Metadata } from "next";
import { ApplicationTrackerClient } from "~/components/sections/application-tracker-client";

export const metadata: Metadata = { title: "My Applications — Find Abroad" };

export default function ApplicationsPage() {
  return <ApplicationTrackerClient />;
}
