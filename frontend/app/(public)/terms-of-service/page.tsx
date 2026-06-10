import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

const sections: { title: string; body: string }[] = [
  { title: "Acceptance of Terms", body: "By accessing Find Abroad, you agree to these terms. If you do not agree, please do not use the service." },
  { title: "Use of Service", body: "You may use Find Abroad for lawful purposes only. You must not misuse, disrupt, or attempt to gain unauthorised access to the service." },
  { title: "Account Responsibility", body: "You are responsible for maintaining the confidentiality of your account credentials and all activities under your account." },
  { title: "Intellectual Property", body: "All content on Find Abroad — including text, logos, and software — is owned by or licensed to Find Abroad and protected by copyright law." },
  { title: "Limitation of Liability", body: "Find Abroad provides information for guidance only and is not liable for decisions made based on this information." },
  { title: "Changes to Terms", body: "We may update these terms at any time. Continued use of the service after changes constitutes acceptance." },
];

export default function TermsPage() {
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
          Terms of Service
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