"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useUniversities } from "~/hooks/use-universities";
import { formatCurrency } from "~/lib/utils";

/* ── Types ─────────────────────────────────────────────────── */
interface University {
  id: string | number;
  slug?: string;
  name: string;
  country?: string;
  city?: string | null;
  world_ranking?: number | null;
  qs_ranking?: number | null;
  avg_tuition_usd?: number | null;
  tuition_min?: number | null;
  tuition_max?: number | null;
  qs_rank?: number | null;
  intakes?: string | null;
  intake_months?: string | null;
  programs?: any;
  is_featured?: boolean;
}

interface CourseRow {
  university: University;
  program: string;
  duration_months: number | null;
  tuition_usd: number | null;
  idx: number;
}

/* ── Constants ─────────────────────────────────────────────── */
const COUNTRIES = [
  "USA", "UK", "Canada", "Australia",
  "Germany", "France", "Ireland", "New Zealand",
];

const CATEGORIES = [
  "All",
  "Computer Science",
  "Engineering",
  "Business & MBA",
  "Medicine & Health",
  "Law",
  "Data Science",
  "Architecture",
  "Natural Sciences",
];

const DURATIONS = ["All", "1 year", "2 years", "3 years", "4 years"];

/* ── Country flag map ───────────────────────────────────────── */
const FLAG: Record<string, string> = {
  USA: "🇺🇸", UK: "🇬🇧", Canada: "🇨🇦", Australia: "🇦🇺",
  Germany: "🇩🇪", France: "🇫🇷", Ireland: "🇮🇪", "New Zealand": "🇳🇿",
};

/* ── Mac traffic-light dots ─────────────────────────────────── */
const DOTS = [{ c: "#FF5F57" }, { c: "#FEBC2E" }, { c: "#28C840" }];

/* ── Hatched bg per index (matches scholarship page) ─────────── */
function hatch(i: number) {
  return `repeating-linear-gradient(${45 + (i % 6) * 25}deg, var(--border) 0 6px, var(--elev) 6px 14px)`;
}

/* ── Normalise programs to rich objects ─────────────────────── */
function toPrograms(raw: any): Array<{name: string, duration_months: number | null, tuition_usd: number | null}> {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.map((p) => {
      if (!p) return null;
      if (typeof p === "string") return { name: p.trim(), duration_months: null, tuition_usd: null };
      if (typeof p === "object" && p !== null) {
        // Handle case where p.name might be missing or not a string
        const nameStr = typeof p.name === "string" ? p.name.trim() : String(p.name || "");
        return { 
          name: nameStr, 
          duration_months: p.duration_months ?? null, 
          tuition_usd: p.tuition_usd ?? null 
        };
      }
      return null;
    }).filter(Boolean) as Array<{name: string, duration_months: number | null, tuition_usd: number | null}>;
  }
  if (typeof raw === "string") {
    return raw.split(",").map((p) => {
      if (typeof p === "string") return { name: p.trim(), duration_months: null, tuition_usd: null };
      return { name: String(p).trim(), duration_months: null, tuition_usd: null };
    }).filter(p => !!p.name);
  }
  return [];
}

/* ── Extract universities from any API shape ─────────────────── */
function asUniversities(raw: unknown): University[] {
  if (Array.isArray(raw)) return raw as University[];
  if (raw && typeof raw === "object") {
    const v = raw as Record<string, unknown>;
    if (Array.isArray(v.items)) return v.items as University[];
    if (Array.isArray(v.data)) return v.data as University[];
    if (Array.isArray(v.results)) return v.results as University[];
  }
  return [];
}

/* ── Category match helper ───────────────────────────────────── */
function matchesCategory(program: string, category: string): boolean {
  if (category.toLowerCase() === "all") return true;
  
  const p = program.toLowerCase();
  const c = category.toLowerCase();
  if (c.includes("business") || c.includes("mba")) {
    return p.includes("business") || p.includes("mba") || p.includes("management");
  }
  if (c.includes("medicine") || c.includes("health")) {
    return p.includes("medicine") || p.includes("health");
  }
  if (c.includes("natural")) {
    return p.includes("natural") || p.includes("science") || p.includes("physics") || p.includes("biology") || p.includes("arts") || p.includes("political");
  }
  
  return p.includes(c.split(" ")[0]);
}

/* ── Duration match helper ───────────────────────────────────── */
function matchesDuration(row: CourseRow, duration: string): boolean {
  if (duration === "All") return true;
  
  const m = row.duration_months;
  if (!m) return true; // Pass through if duration is unknown

  if (duration === "1 year") return m <= 12;
  if (duration === "2 years") return m > 12 && m <= 24;
  if (duration === "3 years") return m > 24 && m <= 36;
  if (duration === "4 years") return m > 36;
  return true;
}

/* ── Tuition display ─────────────────────────────────────────── */
function tuitionDisplay(row: CourseRow): string {
  const { university, tuition_usd } = row;
  if (tuition_usd) return `${formatCurrency(tuition_usd)}/yr`;
  
  const min = university.tuition_min ?? university.avg_tuition_usd;
  const max = university.tuition_max;
  if (!min && !max) return "Contact university";
  if (min && max && min !== max) return `${formatCurrency(min)} – ${formatCurrency(max)}/yr`;
  if (min) return `${formatCurrency(min)}/yr`;
  return "Contact university";
}

/* ── QS rank display ─────────────────────────────────────────── */
function rankDisplay(u: University): string | null {
  const r = u.qs_rank ?? u.qs_ranking ?? u.world_ranking;
  if (!r) return null;
  return `QS #${r}`;
}

/* ─────────────────────────────────────────────────────────────
   CARD
   ───────────────────────────────────────────────────────────── */
function CourseCard({ row }: { row: CourseRow }) {
  const ref = useRef<HTMLDivElement>(null);
  const { university, program, duration_months, idx } = row;

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
          }, (idx % 8) * 45);
          obs.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [idx]);

  const flag = FLAG[university.country ?? ""] ?? "🌍";
  const rank = rankDisplay(university);

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
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--fg)";
        e.currentTarget.style.boxShadow = "0 10px 32px rgba(0,0,0,0.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
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
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          {String(idx + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Hatched visual band */}
      <div
        style={{
          height: 52,
          background: hatch(idx),
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
              fontSize: 9,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              background: "var(--elev)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              padding: "3px 8px",
            }}
          >
            {rank}
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {/* University name */}
        <p
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--fg)",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
          }}
        >
          {university.name}
        </p>

        {/* Program name */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--muted)",
            letterSpacing: "0.04em",
            lineHeight: 1.4,
          }}
        >
          {program} {duration_months && `· ${duration_months} mo`}
        </p>

        {/* Country */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: "0.25rem" }}>
          <span style={{ fontSize: 14 }}>{flag}</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {university.country ?? "International"}
            {university.city ? ` · ${university.city}` : ""}
          </span>
        </div>
      </div>

      {/* Stat bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1.25rem",
          borderTop: "1px solid var(--border)",
          background: "var(--bg)",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 3,
            }}
          >
            Tuition
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--fg)",
              letterSpacing: "0.02em",
            }}
          >
            {tuitionDisplay(row)}
          </p>
        </div>

        <Link
          href="/consultation"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--fg)",
            border: "1px solid var(--border)",
            borderRadius: 9999,
            padding: "5px 14px",
            background: "var(--bg)",
            whiteSpace: "nowrap",
            textDecoration: "none",
            transition: "background 0.2s, color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--fg)";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--fg)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg)";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--fg)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
          }}
        >
          Enquire Now →
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SKELETON
   ───────────────────────────────────────────────────────────── */
function CourseCardSkeleton({ index }: { index: number }) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 14,
        overflow: "hidden",
        background: "var(--elev)",
      }}
    >
      {/* Chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "0.75rem 1.25rem", borderBottom: "1px solid var(--border)", background: "var(--bg)" }}>
        {DOTS.map((d) => (
          <span key={d.c} style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--border)", display: "block" }} />
        ))}
      </div>
      {/* Hatch placeholder */}
      <div style={{ height: 52, background: "var(--border)", opacity: 0.35, animation: "pulse 1.5s ease-in-out infinite" }} />
      {/* Body shimmer */}
      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div style={{ height: 16, width: `${60 + (index % 4) * 10}%`, background: "var(--border)", borderRadius: 4, animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ height: 11, width: "45%", background: "var(--border)", borderRadius: 4, animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ height: 10, width: "30%", background: "var(--border)", borderRadius: 4, animation: "pulse 1.5s ease-in-out infinite" }} />
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:.75} }`}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PILL BUTTON (reusable)
   ───────────────────────────────────────────────────────────── */
function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "6px 14px",
        borderRadius: 9999,
        border: `1px solid ${active ? "var(--fg)" : "var(--border)"}`,
        background: active ? "var(--fg)" : "transparent",
        color: active ? "var(--bg)" : "var(--muted)",
        cursor: "pointer",
        transition: "all 0.18s ease",
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────────────────────── */
export function CourseFinder() {
  /* ── Filter state ── */
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [budgetMax, setBudgetMax] = useState(60000);
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* ── Fetch universities (load a large page, filter client-side) ── */
  const { data: rawData, isLoading, isError } = useUniversities({ per_page: 200 });
  const universities = useMemo(() => asUniversities(rawData), [rawData]);

  /* ── Explode to (university, program) pairs ── */
  const allRows = useMemo<CourseRow[]>(() => {
    const rows: CourseRow[] = [];
    universities.forEach((u) => {
      const progs = toPrograms(u.programs);
      // If no programs data, synthesise a generic placeholder per university
      const effectiveProgs = progs.length > 0 ? progs : [{ name: "General Programme", duration_months: null, tuition_usd: null }];
      effectiveProgs.forEach((prog) => {
        rows.push({ university: u, program: prog.name, duration_months: prog.duration_months, tuition_usd: prog.tuition_usd, idx: rows.length });
      });
    });
    return rows;
  }, [universities]);

  /* ── Client-side filtering ── */
  const filtered = useMemo<CourseRow[]>(() => {
    const q = searchQuery.toLowerCase().trim();
    const catNorm = selectedCategory.toLowerCase();
    const budgetMaxUsd = budgetMax;

    return allRows
      .filter((row) => {
        const { university, program } = row;
        
        /* Country multi-select */
        if (
          selectedCountries.length > 0 &&
          !selectedCountries.includes(university.country ?? "")
        ) return false;

        /* Category */
        if (!matchesCategory(program, selectedCategory)) return false;

        /* Budget */
        if (budgetMaxUsd < 60000) {
          const tuition = row.tuition_usd ?? university.tuition_max ?? university.avg_tuition_usd ?? university.tuition_min ?? 0;
          if (tuition > 0 && tuition > budgetMaxUsd) return false;
        }

        /* Duration */
        if (!matchesDuration(row, selectedDuration)) return false;

        /* Text search */
        if (q) {
          const haystack = [university.name, program, university.country, university.city]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          if (!haystack.includes(q)) return false;
        }

        return true;
      })
      /* Re-index after filter */
      .map((r, i) => ({ ...r, idx: i }));
  }, [allRows, selectedCountries, selectedCategory, budgetMax, selectedDuration, searchQuery]);

  /* ── Country toggle helper ── */
  const toggleCountry = (c: string) =>
    setSelectedCountries((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  /* ── Clear all filters ── */
  const hasFilters =
    selectedCountries.length > 0 ||
    selectedCategory !== "all" ||
    budgetMax < 60000 ||
    selectedDuration !== "all" ||
    searchQuery !== "";

  return (
    <div>
      {/* ══════════════════════════════════════════════════════════
          FILTER BAR
          ══════════════════════════════════════════════════════════ */}
      <div
        className="schol-filter-bar"
        style={{
          padding: "2rem 0",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* Row 1: search + category select + clear */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {/* Search */}
          <div className="schol-search-input" style={{ position: "relative", flex: "1 1 220px" }}>
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }}
            >
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search universities or courses…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                width: "100%",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--fg)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Category select */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                padding: "8px 36px 8px 14px",
                borderRadius: 9999,
                border: `1px solid ${selectedCategory !== "all" ? "var(--fg)" : "var(--border)"}`,
                background: selectedCategory !== "all" ? "var(--fg)" : "var(--elev)",
                color: selectedCategory !== "all" ? "var(--bg)" : "var(--muted)",
                outline: "none",
                cursor: "pointer",
                appearance: "none",
                WebkitAppearance: "none",
                transition: "all 0.18s",
              }}
            >
              {CATEGORIES.map((cat) => (
                <option
                  key={cat}
                  value={cat === "All" ? "all" : cat}
                  style={{ background: "var(--bg)", color: "var(--fg)" }}
                >
                  {cat}
                </option>
              ))}
            </select>
            {/* Chevron icon */}
            <svg
              width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                pointerEvents: "none",
                color: selectedCategory !== "all" ? "var(--bg)" : "var(--muted)",
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Clear filters */}
          {hasFilters && (
            <button
              onClick={() => {
                setSelectedCountries([]);
                setSelectedCategory("all");
                setBudgetMax(60000);
                setSelectedDuration("all");
                setSearchQuery("");
              }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "6px 14px",
                borderRadius: 9999,
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--muted)",
                cursor: "pointer",
                flexShrink: 0,
                transition: "all 0.18s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--fg)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--fg)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
              }}
            >
              Clear ×
            </button>
          )}
        </div>

        {/* Row 2: Country pills */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "0.625rem",
            }}
          >
            Country
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <Pill
              active={selectedCountries.length === 0}
              onClick={() => setSelectedCountries([])}
            >
              All
            </Pill>
            {COUNTRIES.map((c) => (
              <Pill
                key={c}
                active={selectedCountries.includes(c)}
                onClick={() => toggleCountry(c)}
              >
                {FLAG[c]} {c}
              </Pill>
            ))}
          </div>
        </div>

        {/* Row 3: Budget slider + Duration pills */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "3rem",
            flexWrap: "wrap",
          }}
        >
          {/* Budget slider */}
          <div style={{ flex: "1 1 260px", minWidth: 220 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.625rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                Max Budget
              </p>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--fg)",
                  letterSpacing: "0.02em",
                }}
              >
                {budgetMax >= 60000 ? "Any" : `Up to $${(budgetMax / 1000).toFixed(0)}k/yr`}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={60000}
              step={1000}
              value={budgetMax}
              onChange={(e) => setBudgetMax(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--fg)" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.3rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", opacity: 0.5 }}>$0</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", opacity: 0.5 }}>$60k</span>
            </div>
          </div>

          {/* Duration pills */}
          <div style={{ flexShrink: 0 }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "0.625rem",
              }}
            >
              Duration
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              {DURATIONS.map((d) => (
                <Pill
                  key={d}
                  active={selectedDuration === (d === "All" ? "all" : d)}
                  onClick={() => setSelectedDuration(d === "All" ? "all" : d)}
                >
                  {d}
                </Pill>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Result count row ── */}
      {!isLoading && (
        <div
          style={{
            paddingTop: "1.75rem",
            paddingBottom: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
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
            {filtered.length} {filtered.length === 1 ? "course" : "courses"} found
          </p>
          {selectedCountries.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              {selectedCountries.map((c) => (
                <span
                  key={c}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--fg)",
                    border: "1px solid var(--fg)",
                    borderRadius: 9999,
                    padding: "2px 10px",
                  }}
                >
                  {FLAG[c]} {c}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Error ── */}
      {isError && (
        <div style={{ padding: "3rem 0", textAlign: "center", borderTop: "1px solid var(--border)" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>
            Failed to load course data. Please try again.
          </p>
        </div>
      )}

      {/* ── Loading skeleton grid ── */}
      {isLoading && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
            paddingTop: "1.75rem",
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <CourseCardSkeleton key={i} index={i} />
          ))}
        </div>
      )}

      {/* ── Empty state ── */}
      {!isLoading && !isError && filtered.length === 0 && (
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
              marginBottom: "0.75rem",
            }}
          >
            No courses match your filters
          </p>
          <p style={{ fontSize: 14, color: "var(--muted)" }}>
            Try broadening your search — adjust the country, category, or budget.
          </p>
        </div>
      )}

      {/* ── Course card grid ── */}
      {!isLoading && !isError && filtered.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
            paddingTop: "1.75rem",
            paddingBottom: "4rem",
          }}
        >
          {filtered.map((row) => (
            <CourseCard key={`${row.university.id}-${row.program}`} row={row} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseFinder;
