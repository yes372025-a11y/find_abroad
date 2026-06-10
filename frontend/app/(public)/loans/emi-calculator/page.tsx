import type { Metadata } from "next";
import Link from "next/link";
import { EMICalculator } from "~/components/sections/emi-calculator-client";

export const metadata: Metadata = {
  title: "EMI Calculator — Education Loan | Find Abroad",
  description:
    "Calculate your monthly EMI for education loans. Compare tenures, see full amortization schedule, and check eligibility in minutes.",
};

export default function EMICalculatorPage() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100vh" }}>

      {/* ── Hero header ─────────────────────────────────────────── */}
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "5rem 1.5rem 4rem",
          paddingTop: "calc(var(--nav-h, 80px) + 4rem)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Breadcrumb */}
          <div
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ opacity: 0.4 }}>›</span>
            <Link href="/loans" style={{ color: "var(--muted)", textDecoration: "none" }}>
              Loans
            </Link>
            <span style={{ opacity: 0.4 }}>›</span>
            <span style={{ color: "var(--fg)" }}>EMI Calculator</span>
          </div>

          {/* Mono label */}
          <p
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "1rem",
            }}
          >
            Loan Tools
          </p>

          {/* H1 */}
          <h1
            style={{
              fontSize: "clamp(3rem, 7vw, 7rem)",
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: "var(--fg)",
              marginBottom: "1.5rem",
            }}
          >
            EMI Calculator
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
              lineHeight: 1.75,
              color: "var(--muted)",
              maxWidth: "52ch",
            }}
          >
            Adjust the sliders to calculate your monthly repayment and total interest.
            Switch currencies, explore tenures, and view a full month-by-month amortization schedule.
          </p>
        </div>
      </section>

      {/* ── Calculator ──────────────────────────────────────────── */}
      <section style={{ padding: "4rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <EMICalculator />
        </div>
      </section>

    </div>
  );
}
