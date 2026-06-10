import type { Metadata } from "next";
import Link from "next/link";
import { CourseFinder } from "~/components/sections/course-finder-client";

export const metadata: Metadata = {
  title: "Course Finder — Browse Programs by Country & Budget | Find Abroad",
  description:
    "Explore thousands of university programs across the USA, UK, Canada, Australia, and more. Filter by field of study, budget, and duration to find the right course for you.",
};

export default function CoursesPage() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100vh" }}>

      {/* ── Hero header ──────────────────────────────────────────── */}
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
            <span style={{ color: "var(--fg)" }}>Courses</span>
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
            Course Directory
          </p>

          {/* H1 */}
          <h1
            style={{
              fontSize: "clamp(3.5rem, 9vw, 9rem)",
              fontWeight: 500,
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              color: "var(--fg)",
              margin: "0 0 1.5rem",
            }}
          >
            Courses
          </h1>

          {/* Subtext + stat strip */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <p
              style={{
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.75,
                color: "var(--muted)",
                maxWidth: "52ch",
              }}
            >
              Browse programs at top universities worldwide. Filter by subject,
              country, and budget — then enquire directly with a counselor.
            </p>

            {/* Quick stat strip */}
            <div style={{ display: "flex", alignItems: "center", gap: "2.5rem", flexShrink: 0 }}>
              {[
                { val: "8", label: "Countries" },
                { val: "9", label: "Subjects" },
                { val: "Free", label: "Consultation" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    style={{
                      fontSize: "clamp(1.4rem, 2vw, 2rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.03em",
                      color: "var(--fg)",
                      lineHeight: 1,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {s.val}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: 9,
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
      </section>

      {/* ── Course Finder ─────────────────────────────────────────── */}
      <section style={{ padding: "0 1.5rem 6rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <CourseFinder />
        </div>
      </section>

    </div>
  );
}
