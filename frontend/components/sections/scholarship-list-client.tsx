"use client";

import { useState, useEffect, useRef } from "react";
import { useScholarships } from "~/hooks/use-scholarships";
import { formatCurrency, formatDate } from "~/lib/utils";

/* ── Types ─────────────────────────────────────────────────── */
interface Scholarship {
  id: string | number;
  name: string;
  country?: string;
  university?: string;
  provider?: string;
  level?: string;
  coverage_description?: string;
  max_amount_usd?: number;
  is_fully_funded?: boolean;
  min_cgpa?: number;
  fields_of_study?: string;
  deadline?: string;
  application_url?: string;
  is_featured?: boolean;
  description?: string;
  slug?: string;
}

/* ── Country filter pills ──────────────────────────────────── */
const COUNTRIES = [
  { value: "", label: "All" },
  { value: "USA", label: "USA" },
  { value: "UK", label: "UK" },
  { value: "Canada", label: "Canada" },
  { value: "Australia", label: "Australia" },
  { value: "Germany", label: "Germany" },
  { value: "Ireland", label: "Ireland" },
  { value: "France", label: "France" },
  { value: "New Zealand", label: "New Zealand" },
];

/* ── Funding type filter pills ─────────────────────────────── */
const FUNDING_TYPES = [
  { value: "", label: "All Funding" },
  { value: "true", label: "Fully Funded" },
  { value: "false", label: "Partial" },
];

/* ── Mac-style traffic lights ─────────────────────────────── */
const DOTS = [{ c: "#FF5F57" }, { c: "#FEBC2E" }, { c: "#28C840" }];

/* ── Hatched placeholder bg per index ─────────────────────── */
function hatch(i: number) {
  return `repeating-linear-gradient(${45 + (i % 6) * 25}deg, var(--border) 0 6px, var(--elev) 6px 14px)`;
}

/* ── Deadline urgency helper ───────────────────────────────── */
function deadlineStatus(deadline?: string): { label: string; urgent: boolean } | null {
  if (!deadline) return null;
  try {
    const d = new Date(deadline);
    const now = new Date();
    const diff = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return { label: "Closed", urgent: false };
    if (diff <= 30) return { label: `${diff}d left`, urgent: true };
    return { label: formatDate(deadline), urgent: false };
  } catch {
    return { label: deadline, urgent: false };
  }
}

/* ── Single scholarship row card ─────────────────────────────── */
function ScholarshipCard({
  scholarship,
  index,
}: {
  scholarship: Scholarship;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll-reveal
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, (index % 6) * 55);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  const dl = deadlineStatus(scholarship.deadline);

  return (
    <div
      ref={cardRef}
      style={{ borderTop: "1px solid var(--border)" }}
    >
      {/* Chrome bar row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.875rem 0",
          gap: "1rem",
        }}
      >
        {/* Left: dots + index + name */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
            {DOTS.map((d) => (
              <span
                key={d.c}
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: d.c,
                  display: "block",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
          <span
            style={{
              width: 1,
              height: 14,
              background: "var(--border)",
              display: "block",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
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
              {scholarship.name}
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--muted)",
                marginTop: 2,
                letterSpacing: "0.04em",
              }}
            >
              {[scholarship.provider, scholarship.country].filter(Boolean).join(" · ")}
            </p>
          </div>
        </div>

        {/* Right: amount + badges + arrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            flexShrink: 0,
          }}
        >
          {scholarship.is_fully_funded && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: "#28C840",
                border: "1px solid #28C840",
                borderRadius: 6,
                padding: "2px 8px",
                whiteSpace: "nowrap",
                fontWeight: 600,
              }}
            >
              Full
            </span>
          )}
          <div style={{ textAlign: "right" }} className="schol-meta-right">
            {scholarship.max_amount_usd && (
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--muted)",
                  letterSpacing: "0.04em",
                }}
              >
                Up to {formatCurrency(scholarship.max_amount_usd)}
              </p>
            )}
            {dl && (
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: dl.urgent ? "#FF5F57" : "var(--muted)",
                  letterSpacing: "0.04em",
                  fontWeight: dl.urgent ? 600 : 400,
                }}
              >
                {dl.label}
              </p>
            )}
          </div>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "var(--muted)", flexShrink: 0 }}
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>

      {/* Expanded body card */}
      <div
        style={{
          width: "100%",
          borderRadius: 14,
          overflow: "hidden",
          border: "1px solid var(--border)",
          marginBottom: "2rem",
        }}
      >
        {/* Stat bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 1.25rem",
            borderBottom: "1px solid var(--border)",
            background: "var(--elev)",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
            {scholarship.level && (
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 2 }}>
                  Level
                </p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "var(--fg)", letterSpacing: "0.02em" }}>
                  {scholarship.level}
                </p>
              </div>
            )}
            {scholarship.min_cgpa != null && (
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 2 }}>
                  Min CGPA
                </p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "var(--fg)", letterSpacing: "0.02em" }}>
                  {scholarship.min_cgpa}
                </p>
              </div>
            )}
            {scholarship.max_amount_usd != null && (
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 2 }}>
                  Award
                </p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "var(--fg)", letterSpacing: "0.02em" }}>
                  {formatCurrency(scholarship.max_amount_usd)}
                </p>
              </div>
            )}
            {scholarship.fields_of_study && (
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 2 }}>
                  Fields
                </p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "var(--fg)", letterSpacing: "0.02em" }}>
                  {scholarship.fields_of_study}
                </p>
              </div>
            )}
          </div>

          {/* Apply CTA */}
          {scholarship.application_url ? (
            <a
              href={scholarship.application_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                fontSize: 12,
                fontWeight: 500,
                color: "var(--fg)",
                border: "1px solid var(--border)",
                borderRadius: 9999,
                padding: "5px 14px",
                background: "var(--bg)",
                whiteSpace: "nowrap",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--fg)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--fg)";
              }}
            >
              Apply Now →
            </a>
          ) : (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                fontSize: 12,
                fontWeight: 500,
                color: "var(--muted)",
                border: "1px solid var(--border)",
                borderRadius: 9999,
                padding: "5px 14px",
                background: "var(--bg)",
                whiteSpace: "nowrap",
              }}
            >
              View Details →
            </span>
          )}
        </div>

        {/* Hatched visual area with metadata chips */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16/4",
            background: hatch(index),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.5rem 1.75rem",
          }}
        >
          {/* Left chip: country + provider */}
          <div
            style={{
              background: "var(--elev)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "0.625rem 1rem",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              {scholarship.country ?? "International"}
            </span>
            {scholarship.university && (
              <>
                <span style={{ width: 1, height: 12, background: "var(--border)", display: "block" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)" }}>
                  {scholarship.university}
                </span>
              </>
            )}
            {scholarship.coverage_description && (
              <>
                <span style={{ width: 1, height: 12, background: "var(--border)", display: "block" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {scholarship.coverage_description}
                </span>
              </>
            )}
          </div>

          {/* Right chip: deadline */}
          {dl && (
            <div
              style={{
                background: "var(--elev)",
                border: `1px solid ${dl.urgent ? "#FF5F57" : "var(--border)"}`,
                borderRadius: 10,
                padding: "0.625rem 1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: dl.urgent ? "#FF5F57" : "var(--muted)", flexShrink: 0 }}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: dl.urgent ? "#FF5F57" : "var(--muted)",
                  fontWeight: dl.urgent ? 600 : 400,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {dl.urgent ? `Deadline: ${dl.label}` : `Deadline: ${dl.label}`}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Skeleton loader ──────────────────────────────────────── */
function SkeletonCard({ index }: { index: number }) {
  return (
    <div style={{ borderTop: "1px solid var(--border)", paddingBottom: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.875rem 0" }}>
        <div style={{ display: "flex", gap: 5 }}>
          {DOTS.map((d) => (
            <span key={d.c} style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--border)", display: "block" }} />
          ))}
        </div>
        <div style={{ width: 1, height: 14, background: "var(--border)" }} />
        <div style={{ width: 24, height: 10, background: "var(--border)", borderRadius: 4 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ width: `${160 + (index % 4) * 50}px`, height: 14, background: "var(--border)", borderRadius: 4 }} />
          <div style={{ width: 100, height: 10, background: "var(--border)", borderRadius: 4 }} />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          aspectRatio: "16/4",
          background: "var(--border)",
          borderRadius: 14,
          opacity: 0.4,
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <style>{`@keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:.7} }`}</style>
    </div>
  );
}

/* ── Main page component ───────────────────────────────────── */
export function ScholarshipListClient() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [country, setCountry] = useState("");
  const [fullyFunded, setFullyFunded] = useState("");
  const [page, setPage] = useState(1);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading, isError } = useScholarships({
    search: debouncedSearch || undefined,
    country: country || undefined,
    fully_funded: fullyFunded === "" ? undefined : fullyFunded === "true",
    page,
    per_page: 10,
  });

  const totalPages = data?.meta?.pages ?? 1;
  const total = data?.meta?.total ?? 0;

  return (
    <main
      style={{
        paddingTop: "var(--nav-h, 72px)",
        background: "var(--bg)",
        minHeight: "100vh",
      }}
    >
      {/* ── Page hero header ── */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            padding: "4rem 0 3rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
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
            Funding Directory
          </p>
          <h1
            style={{
              fontSize: "clamp(3.5rem, 9vw, 9rem)",
              fontWeight: 500,
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              color: "var(--fg)",
              margin: 0,
            }}
          >
            Scholarships
          </h1>
        </div>

        {/* ── Filters ── */}
        <div
          className="schol-filter-bar"
          style={{
            padding: "2rem 0",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.25rem",
          }}
        >
          {/* Left: country + funding type pills */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            {/* Country pills */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              {COUNTRIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => { setCountry(c.value); setPage(1); }}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "6px 14px",
                    borderRadius: 9999,
                    border: `1px solid ${country === c.value ? "var(--fg)" : "var(--border)"}`,
                    background: country === c.value ? "var(--fg)" : "transparent",
                    color: country === c.value ? "var(--bg)" : "var(--muted)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontWeight: 500,
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <span style={{ width: 1, height: 18, background: "var(--border)", display: "block", flexShrink: 0 }} />

            {/* Funding type pills */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              {FUNDING_TYPES.map((f) => (
                <button
                  key={f.value}
                  onClick={() => { setFullyFunded(f.value); setPage(1); }}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "6px 14px",
                    borderRadius: 9999,
                    border: `1px solid ${fullyFunded === f.value ? "var(--fg)" : "var(--border)"}`,
                    background: fullyFunded === f.value ? "var(--fg)" : "transparent",
                    color: fullyFunded === f.value ? "var(--bg)" : "var(--muted)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontWeight: 500,
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Search */}
          <div className="schol-search-input" style={{ position: "relative", flexShrink: 0 }}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--muted)",
                pointerEvents: "none",
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search scholarships…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.04em",
                padding: "8px 14px 8px 36px",
                borderRadius: 9999,
                border: "1px solid var(--border)",
                background: "var(--elev)",
                color: "var(--fg)",
                outline: "none",
                width: "min(220px, 100%)",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--fg)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>
        </div>

        {/* ── Results count ── */}
        {!isLoading && data && (
          <div
            style={{
              paddingTop: "1.75rem",
              paddingBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              {total} {total === 1 ? "scholarship" : "scholarships"} found
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--muted)",
                letterSpacing: "0.06em",
              }}
            >
              Page {page} of {totalPages}
            </p>
          </div>
        )}

        {/* ── Error ── */}
        {isError && (
          <div
            style={{
              padding: "3rem 0",
              textAlign: "center",
              borderTop: "1px solid var(--border)",
            }}
          >
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>
              Failed to load scholarships. Please try again.
            </p>
          </div>
        )}

        {/* ── Loading skeletons ── */}
        {isLoading && (
          <div style={{ paddingTop: "1rem" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} index={i} />
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {data && data.items?.length === 0 && (
          <div
            style={{
              padding: "6rem 0",
              textAlign: "center",
              borderTop: "1px solid var(--border)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              No scholarships match your search
            </p>
          </div>
        )}

        {/* ── Scholarship list ── */}
        {data && data.items?.length > 0 && (
          <div style={{ paddingTop: "1rem" }}>
            {data.items.map((s: Scholarship, i: number) => (
              <ScholarshipCard
                key={s.id}
                scholarship={s}
                index={(page - 1) * 10 + i}
              />
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "4rem 0 5rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: 9999,
                border: "1px solid var(--border)",
                background: "transparent",
                color: page === 1 ? "var(--border)" : "var(--fg)",
                cursor: page === 1 ? "not-allowed" : "pointer",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
              .reduce<(number | "…")[]>((acc, n, idx, arr) => {
                if (idx > 0 && n - (arr[idx - 1] as number) > 1) acc.push("…");
                acc.push(n);
                return acc;
              }, [])
              .map((item, i) =>
                item === "…" ? (
                  <span
                    key={`ellipsis-${i}`}
                    style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)", padding: "0 4px" }}
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => setPage(item as number)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 38,
                      height: 38,
                      borderRadius: 9999,
                      border: `1px solid ${page === item ? "var(--fg)" : "var(--border)"}`,
                      background: page === item ? "var(--fg)" : "transparent",
                      color: page === item ? "var(--bg)" : "var(--fg)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      fontWeight: page === item ? 600 : 400,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {item}
                  </button>
                )
              )}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: 9999,
                border: "1px solid var(--border)",
                background: "transparent",
                color: page === totalPages ? "var(--border)" : "var(--fg)",
                cursor: page === totalPages ? "not-allowed" : "pointer",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Responsive: filter bar stacking + meta hiding on mobile */}
      <style>{`
        @media (max-width: 640px) {
          .schol-filter-bar { flex-direction: column !important; align-items: flex-start !important; }
          .schol-search-input { width: 100% !important; }
          .schol-search-input input { width: 100% !important; }
        }
        @media (max-width: 640px) {
          .schol-meta-right { display: none !important; }
        }
        @media (max-width: 768px) {
          .schol-filters-divider { display: none !important; }
        }
      `}</style>
    </main>
  );
}