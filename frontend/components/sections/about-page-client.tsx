"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ── Data ─────────────────────────────────────────────────── */
const SERVICES = [
  {
    title: "University Matching",
    description:
      "We analyse your academic profile, target country, and career goals to surface the universities where you'll thrive — ranked by fit, not just prestige.",
  },
  {
    title: "Scholarship Discovery",
    description:
      "Our database of 500+ scholarships is filtered to your profile in real-time — fully-funded, partial, government-backed, and institution-specific awards.",
  },
  {
    title: "Loan Eligibility Assessment",
    description:
      "A multi-step eligibility wizard matches you to 20+ lenders — comparing interest rates, collateral requirements, and moratorium periods side-by-side.",
  },
  {
    title: "Application Guidance",
    description:
      "From SOPs to visa checklists, our counselors have guided 25,000+ students through the end-to-end application journey at top institutions worldwide.",
  },
  {
    title: "Document Management",
    description:
      "A secure vault for all your academic, financial, and visa documents — organised, accessible, and ready to submit at a moment's notice.",
  },
  {
    title: "Post-Admission Support",
    description:
      "We don't stop at the offer letter. Visa timelines, accommodation guidance, and pre-departure briefings — we're with you until you land.",
  },
];

const HOW_WE_WORK = [
  {
    step: "01",
    title: "Profile Assessment",
    description:
      "We start by understanding you — academics, finances, career aspirations, and target destinations — before recommending a single university.",
  },
  {
    step: "02",
    title: "Curated Shortlist",
    description:
      "Using real admission data, we build a shortlist that balances ambition with realistic acceptance probabilities across your chosen countries.",
  },
  {
    step: "03",
    title: "Funding Strategy",
    description:
      "Every shortlisted university is paired with scholarships and loan options relevant to your profile — so you know the full cost picture from day one.",
  },
  {
    step: "04",
    title: "End-to-End Execution",
    description:
      "Our counselors manage timelines, applications, and follow-ups — so you focus on preparing, not chasing deadlines.",
  },
];

const VALUES = [
  { title: "Student-First", desc: "Every decision starts with how it benefits the student — not the institution or the lender." },
  { title: "Radical Transparency", desc: "No hidden fees, no surprise charges, no confusing fine print. You see exactly what we see." },
  { title: "Genuine Expertise", desc: "Our counselors have studied abroad themselves. They don't just advise — they've lived the process." },
];

const TEAM = [
  { name: "Ananya Krishnamurthy", role: "Head of Counseling — UK & Ireland", exp: "8 years", avatar: "https://i.pravatar.cc/120?img=47" },
  { name: "Rohit Sharma", role: "Senior Counselor — USA & Canada", exp: "6 years", avatar: "https://i.pravatar.cc/120?img=12" },
  { name: "Priya Desai", role: "Counselor — France & New Zealand", exp: "4 years", avatar: "https://i.pravatar.cc/120?img=5" },
  { name: "Vikram Singh", role: "Counselor — Australia & Germany", exp: "7 years", avatar: "https://i.pravatar.cc/120?img=11" },
  { name: "Meera Nair", role: "Loan & Finance Specialist", exp: "5 years", avatar: "https://i.pravatar.cc/120?img=44" },
  { name: "Siddharth Rao", role: "Visa Documentation Expert", exp: "4 years", avatar: "https://i.pravatar.cc/120?img=33" },
];

/* ── Scroll-reveal hook ───────────────────────────────────── */
function useScrollReveal(delay = 0) {
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
            el.style.transition = "opacity 0.65s ease, transform 0.65s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay * 1000);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ── Section: Mission hero ────────────────────────────────── */
function MissionSection() {
  const ref = useScrollReveal(0);
  return (
    <section
      className="section-pad-xl"
      style={{
        padding: "8rem 0 7rem",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div ref={ref}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "1.5rem",
            }}
          >
            Our Mission
          </p>
          <h1
            style={{
              fontSize: "clamp(3rem, 7vw, 8rem)",
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: "var(--fg)",
              maxWidth: "18ch",
              marginBottom: "3rem",
            }}
          >
            Making Global Education Accessible to Every Student
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              lineHeight: 1.75,
              color: "var(--muted)",
              maxWidth: "54ch",
            }}
          >
            Find Abroad was founded on one belief: that where you study should be decided
            by your ambitions — not your access to information. We connect students
            with universities, scholarships, and loans that match their profile, all in one place.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Section: Services (Tivor hover-expand rows) ──────────── */
function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const headerRef = useScrollReveal(0);

  return (
    <section className="section-pad-lg" style={{ padding: "7rem 0", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div ref={headerRef}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "1rem",
            }}
          >
            Services
          </p>
          <h2
            style={{
              fontSize: "clamp(3rem, 6vw, 7rem)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "var(--fg)",
              marginBottom: "5rem",
            }}
          >
            What we do.
          </h2>
        </div>

        <div>
          {SERVICES.map((service, i) => {
            const isHovered = hoveredIndex === i;
            const isDimmed = hoveredIndex !== null && !isHovered;
            return (
              <div
                key={service.title}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderBottom: i < SERVICES.length - 1 ? "1px solid var(--border)" : undefined,
                  borderTop: i === 0 ? "1px solid var(--border)" : undefined,
                  padding: isHovered ? "3.25rem 0" : "2rem 0",
                  transition: "padding 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "default",
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Ghost number watermark */}
                <span
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: `translateY(-50%) scale(${isHovered ? 1 : 0.75})`,
                    fontSize: "clamp(6rem, 10vw, 11rem)",
                    fontWeight: 700,
                    color: "transparent",
                    WebkitTextStroke: "1px color-mix(in srgb, var(--fg) 8%, transparent)",
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    lineHeight: 1,
                    userSelect: "none",
                    pointerEvents: "none",
                    letterSpacing: "-0.05em",
                  }}
                >
                  0{i + 1}
                </span>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    position: "relative",
                    opacity: isDimmed ? 0.28 : 1,
                    transition: "opacity 0.35s ease",
                  }}
                >
                  {/* Index number */}
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "var(--muted)",
                      width: 32,
                      flexShrink: 0,
                      opacity: isHovered ? 0 : 1,
                      transition: "opacity 0.25s ease",
                    }}
                  >
                    0{i + 1}
                  </span>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontSize: "clamp(1.25rem, 2.5vw, 3rem)",
                        fontWeight: 500,
                        letterSpacing: "-0.03em",
                        color: "var(--fg)",
                        marginBottom: "0.75rem",
                        lineHeight: 1.1,
                      }}
                    >
                      {service.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                        lineHeight: 1.75,
                        color: "var(--muted)",
                        maxWidth: "52ch",
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "translateY(0)" : "translateY(6px)",
                        transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s",
                      }}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to dedicated services page */}
        <div style={{ marginTop: "3rem", borderTop: "1px solid var(--border)", paddingTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
          <Link
            href="/services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            See pricing &amp; all services
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Section: Process (Tivor two-col numbered rows) ───────── */
function ProcessSection() {
  const headerRef = useScrollReveal(0);

  return (
    <section style={{ padding: "7rem 0", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div ref={headerRef}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "1rem",
            }}
          >
            How We Work
          </p>
          <h2
            style={{
              fontSize: "clamp(3rem, 6vw, 7rem)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "var(--fg)",
              marginBottom: "5rem",
            }}
          >
            Four steps.
            <br />
            Real results.
          </h2>
        </div>

        <div>
          {HOW_WE_WORK.map((step, i) => {
            const rowRef = useScrollReveal(i * 0.08);
            return (
              <div key={step.step} ref={rowRef}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: 0,
                    padding: "2.5rem 0",
                    borderTop: "1px solid var(--border)",
                  }}
                  className="process-row"
                >
                  {/* Left: step + title */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
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

                  {/* Right: description (2-col on desktop) */}
                  <p
                    className="process-desc"
                    style={{
                      fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                      lineHeight: 1.8,
                      color: "var(--muted)",
                      paddingTop: "0.75rem",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .process-row {
            grid-template-columns: 1fr 1fr !important;
            gap: 4rem !important;
            align-items: start;
          }
          .process-desc {
            padding-top: 0.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ── Section: Values ──────────────────────────────────────── */
function ValuesSection() {
  const headerRef = useScrollReveal(0);
  return (
    <section style={{ padding: "7rem 0", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div ref={headerRef}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "1rem",
            }}
          >
            Our Values
          </p>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 6rem)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "var(--fg)",
              marginBottom: "4rem",
            }}
          >
            What we stand for.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {VALUES.map((v, i) => {
            const cardRef = useScrollReveal(i * 0.1);
            return (
              <div
                key={v.title}
                ref={cardRef}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "2rem",
                  background: "var(--elev)",
                }}
              >
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
                  0{i + 1}
                </p>
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    color: "var(--fg)",
                    marginBottom: "0.875rem",
                    lineHeight: 1.2,
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.75,
                    color: "var(--muted)",
                  }}
                >
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Section: Team ───────────────────────────────────────── */
function TeamSection() {
  const headerRef = useScrollReveal(0);
  return (
    <section style={{ padding: "7rem 0", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div ref={headerRef}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "1rem",
            }}
          >
            Our Team
          </p>
          <h2
            style={{
              fontSize: "clamp(3rem, 6vw, 7rem)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "var(--fg)",
              marginBottom: "5rem",
            }}
          >
            The people
            <br />
            behind it.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 0,
          }}
          className="team-grid"
        >
          {TEAM.map((member, i) => {
            const cardRef = useScrollReveal(i * 0.08);
            return (
              <div
                key={member.name}
                ref={cardRef}
                style={{
                  borderLeft: i === 0 ? "none" : "1px solid var(--border)",
                  paddingLeft: i === 0 ? 0 : "2rem",
                  paddingRight: "2rem",
                  paddingBottom: "2rem",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.avatar}
                  alt={member.name}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1px solid var(--border)",
                    marginBottom: "1.25rem",
                    display: "block",
                  }}
                />
                <h3
                  style={{
                    fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    color: "var(--fg)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {member.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "0.35rem",
                    lineHeight: 1.5,
                  }}
                >
                  {member.role}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.06em",
                    color: "var(--muted)",
                    opacity: 0.6,
                  }}
                >
                  {member.exp} experience
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 640px) {
          .team-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .team-grid > div {
            border-left: none !important;
            padding-left: 0 !important;
            border-bottom: 1px solid var(--border);
            padding-bottom: 1.5rem;
            margin-bottom: 1.5rem;
          }
          .team-grid > div:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }
        }
      `}} />
    </section>
  );
}

/* ── Section: Founder note (Tivor CEONote) ────────────────── */
function FounderNote() {
  const ref = useScrollReveal(0);
  return (
    <section style={{ padding: "7rem 0", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ maxWidth: 720 }} ref={ref}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "2rem",
            }}
          >
            A note from the founder
          </p>
          <blockquote
            style={{
              fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
              fontWeight: 400,
              lineHeight: 1.55,
              letterSpacing: "-0.01em",
              color: "var(--fg)",
              margin: "0 0 2.5rem",
              fontStyle: "italic",
            }}
          >
            &ldquo;We built Find Abroad because we saw too many brilliant students making
            life-altering decisions based on incomplete information. Every student deserves
            to know what&apos;s actually possible for them — not just what&apos;s visible.&rdquo;
          </blockquote>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://i.pravatar.cc/80?img=68"
              alt="Founder, Find Abroad"
              width={44}
              height={44}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid var(--border)",
                flexShrink: 0,
              }}
            />
            <div>
              <p style={{ fontWeight: 500, fontSize: 14, color: "var(--fg)" }}>Founder, Find Abroad</p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--muted)",
                  marginTop: 2,
                }}
              >
                hello@findabroad.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Section: Stats bar ───────────────────────────────────── */
function StatsSection() {
  const ref = useScrollReveal(0);
  const stats = [
    { value: "25,000+", label: "Students Placed" },
    { value: "500+", label: "Universities Listed" },
    { value: "50+", label: "Certified Counselors" },
    { value: "8", label: "Countries Covered" },
  ];
  return (
    <section style={{ padding: "5rem 0", borderBottom: "1px solid var(--border)" }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "2rem",
          }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.04em",
                  color: "var(--fg)",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
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
    </section>
  );
}

/* ── Section: Closing CTA (Tivor-style) ───────────────────── */
function ClosingCTA() {
  const ref = useScrollReveal(0);
  return (
    <section
      style={{
        padding: "8rem 0",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
        textAlign: "center",
      }}
    >
      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "2rem",
          }}
        >
          Ready to start
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
          Your future
          <br />
          starts here
        </h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
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
            href="/services"
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
            }}
          >
            View Services & Pricing
          </Link>
          <Link
            href="/consultation"
            className="hover-btn-outline"
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
            }}
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Main export ──────────────────────────────────────────── */
export function AboutPage() {
  return (
    <main style={{ paddingTop: "var(--nav-h, 72px)", background: "var(--bg)", minHeight: "100vh" }}>
      <MissionSection />
      <StatsSection />
      <ServicesSection />
      <ProcessSection />
      <ValuesSection />
      <FounderNote />
      <TeamSection />
      <ClosingCTA />
      <style>{`
        @media (max-width: 768px) {
          /* All about-page sections: reduce large vertical paddings */
          main > section {
            padding-top: 4rem !important;
            padding-bottom: 4rem !important;
          }
        }
        @media (max-width: 480px) {
          main > section {
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
          }
          /* Process row: collapse to single column on mobile */
          .process-row { grid-template-columns: 1fr !important; gap: 1rem !important; }
        }
      `}</style>
    </main>
  );
}
