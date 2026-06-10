import type { Metadata } from "next";
import { ProfilePageClient } from "~/components/sections/profile-page-client";

export const metadata: Metadata = { title: "My Profile — Find Abroad" };

export default function ProfilePage() {
  return <ProfilePageClient />;
}
