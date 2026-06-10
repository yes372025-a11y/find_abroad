"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const benefits = [
  "Multi-step eligibility assessment",
  "Compare 20+ lenders side-by-side",
  "Personalised loan estimate in minutes",
  "100% free — no credit check",
];

const lenders = [
  { label: "HDFC Credila", rate: "9.5%", tag: "Most Popular" },
  { label: "Avanse Financial", rate: "10.5%", tag: "Fast Approval" },
  { label: "Prodigy Finance", rate: "7.5%", tag: "No Collateral" },
];

export function LoanToolTeaser() {
  const ref = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const left = ref.current?.querySelector<HTMLElement>(".loan-left");
    const right = ref.current?.querySelector<HTMLElement>(".loan-right");
    if (!left || !right) return;
    [left, right].forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = i === 0 ? "translateX(-20px)" : "translateX(20px)";
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
            el.style.opacity = "1";
            el.style.transform = "translateX(0)";
          }, i * 150);
          observer.disconnect();
        }
      }, { threshold: 0.1 });
      observer.observe(el);
    });
  }, [isMobile]);

  return (
    <section
      ref={ref}
      style={{
        background: "var(--bg)",
        padding: "7rem 0",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "3rem" : "5rem",
          alignItems: "center",
        }}
      >
        {/* Left — copy */}
        <div className="loan-left">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "1.25rem",
            }}
          >
            Education Loans
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 4.5rem)",
              fontWeight: 500,
              lineHeight: 0.97,
              letterSpacing: "-0.03em",
              color: "var(--fg)",
              marginBottom: "1.5rem",
            }}
          >
            Check Your<br />Loan Eligibility
          </h2>
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
              lineHeight: 1.7,
              color: "var(--muted)",
              marginBottom: "2rem",
              maxWidth: "40ch",
            }}
          >
            Our intelligent wizard assesses your profile and matches you with the best lenders in minutes.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2.5rem" }}>
            {benefits.map((b) => (
              <div key={b} style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--fg)", flexShrink: 0, opacity: 0.7 }} />
                <span style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>{b}</span>
              </div>
            ))}
          </div>

          <Link
            href="/loans"
            className="cta-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "0.75rem 1.5rem",
              borderRadius: 9999,
              border: "1px solid var(--fg)",
              color: "var(--fg)",
              fontSize: 14,
              fontWeight: 500,
              transition: "background 0.2s, color 0.2s",
              textDecoration: "none",
            }}
          >
            Check Eligibility — It&apos;s Free
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Right — lender card widget */}
        <div
          className="loan-right"
          style={{
            borderRadius: 18,
            border: "1px solid var(--border)",
            background: "var(--elev)",
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
          }}
        >
          {/* Chrome bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.875rem 1.5rem",
              borderBottom: "1px solid var(--border)",
              background: "var(--bg)",
            }}
          >
            {[{ c: "#FF5F57" }, { c: "#FEBC2E" }, { c: "#28C840" }].map((d) => (
              <span key={d.c} style={{ width: 10, height: 10, borderRadius: "50%", background: d.c, display: "block" }} />
            ))}
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", marginLeft: 8, letterSpacing: "0.08em" }}>
              LENDER COMPARISON
            </span>
          </div>

          <div style={{ padding: "1.75rem" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "1.25rem",
              }}
            >
              Top Matched Lenders
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {lenders.map((lender) => (
                <div
                  key={lender.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem 1.125rem",
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    background: "var(--bg)",
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14, color: "var(--fg)" }}>{lender.label}</p>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", marginTop: 3, letterSpacing: "0.04em" }}>
                      {lender.tag}
                    </p>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)",
                      fontSize: "1.75rem",
                      color: "var(--fg)",
                      letterSpacing: "0.04em",
                      lineHeight: 1,
                    }}
                  >
                    {lender.rate}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "1.25rem",
                padding: "1rem",
                borderRadius: 10,
                border: "1px dashed var(--border)",
                textAlign: "center",
              }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                + 18 more lenders available
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
