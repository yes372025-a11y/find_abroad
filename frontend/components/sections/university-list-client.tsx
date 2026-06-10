"use client";

import Link from "next/link";
import { useMemo, useState, useRef, useEffect } from "react";
import { useUniversities } from "~/hooks/use-universities";
import { formatCurrency } from "~/lib/utils";

/* ── Types ─────────────────────────────────────────────────── */
type University = {
  id: string;
  slug: string;
  name: string;
  country: string;
  city?: string | null;
  world_ranking?: number | null;
  qs_ranking?: number | null;
  avg_tuition_usd?: number | null;
  min_cgpa?: number | null;
  min_ielts?: number | null;
  intakes?: string | null;
  is_featured?: boolean;
};

type UniversityListClientProps = {
  defaultCountry?: string;
};

/* ── Constants ─────────────────────────────────────────────── */
const COUNTRY_OPTIONS = [
  { value: "", label: "All Countries" },
  { value: "usa", label: "USA" },
  { value: "uk", label: "UK" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
  { value: "germany", label: "Germany" },
  { value: "ireland", label: "Ireland" },
  { value: "france", label: "France" },
  { value: "new-zealand", label: "New Zealand" },
];

const FLAG: Record<string, string> = {
  USA: "🇺🇸", UK: "🇬🇧", Canada: "🇨🇦", Australia: "🇦🇺",
  Germany: "🇩🇪", France: "🇫🇷", Ireland: "🇮🇪", "New Zealand": "🇳🇿",
};

const DOTS = [{ c: "#FF5F57" }, { c: "#FEBC2E" }, { c: "#28C840" }];

/* ── Helpers ─────────────────────────────────────────────────── */
function hatch(i: number) {
  return `repeating-linear-gradient(${45 + (i % 6) * 25}deg, var(--border) 0 6px, var(--elev) 6px 14px)`;
}

function normalizeCountry(value?: string): string {
  if (!value) return "";
  const normalized = value.trim().toLowerCase();
  if (normalized === "us") return "usa";
  if (normalized === "united states") return "usa";
  if (normalized === "united states of america") return "usa";
  if (normalized === "united kingdom") return "uk";
  return normalized;
}

function toApiCountry(value: string): string | undefined {
  if (!value) return undefined;
  const map: Record<string, string> = {
    usa: "USA",
    uk: "UK",
    canada: "Canada",
    australia: "Australia",
    germany: "Germany",
    ireland: "Ireland",
    france: "France",
    "new-zealand": "New Zealand",
  };
  return map[value] ?? value;
}

function asUniversities(raw: unknown): University[] {
  if (Array.isArray(raw)) return raw as University[];
  if (raw && typeof raw === "object") {
    const value = raw as { items?: unknown; data?: unknown; results?: unknown };
    if (Array.isArray(value.items)) return value.items as University[];
    if (Array.isArray(value.data)) return value.data as University[];
    if (Array.isArray(value.results)) return value.results as University[];
  }
  return [];
}

/* ─────────────────────────────────────────────────────────────
   UNIVERSITY CARD
   ───────────────────────────────────────────────────────────── */
function UniversityCard({ university, index }: { university: University; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, (index % 8) * 45);
          obs.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  const flag = FLAG[university.country ?? ""] ?? "🌍";
  const rank = university.qs_ranking ? `QS #${university.qs_ranking}` : university.world_ranking ? `World #${university.world_ranking}` : null;
  const isFeatured = university.is_featured;

  return (
    <div
      ref={ref}
      style={{
        border: "1px solid var(--border)",
        borderRadius: 14,
        overflow: "hidden",
        background: "var(--elev)",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--fg)";
        e.currentTarget.style.boxShadow = "0 10px 32px rgba(0,0,0,0.10)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Chrome bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1.25rem",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          {DOTS.map((d) => (
            <span
              key={d.c}
              style={{ width: 9, height: 9, borderRadius: "50%", background: d.c, display: "block" }}
            />
          ))}
        </div>
        {isFeatured && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#FEBC2E",
              border: "1px solid #FEBC2E",
              borderRadius: 4,
              padding: "2px 6px",
            }}
          >
            Featured
          </span>
        )}
      </div>

      {/* Hatched visual band */}
      <div
        style={{
          height: 64,
          background: hatch(index),
          flexShrink: 0,
          position: "relative",
        }}
      >
        {rank && (
          <span
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--fg)",
              background: "var(--elev)",
              border: "1px solid var(--fg)",
              borderRadius: 6,
              padding: "4px 10px",
            }}
          >
            {rank}
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        <p
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "var(--fg)",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            marginBottom: "0.25rem",
          }}
        >
          {university.name}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 16 }}>{flag}</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {university.country}
            {university.city ? ` · ${university.city}` : ""}
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 3 }}>
              Avg Tuition
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: "var(--fg)" }}>
              {university.avg_tuition_usd ? `${formatCurrency(university.avg_tuition_usd)}/yr` : "N/A"}
            </p>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 3 }}>
              Requirements
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500, color: "var(--fg)" }}>
              {university.min_cgpa ? `CGPA ${university.min_cgpa}` : "Varies"}
              {university.min_ielts ? ` · IELTS ${university.min_ielts}` : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1.25rem",
          borderTop: "1px solid var(--border)",
          background: "var(--bg)",
        }}
      >
        <Link
          href={`/universities/${university.slug}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--bg)",
            border: "1px solid var(--fg)",
            borderRadius: 9999,
            padding: "6px 16px",
            background: "var(--fg)",
            whiteSpace: "nowrap",
            textDecoration: "none",
            transition: "all 0.2s",
            width: "100%",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg)";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--fg)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--fg)";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)";
          }}
        >
          View Profile →
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN LIST CLIENT
   ───────────────────────────────────────────────────────────── */
export function UniversityListClient({ defaultCountry = "" }: UniversityListClientProps) {
  const [country, setCountry] = useState(normalizeCountry(defaultCountry));
  const [query, setQuery] = useState("");

  const { data, isLoading, isError } = useUniversities({
    country: toApiCountry(country),
    search: query || undefined,
    per_page: 48,
  });

  const universities = useMemo(() => asUniversities(data), [data]);

  return (
    <div>
      {/* ── Filter Bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2.5rem",
          paddingBottom: "1.5rem",
          borderBottom: "1px solid var(--border)",
          flexWrap: "wrap",
        }}
      >
        {/* Search Input */}
        <div style={{ position: "relative", flex: "1 1 300px" }}>
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }}
          >
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search universities, cities, or rankings..."
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              letterSpacing: "0.02em",
              padding: "12px 16px 12px 42px",
              borderRadius: 9999,
              border: "1px solid var(--border)",
              background: "var(--elev)",
              color: "var(--fg)",
              outline: "none",
              width: "100%",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--fg)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>

        {/* Country Dropdown */}
        <div style={{ position: "relative", flexShrink: 0, minWidth: 200 }}>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.04em",
              padding: "12px 40px 12px 16px",
              borderRadius: 9999,
              border: `1px solid ${country !== "" ? "var(--fg)" : "var(--border)"}`,
              background: country !== "" ? "var(--fg)" : "var(--elev)",
              color: country !== "" ? "var(--bg)" : "var(--fg)",
              outline: "none",
              cursor: "pointer",
              appearance: "none",
              WebkitAppearance: "none",
              transition: "all 0.2s",
              width: "100%",
            }}
          >
            {COUNTRY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} style={{ background: "var(--bg)", color: "var(--fg)" }}>
                {option.label}
              </option>
            ))}
          </select>
          <svg
            width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{
              position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
              pointerEvents: "none",
              color: country !== "" ? "var(--bg)" : "var(--muted)",
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* ── Status Messages ── */}
      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
          <div style={{ height: 24, width: 24, borderRadius: "50%", border: "2px solid var(--border)", borderTopColor: "var(--fg)", animation: "spin 1s linear infinite" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {isError && (
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <p style={{ color: "#FF5F57", fontSize: 14 }}>Could not load universities right now. Please try again.</p>
        </div>
      )}

      {!isLoading && !isError && universities.length === 0 && (
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: "4rem 2rem",
            background: "var(--elev)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: "1rem" }}>🌍</div>
          <p style={{ color: "var(--fg)", fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No universities found</p>
          <p style={{ color: "var(--muted)", fontSize: 14, maxWidth: 400, margin: "0 auto" }}>
            We couldn't find any universities matching your filters. Try adjusting the search term or country.
          </p>
        </div>
      )}

      {/* ── Grid ── */}
      {!isLoading && !isError && universities.length > 0 && (
        <>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.5rem" }}>
            Showing {universities.length} universities
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {universities.map((university, index) => (
              <UniversityCard key={university.id ?? university.slug} university={university} index={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE COMPONENT
   ───────────────────────────────────────────────────────────── */
export function UniversitiesPage() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100vh" }}>
      {/* ── Hero Section ── */}
      <section 
        style={{ 
          padding: "calc(var(--nav-h, 80px) + 4rem) 2rem 4rem",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Subtle background hatched pattern */}
        <div 
          style={{ 
            position: "absolute", 
            top: 0, right: 0, bottom: 0, left: 0,
            background: "repeating-linear-gradient(45deg, var(--border) 0 1px, transparent 1px 16px)",
            opacity: 0.3,
            pointerEvents: "none",
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }} 
        />
        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
          <div
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--fg)",
              marginBottom: "1.5rem",
              display: "inline-block",
              border: "1px solid var(--fg)",
              padding: "4px 12px",
              borderRadius: 9999,
              background: "var(--bg)",
            }}
          >
            Global Explorer
          </div>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontWeight: 600,
              maxWidth: 800,
            }}
          >
            Compare elite universities across top destinations.
          </h1>
          <p style={{ color: "var(--muted)", maxWidth: 650, marginTop: "1.5rem", fontSize: "1.1rem", lineHeight: 1.7 }}>
            Explore verified profiles, QS rankings, tuition estimates, and admission requirements for the world's most sought-after institutions.
          </p>
        </div>
      </section>

      {/* ── List Section ── */}
      <section style={{ padding: "4rem 2rem 6rem" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <UniversityListClient />
        </div>
      </section>
    </main>
  );
}