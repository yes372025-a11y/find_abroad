"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ConsultationBookingForm } from "~/components/forms/consultation-booking-form";

/* ── Mac traffic-light dots ── */
const DOTS = [{ c: "#FF5F57" }, { c: "#FEBC2E" }, { c: "#28C840" }];

/* ── Scroll reveal hook ── */
function useReveal(delay = 0) {
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
            el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ── What we cover cards ── */
const TOPICS = [
  {
    num: "01",
    title: "University Selection",
    desc: "We analyse your academic profile and goals to surface universities where you'll genuinely thrive — ranked by fit, not just prestige.",
  },
  {
    num: "02",
    title: "Scholarship & Funding",
    desc: "Our database of 500+ scholarships is filtered to your profile in real-time — government-backed, institutional, and fully-funded awards.",
  },
  {
    num: "03",
    title: "Loan Assessment",
    desc: "Compare 20+ education lenders on interest rate, collateral, and moratorium — so you know the full cost picture from day one.",
  },
  {
    num: "04",
    title: "Application & SOP",
    desc: "From personal statements to visa checklists, our counselors have guided 25,000+ students through the end-to-end journey.",
  },
];

/* ── Process steps ── */
const STEPS = [
  { step: "01", title: "Book a slot", desc: "Fill the form below and we'll confirm your slot within 24 hours. No commitment required." },
  { step: "02", title: "We prepare", desc: "Your assigned counselor reviews your profile before the call — so time is spent on what matters." },
  { step: "03", title: "Expert session", desc: "A 30–45 min focused conversation via video or phone. You ask, we advise. No jargon." },
  { step: "04", title: "Action plan", desc: "You leave with a clear, personalised roadmap — universities, timelines, and next steps." },
];

/* ── Topic card (expandable row) ── */
function TopicRow({ item, index }: { item: typeof TOPICS[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useReveal(index * 60);

  return (
    <div ref={ref}>
      <div
        onClick={() => setExpanded((e) => !e)}
        style={{
          borderTop: "1px solid var(--border)",
          padding: "1.25rem 0",
          cursor: "pointer",
          display: "grid",
          gridTemplateColumns: "28px 1fr auto",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {/* Index */}
        <span
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 10,
            letterSpacing: "0.08em",
            color: "var(--muted)",
          }}
        >
          {item.num}
        </span>

        {/* Title */}
        <h3
          style={{
            fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            color: "var(--fg)",
          }}
        >
          {item.title}
        </h3>

        {/* Chevron */}
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.76, 0, 0.24, 1)",
            flexShrink: 0,
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div
          style={{
            borderTop: "1px solid var(--border)",
            padding: "1.5rem 0 2rem",
            display: "grid",
            gridTemplateColumns: "28px 1fr",
            gap: "1rem",
          }}
        >
          <div />
          <div
            style={{
              background: "var(--elev)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            {/* Mac dots */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "0.85rem 1rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {DOTS.map((d, i) => (
                <span
                  key={i}
                  style={{ width: 10, height: 10, borderRadius: "50%", background: d.c, display: "block" }}
                />
              ))}
              <span
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginLeft: 8,
                }}
              >
                {item.title}
              </span>
            </div>
            <div style={{ padding: "1.25rem" }}>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--muted)",
                  lineHeight: 1.75,
                }}
              >
                {item.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main component ── */
export function ConsultationPageClient() {
  const heroRef = useReveal(0);
  const processRef = useReveal(0);
  const bookRef = useReveal(0);

  return (
    <main
      style={{
        paddingTop: "var(--nav-h, 80px)",
        background: "var(--bg)",
        color: "var(--fg)",
        minHeight: "100vh",
      }}
    >
      {/* ── Hero section ── */}
      <section
        className="section-pad-xl"
        style={{
          padding: "8rem 0 7rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <div ref={heroRef}>
            <p
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "1.5rem",
              }}
            >
              Expert Consultation
            </p>
            <h1
              style={{
                fontSize: "clamp(3.5rem, 9vw, 9rem)",
                fontWeight: 500,
                lineHeight: 0.9,
                letterSpacing: "-0.05em",
                color: "var(--fg)",
                marginBottom: "3rem",
              }}
            >
              Talk to an
              <br />
              expert.
            </h1>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4rem",
                alignItems: "start",
              }}
              className="hero-grid"
            >
              <p
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                  lineHeight: 1.7,
                  color: "var(--muted)",
                  maxWidth: "48ch",
                }}
              >
                Our counselors have each studied abroad themselves. They don&apos;t just advise — they&apos;ve lived the process,
                and they&apos;re ready to help you navigate every step of yours.
              </p>

              {/* Quick stats */}
              <div className="consult-stats-grid">
                {[
                  { value: "Free", label: "Cost" },
                  { value: "30–45m", label: "Duration" },
                  { value: "24h", label: "Response" },
                ].map((s) => (
                  <div key={s.label}>
                    <p
                      style={{
                        fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)",
                        fontWeight: 500,
                        letterSpacing: "-0.04em",
                        color: "var(--fg)",
                        lineHeight: 1,
                        marginBottom: 4,
                      }}
                    >
                      {s.value}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                        fontSize: 10,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What we cover ── */}
      <section
        className="section-pad-lg"
        style={{
          padding: "7rem 0",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ marginBottom: "4rem" }}>
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
              Topics covered
            </p>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 6rem)",
                fontWeight: 500,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                color: "var(--fg)",
              }}
            >
              What we
              <br />
              talk about.
            </h2>
          </div>

          <div>
            {TOPICS.map((item, i) => (
              <TopicRow key={item.num} item={item} index={i} />
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section
        className="section-pad-lg"
        style={{
          padding: "7rem 0",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <div ref={processRef} style={{ marginBottom: "5rem" }}>
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
              How it works
            </p>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 6rem)",
                fontWeight: 500,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                color: "var(--fg)",
              }}
            >
              Four steps.
              <br />
              Real results.
            </h2>
          </div>

          <div>
            {STEPS.map((step, i) => {
              return (
                <div
                  key={step.step}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: 0,
                    padding: "2.5rem 0",
                    borderTop: "1px solid var(--border)",
                  }}
                  className="process-row"
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                        fontSize: 11,
                        letterSpacing: "0.08em",
                        color: "var(--muted)",
                        flexShrink: 0,
                        paddingTop: "0.35rem",
                      }}
                    >
                      {step.step}
                    </span>
                    <h3
                      style={{
                        fontSize: "clamp(1.4rem, 2.2vw, 2.5rem)",
                        fontWeight: 500,
                        letterSpacing: "-0.03em",
                        lineHeight: 1.1,
                        color: "var(--fg)",
                      }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p
                    className="process-desc"
                    style={{
                      fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                      lineHeight: 1.8,
                      color: "var(--muted)",
                      paddingTop: "0.75rem",
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              );
            })}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .process-row { grid-template-columns: 1fr 1fr !important; gap: 4rem !important; align-items: start; }
            .process-desc { padding-top: 0.25rem !important; }
          }
          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          }
        `}</style>
      </section>

      {/* ── Booking form section ── */}
      <section
        className="section-pad-lg"
        style={{
          padding: "7rem 0",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <div
            ref={bookRef}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "6rem",
              alignItems: "start",
            }}
            className="booking-layout"
          >
            {/* Left: editorial headline */}
            <div className="booking-headline" style={{ position: "sticky", top: "calc(var(--nav-h, 80px) + 2rem)" }}>
              <p
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: "1.5rem",
                }}
              >
                Get started
              </p>
              <h2
                style={{
                  fontSize: "clamp(3rem, 6vw, 6rem)",
                  fontWeight: 500,
                  lineHeight: 0.95,
                  letterSpacing: "-0.05em",
                  color: "var(--fg)",
                  marginBottom: "2rem",
                }}
              >
                Book a free
                <br />
                session.
              </h2>
              <p
                style={{
                  fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                  lineHeight: 1.7,
                  color: "var(--muted)",
                  maxWidth: "38ch",
                  marginBottom: "3rem",
                }}
              >
                Fill in your details and we&apos;ll match you with the best counselor for your goals.
                No commitment required.
              </p>

              {/* Trust signals */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  "100% free, zero hidden fees",
                  "Matched to a specialist counselor",
                  "Confirmation within 24 hours",
                ].map((trust) => (
                  <div key={trust} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#28C840",
                        flexShrink: 0,
                      }}
                    />
                    <p
                      style={{
                        fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                        fontSize: 11,
                        letterSpacing: "0.06em",
                        color: "var(--muted)",
                      }}
                    >
                      {trust}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: actual form */}
            <div>
              <ConsultationBookingForm />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .booking-layout { grid-template-columns: 1fr !important; gap: 3rem !important; }
            .booking-headline { position: static !important; }
          }
        `}</style>
      </section>

      {/* ── Closing CTA ── */}
      <section
        className="section-pad-xl"
        style={{
          padding: "8rem 0",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "2rem",
            }}
          >
            Not ready to book?
          </p>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 7vw, 8rem)",
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: "var(--fg)",
              marginBottom: "3.5rem",
            }}
          >
            Explore first,
            <br />
            decide later.
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/universities"
              className="cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "0.875rem 2rem",
                borderRadius: 9999,
                border: "1px solid var(--fg)",
                color: "var(--fg)",
                fontSize: 15,
                fontWeight: 500,
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              Browse Universities
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link
              href="/scholarships"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "0.875rem 2rem",
                borderRadius: 9999,
                border: "1px solid var(--border)",
                color: "var(--muted)",
                fontSize: 15,
                fontWeight: 500,
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--fg)";
                e.currentTarget.style.color = "var(--fg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--muted)";
              }}
            >
              Find Scholarships
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
