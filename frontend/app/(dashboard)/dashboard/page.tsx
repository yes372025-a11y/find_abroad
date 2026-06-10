"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useEffect, useRef } from "react";

/* ── Mac traffic lights ── */
const DOTS = [{ c: "#FF5F57" }, { c: "#FEBC2E" }, { c: "#28C840" }];

/* ── Hatched bg helper ── */
function hatch(i: number) {
  return `repeating-linear-gradient(${45 + (i % 6) * 25}deg, var(--border) 0 6px, var(--elev) 6px 14px)`;
}

/* ── Scroll-reveal hook ── */
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
            el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          obs.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ── Quick link card (Tivor row-card style) ── */
function QuickCard({
  href,
  label,
  sub,
  index,
  tileClass,
}: {
  href: string;
  label: string;
  sub: string;
  index: number;
  tileClass: string;
}) {
  const ref = useReveal(index * 60);

  return (
    <div
      ref={ref}
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <Link
        href={href}
        style={{ display: "block", textDecoration: "none" }}
      >
        <div
          className="dashboard-row-card"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.875rem 0",
            gap: "1rem",
            transition: "opacity 0.15s",
          }}
        >
          {/* Left */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: 0 }}>
            {/* Mac dots */}
            <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
              {DOTS.map((d) => (
                <span
                  key={d.c}
                  style={{ width: 9, height: 9, borderRadius: "50%", background: d.c, display: "block", flexShrink: 0 }}
                />
              ))}
            </div>
            <span style={{ width: 1, height: 14, background: "var(--border)", display: "block", flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--muted)",
                flexShrink: 0,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--fg)",
                  lineHeight: 1.3,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 10,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginTop: 2,
                }}
              >
                {sub}
              </p>
            </div>
          </div>

          {/* Right: hatched tile */}
          <div
            style={{
              width: 56,
              height: 36,
              borderRadius: 8,
              background: hatch(index),
              border: "1px solid var(--border)",
              flexShrink: 0,
            }}
          />
        </div>
      </Link>
    </div>
  );
}

/* ── Stat card ── */
function StatCard({
  value,
  label,
  index,
}: {
  value: string | number;
  label: string;
  index: number;
}) {
  const ref = useReveal(index * 80);
  return (
    <div
      ref={ref}
      style={{
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "1.5rem 1.75rem",
        background: "var(--elev)",
      }}
    >
      <p
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: "var(--fg)",
          lineHeight: 1,
          marginBottom: 8,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
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
        {label}
      </p>
    </div>
  );
}

/* ── Activity row ── */
function ActivityRow({
  title,
  meta,
  status,
  statusColor,
  index,
}: {
  title: string;
  meta: string;
  status: string;
  statusColor: string;
  index: number;
}) {
  const ref = useReveal(index * 50);
  return (
    <div
      ref={ref}
      style={{
        borderTop: "1px solid var(--border)",
        padding: "0.75rem 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          {DOTS.map((d) => (
            <span key={d.c} style={{ width: 7, height: 7, borderRadius: "50%", background: d.c, display: "block" }} />
          ))}
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: "var(--fg)", lineHeight: 1.35, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {title}
          </p>
          <p style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.05em", marginTop: 2 }}>
            {meta}
          </p>
        </div>
      </div>
      <span
        style={{
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: 9,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "3px 10px",
          borderRadius: 9999,
          border: `1px solid ${statusColor}`,
          color: statusColor,
          flexShrink: 0,
          fontWeight: 600,
        }}
      >
        {status}
      </span>
    </div>
  );
}

const QUICK_LINKS = [
  { href: "/applications", label: "Application Tracker", sub: "Track your university applications" },
  { href: "/consultations", label: "Consultations", sub: "Upcoming & past sessions" },
  { href: "/documents", label: "Document Vault", sub: "Upload & manage files" },
  { href: "/profile", label: "My Profile", sub: "Academic & financial details" },
];

const EXPLORE_LINKS = [
  { href: "/universities", label: "Browse Universities", sub: "500+ institutions worldwide" },
  { href: "/scholarships", label: "Find Scholarships", sub: "Funding opportunities" },
  { href: "/loans", label: "Education Loans", sub: "Compare lenders & rates" },
];

const RECENT_ACTIVITY = [
  { title: "MIT — Computer Science MS", meta: "Updated 2 days ago", status: "Applied", statusColor: "#28C840" },
  { title: "Stanford University — MBA", meta: "Updated 5 days ago", status: "Shortlisted", statusColor: "#FEBC2E" },
  { title: "UCL — Data Science MSc", meta: "Updated 1 week ago", status: "Lead", statusColor: "var(--muted)" },
];

/* ── Page ── */
export default function DashboardPage() {
  const headRef = useReveal(0);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* ── Editorial header ── */}
      <div ref={headRef} style={{ marginBottom: "3.5rem" }}>
        <p
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: 12,
          }}
        >
          Welcome back
        </p>
        <h1
          style={{
            fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
            marginBottom: 16,
          }}
        >
          Your Study Abroad
          <br />
          Journey
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "var(--muted)",
            maxWidth: 460,
            lineHeight: 1.65,
            marginBottom: 24,
          }}
        >
          Track applications, manage documents, and connect with expert counsellors — all in one place.
        </p>
        <Link
          href="/consultations"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "0.65rem 1.35rem",
            borderRadius: 9999,
            border: "1px solid var(--fg)",
            background: "var(--fg)",
            color: "var(--bg)",
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "background 0.2s, color 0.2s",
          }}
        >
          Book Consultation
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>

      {/* ── Stats row ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "1rem",
          marginBottom: "3.5rem",
        }}
      >
        <StatCard value="3" label="Applications" index={0} />
        <StatCard value="1" label="Consultations" index={1} />
        <StatCard value="7" label="Documents" index={2} />
        <StatCard value="12" label="Saved Unis" index={3} />
      </div>

      {/* ── Two-col grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          marginBottom: "3.5rem",
        }}
        className="dash-grid"
      >
        {/* Quick access */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "1.25rem",
            }}
          >
            Quick access
          </p>
          {QUICK_LINKS.map((l, i) => (
            <QuickCard key={l.href} {...l} index={i} tileClass={`tile-${i + 1}`} />
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>

        {/* Explore */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "1.25rem",
            }}
          >
            Explore
          </p>
          {EXPLORE_LINKS.map((l, i) => (
            <QuickCard key={l.href} {...l} index={i} tileClass={`tile-${i + 4}`} />
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </div>

      {/* ── Recent Activity ── */}
      <div style={{ marginBottom: "3rem" }}>
        <p
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "1.25rem",
          }}
        >
          Recent activity
        </p>
        {RECENT_ACTIVITY.map((a, i) => (
          <ActivityRow key={i} {...a} index={i} />
        ))}
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <div style={{ paddingTop: "1.25rem" }}>
          <Link
            href="/applications"
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            View all applications
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        .dashboard-row-card:hover { opacity: 0.7; }
        @media (max-width: 680px) {
          .dash-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
