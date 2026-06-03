import type { Metadata } from "next";
import MuiThemeRegistry from "./mui-theme-registry";
import { Providers } from "~/components/layout/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Find Abroad — Your Study Abroad Partner",
    template: "%s | Find Abroad",
  },
  description:
    "Find your perfect university abroad. Compare scholarships, check loan eligibility, and book expert consultations.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://findabroad.com"),
  openGraph: { type: "website", siteName: "Find Abroad", locale: "en_US" },
  twitter: { card: "summary_large_image", site: "@findabroad" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-[#0A0A0B]">
      <body className="bg-[#0A0A0B]">
        <MuiThemeRegistry>
          <Providers>{children}</Providers>
        </MuiThemeRegistry>
      </body>
    </html>
  );
}
