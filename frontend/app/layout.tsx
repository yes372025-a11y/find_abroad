import type { Metadata } from "next";
import { Inter, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "~/components/layout/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

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

// Theme injection script — must run before paint to prevent flash
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('fa-theme');
    var theme = stored === 'dark' || stored === 'light' ? stored :
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {}
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${bebasNeue.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
