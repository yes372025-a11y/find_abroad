import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

const sections: { title: string; body: string }[] = [
  { title: "Information We Collect", body: "We collect information you provide when creating an account, filling forms, or contacting us — including name, email, phone, and academic details." },
  { title: "How We Use Information", body: "We use your information to provide personalised recommendations, connect you with counselors, and improve our services. We do not sell your data." },
  { title: "Data Security", body: "We use industry-standard encryption and security measures to protect your personal information." },
  { title: "Cookies", body: "We use cookies to improve your experience and analyse usage. You can control cookie settings in your browser." },
  { title: "Contact Us", body: "For privacy-related questions, email privacy@findabroad.com." },
];

export default function PrivacyPage() {
  return (
    <section style={{
      background: "var(--bg)",
      color: "var(--fg)",
      padding: "6rem 2rem 5rem",
      paddingTop: "calc(var(--nav-h, 80px) + 4rem)",
    }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h1 style={{
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          marginBottom: "0.5rem",
        }}>
          Privacy Policy
        </h1>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--muted)",
          letterSpacing: "0.08em",
          marginBottom: "3rem",
        }}>
          Last updated: June 2025
        </p>
        {sections.map((s) => (
          <div key={s.title} style={{ marginBottom: "2.5rem" }}>
            <h2 style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "var(--fg)",
              marginBottom: "0.75rem",
            }}>
              {s.title}
            </h2>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8 }}>
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}