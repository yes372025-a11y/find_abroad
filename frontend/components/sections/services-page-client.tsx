"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";

/* ── Data ─────────────────────────────────────────────────── */

const SERVICES = [
  {
    icon: "🎓",
    title: "University Shortlisting",
    desc: "Curated reach, match, and safety schools based on your GPA, test scores, and career goals. Typically 8–12 universities.",
    tag: "01",
  },
  {
    icon: "📝",
    title: "Application Support",
    desc: "Complete application form assistance, deadline tracking, and submission across multiple universities simultaneously.",
    tag: "02",
  },
  {
    icon: "✍️",
    title: "SOP & LOR Review",
    desc: "Professionally reviewed Statement of Purpose and Letter of Recommendation guidance with unlimited revision rounds.",
    tag: "03",
  },
  {
    icon: "🛂",
    title: "Visa Guidance",
    desc: "Document checklist, financial proof structuring, mock visa interviews, and post-offer visa appointment scheduling.",
    tag: "04",
  },
  {
    icon: "🏆",
    title: "Scholarship Hunting",
    desc: "Proactive identification of merit, need-based, and country-specific scholarships aligned to your profile.",
    tag: "05",
  },
  {
    icon: "🏦",
    title: "Loan Assistance",
    desc: "Loan eligibility assessment, lender comparison, and direct referrals to HDFC Credila, Avanse, Prodigy Finance.",
    tag: "06",
  },
  {
    icon: "✈️",
    title: "Pre-Departure Briefing",
    desc: "Accommodation search, SIM card, bank account, and arrival-day orientation for your destination country.",
    tag: "07",
  },
];


/* ── Service Card ─────────────────────────────────────────── */

function ServiceCard({ s, index }: { s: (typeof SERVICES)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, (index % 4) * 60);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      style={{
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "1.75rem",
        background: "var(--elev)",
        position: "relative",
        cursor: "default",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--fg)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 12px 32px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Step number */}
      <span
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.25rem",
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: 9,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--muted)",
          opacity: 0.5,
        }}
      >
        {s.tag}
      </span>

      <div style={{ fontSize: "2rem", marginBottom: "1rem", lineHeight: 1 }}>
        {s.icon}
      </div>
      <p
        style={{
          fontSize: 17,
          fontWeight: 700,
          color: "var(--fg)",
          marginBottom: "0.5rem",
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
        }}
      >
        {s.title}
      </p>
      <p
        style={{
          fontSize: 14,
          color: "var(--muted)",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {s.desc}
      </p>
    </div>
  );
}


/* ── Main Export ──────────────────────────────────────────── */

export function ServicesPage() {
  const heroRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  return (
    <main style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100vh" }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "6rem 2rem 5rem",
          paddingTop: "calc(var(--nav-h, 80px) + 3rem)",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#28C840",
              }}
            />
            What We Offer
          </div>

          <h1
            ref={heroRef}
            style={{
              fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "var(--fg)",
              marginBottom: "1.5rem",
              maxWidth: 700,
            }}
          >
            End-to-end support.{" "}
            <span style={{ color: "var(--muted)" }}>
              From search to visa.
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
              color: "var(--muted)",
              lineHeight: 1.75,
              maxWidth: 520,
              marginBottom: "2.5rem",
            }}
          >
            We handle every step of your study abroad journey so you can focus
            on what matters — choosing the right future.
          </p>

          {/* Stat strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2.5rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { val: "7", label: "Core Services" },
              { val: "8–12", label: "Universities Shortlisted" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: "clamp(1.3rem, 2vw, 1.8rem)",
                    fontWeight: 700,
                    color: "var(--fg)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.val}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginTop: 3,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Grid ─────────────────────────────────── */}
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "5rem 2rem",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
              marginBottom: "3rem",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: "0.75rem",
                }}
              >
                Services
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.1,
                  color: "var(--fg)",
                  margin: 0,
                }}
              >
                Everything you need,
                <br />
                in one place.
              </h2>
            </div>
            <p
              style={{
                fontSize: 14,
                color: "var(--muted)",
                lineHeight: 1.7,
                maxWidth: 360,
                margin: 0,
              }}
            >
              From your first university search to boarding your flight — our
              counselors are with you at every milestone.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.title} s={s} index={i} />
            ))}
          </div>
        </div>
      </section>


      {/* ── Process strip ─────────────────────────────────── */}
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "4rem 2rem",
          background: "var(--elev)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 0,
            }}
          >
            {[
              { step: "01", label: "Profile Assessment", desc: "Free 30-min call to understand your goals, scores, and target countries." },
              { step: "02", label: "Shortlisting", desc: "We curate 8–12 universities across reach, match, and safety tiers." },
              { step: "03", label: "Application", desc: "Parallel submissions with tracking dashboards and deadline reminders." },
              { step: "04", label: "Offer & Visa", desc: "Post-offer visa prep, document structuring, and interview coaching." },
            ].map((p, i) => (
              <div
                key={p.step}
                style={{
                  borderLeft: i === 0 ? "none" : "1px solid var(--border)",
                  paddingLeft: i === 0 ? 0 : "1.5rem",
                  paddingRight: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: 10,
                  }}
                >
                  {p.step}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--fg)",
                    marginBottom: 8,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.label}
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section style={{ padding: "6rem 2rem" }}>
        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          {/* Decorative mono label */}
          <div
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 9,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              border: "1px solid var(--border)",
              borderRadius: 9999,
              padding: "4px 14px",
            }}
          >
            Free Consultation
          </div>

          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              color: "var(--fg)",
              margin: 0,
            }}
          >
            Not sure which plan is right for you?
          </h2>

          <p
            style={{
              fontSize: 16,
              color: "var(--muted)",
              lineHeight: 1.7,
              maxWidth: 440,
              margin: 0,
            }}
          >
            Book a free 30-minute consultation and we'll recommend the best
            path for your profile.
          </p>

          <Link
            href="/consultation"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "0.8rem 2rem",
              borderRadius: 9999,
              border: "1px solid var(--fg)",
              background: "var(--fg)",
              color: "var(--bg)",
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Book Free Consultation
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          {/* Secondary: WhatsApp quick link */}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999"}?text=Hi%2C%20I%20am%20interested%20in%20studying%20abroad`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 10,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--muted)",
              textDecoration: "none",
              border: "1px solid var(--border)",
              borderRadius: 9999,
              padding: "6px 14px",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.856L.057 23.57a.75.75 0 0 0 .92.921l5.882-1.538A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.7-.528-5.23-1.448l-.374-.222-3.89 1.018 1.034-3.774-.244-.386A9.944 9.944 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
            </svg>
            Or chat on WhatsApp
          </a>

          <p
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 10,
              letterSpacing: "0.06em",
              color: "var(--muted)",
              margin: 0,
            }}
          >
            No commitment required · 100% free · Available 7 days a week
          </p>
        </div>
      </section>

    </main>
  );
}
