"use client";

import { useState, useEffect, useRef } from "react";
import { lendersApi } from "~/lib/api";
import { useLenders } from "~/hooks/use-lenders";
import { formatCurrency } from "~/lib/utils";
import { EMICalculator } from "~/components/sections/emi-calculator-client";

/* ── Types ─────────────────────────────────────────────────── */
interface Lender {
  id: string | number;
  name: string;
  lender_type?: string;
  interest_rate_min?: number;
  interest_rate_max?: number;
  max_loan_amount_usd?: number;
  min_loan_amount_usd?: number;
  processing_fee_pct?: number;
  moratorium_months?: number;
  repayment_tenure_months?: number;
  approval_days?: number;
  requires_collateral?: boolean;
  requires_co_applicant?: boolean;
  eligible_countries?: string;
  is_featured?: boolean;
  website_url?: string;
  cta_url?: string;
  description?: string;
  slug?: string;
}

/* ── Wizard steps ─────────────────────────────────────────── */
const STEPS = ["Destination", "Academics", "Financial", "Contact"];

const INITIAL_DATA = {
  target_country: "",
  target_course: "",
  target_university: "",
  cgpa: "",
  work_experience_years: "",
  family_income_usd: "",
  has_co_applicant: false,
  has_collateral: false,
  collateral_value_usd: "",
  full_name: "",
  email: "",
  phone: "",
};

const COUNTRIES = ["USA", "UK", "Canada", "Australia", "Germany", "Ireland", "France", "New Zealand"];

/* ── Mac dots ─────────────────────────────────────────────── */
const DOTS = [{ c: "#FF5F57" }, { c: "#FEBC2E" }, { c: "#28C840" }];

/* ── Shared input style ──────────────────────────────────── */
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid var(--border)",
  background: "var(--bg)",
  color: "var(--fg)",
  fontSize: 14,
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

/* ── Field label ─────────────────────────────────────────── */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--muted)",
        marginBottom: 6,
      }}
    >
      {children}
    </p>
  );
}

/* ── Scroll-reveal ────────────────────────────────────────── */
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
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ── Lender type badge ───────────────────────────────────── */
function LenderTypeBadge({ type }: { type?: string }) {
  const labels: Record<string, string> = {
    nbfc: "NBFC",
    bank: "Bank",
    "psu-bank": "PSU Bank",
    international: "International",
    fintech: "Fintech",
  };
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--muted)",
        border: "1px solid var(--border)",
        borderRadius: 6,
        padding: "2px 7px",
        whiteSpace: "nowrap",
      }}
    >
      {labels[type ?? ""] ?? type ?? "Lender"}
    </span>
  );
}

/* ── Single lender row card ──────────────────────────────── */
function LenderCard({ lender, index }: { lender: Lender; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

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

  const hatch = `repeating-linear-gradient(${45 + (index % 6) * 25}deg, var(--border) 0 6px, var(--elev) 6px 14px)`;

  return (
    <div ref={cardRef} style={{ borderTop: "1px solid var(--border)" }}>
      {/* Chrome bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.875rem 0",
          gap: "1rem",
        }}
      >
        {/* Left */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
            {DOTS.map((d) => (
              <span key={d.c} style={{ width: 9, height: 9, borderRadius: "50%", background: d.c, display: "block", flexShrink: 0 }} />
            ))}
          </div>
          <span style={{ width: 1, height: 14, background: "var(--border)", display: "block", flexShrink: 0 }} />
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
            <p style={{ fontSize: 15, fontWeight: 600, color: "var(--fg)", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {lender.name}
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", marginTop: 2, letterSpacing: "0.04em" }}>
              {lender.description ? lender.description.slice(0, 60) + (lender.description.length > 60 ? "…" : "") : lender.lender_type}
            </p>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexShrink: 0 }}>
          <LenderTypeBadge type={lender.lender_type} />
          <div style={{ textAlign: "right" }} className="lender-meta-right">
            {lender.interest_rate_min != null && (
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.04em" }}>
                {lender.interest_rate_min}–{lender.interest_rate_max}% p.a.
              </p>
            )}
            {lender.approval_days != null && (
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.04em" }}>
                {lender.approval_days}d approval
              </p>
            )}
          </div>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted)", flexShrink: 0 }}>
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>

      {/* Expanded body */}
      <div style={{ width: "100%", borderRadius: 14, overflow: "hidden", border: "1px solid var(--border)", marginBottom: "2rem" }}>
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
            {lender.interest_rate_min != null && (
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 2 }}>Interest Rate</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "var(--fg)", letterSpacing: "0.02em" }}>
                  {lender.interest_rate_min}–{lender.interest_rate_max}%
                </p>
              </div>
            )}
            {lender.max_loan_amount_usd != null && (
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 2 }}>Max Loan</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "var(--fg)", letterSpacing: "0.02em" }}>
                  {formatCurrency(lender.max_loan_amount_usd)}
                </p>
              </div>
            )}
            {lender.moratorium_months != null && (
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 2 }}>Moratorium</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "var(--fg)", letterSpacing: "0.02em" }}>
                  {lender.moratorium_months}mo
                </p>
              </div>
            )}
            {lender.repayment_tenure_months != null && (
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 2 }}>Tenure</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "var(--fg)", letterSpacing: "0.02em" }}>
                  {Math.round((lender.repayment_tenure_months ?? 0) / 12)}yr
                </p>
              </div>
            )}
          </div>

          {lender.cta_url ? (
            <a
              href={lender.cta_url}
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
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--fg)"; e.currentTarget.style.color = "var(--bg)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg)"; e.currentTarget.style.color = "var(--fg)"; }}
            >
              Apply Now →
            </a>
          ) : (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 500, color: "var(--muted)", border: "1px solid var(--border)", borderRadius: 9999, padding: "5px 14px", background: "var(--bg)", whiteSpace: "nowrap" }}>
              View Lender →
            </span>
          )}
        </div>

        {/* Hatched area */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16/4",
            background: hatch,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.5rem 1.75rem",
          }}
        >
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
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>
              {lender.lender_type?.toUpperCase() ?? "LENDER"}
            </span>
            {lender.requires_collateral === false && (
              <>
                <span style={{ width: 1, height: 12, background: "var(--border)", display: "block" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#28C840", fontWeight: 600 }}>No Collateral</span>
              </>
            )}
            {lender.eligible_countries && (
              <>
                <span style={{ width: 1, height: 12, background: "var(--border)", display: "block" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {lender.eligible_countries}
                </span>
              </>
            )}
          </div>

          {lender.processing_fee_pct != null && (
            <div
              style={{
                background: "var(--elev)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "0.625rem 1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Processing: {lender.processing_fee_pct}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Lender Skeleton ─────────────────────────────────────── */
function LenderSkeleton({ index }: { index: number }) {
  return (
    <div style={{ borderTop: "1px solid var(--border)", paddingBottom: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.875rem 0" }}>
        <div style={{ display: "flex", gap: 5 }}>
          {DOTS.map((d) => <span key={d.c} style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--border)", display: "block" }} />)}
        </div>
        <div style={{ width: 1, height: 14, background: "var(--border)" }} />
        <div style={{ width: 24, height: 10, background: "var(--border)", borderRadius: 4 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ width: `${120 + (index % 4) * 40}px`, height: 14, background: "var(--border)", borderRadius: 4 }} />
          <div style={{ width: 80, height: 10, background: "var(--border)", borderRadius: 4 }} />
        </div>
      </div>
      <div style={{ width: "100%", aspectRatio: "16/4", background: "var(--border)", borderRadius: 14, opacity: 0.4, animation: "pulse 1.5s ease-in-out infinite" }} />
      <style>{`@keyframes pulse{0%,100%{opacity:.4}50%{opacity:.7}}`}</style>
    </div>
  );
}

/* ── Eligibility Wizard ──────────────────────────────────── */
function EligibilityWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(INITIAL_DATA);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [animDir, setAnimDir] = useState<"fwd" | "bwd">("fwd");
  const [visible, setVisible] = useState(true);

  const setField = (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const val = (e.target as HTMLInputElement).type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
      setData((p) => ({ ...p, [field]: val }));
    };

  const navigate = (dir: "fwd" | "bwd") => {
    setAnimDir(dir);
    setVisible(false);
    setTimeout(() => {
      setStep((s) => dir === "fwd" ? s + 1 : s - 1);
      setVisible(true);
    }, 200);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...data,
        cgpa: data.cgpa ? Number(data.cgpa) : undefined,
        work_experience_years: data.work_experience_years ? Number(data.work_experience_years) : undefined,
        family_income_usd: data.family_income_usd ? Number(data.family_income_usd) : undefined,
        collateral_value_usd: data.collateral_value_usd ? Number(data.collateral_value_usd) : undefined,
      };
      const res = await lendersApi.assess(payload);
      setResult(res.data);
    } catch {
      setError("Assessment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Result screen ── */
  if (result) {
    return (
      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: 18,
          overflow: "hidden",
          background: "var(--elev)",
        }}
      >
        {/* Chrome bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.875rem 1.5rem", borderBottom: "1px solid var(--border)", background: "var(--bg)" }}>
          {DOTS.map((d) => <span key={d.c} style={{ width: 10, height: 10, borderRadius: "50%", background: d.c, display: "block" }} />)}
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", marginLeft: 8, letterSpacing: "0.08em" }}>ASSESSMENT RESULT</span>
        </div>
        <div style={{ padding: "2.5rem" }}>
          {/* Check icon */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.75rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(40,200,64,0.12)", border: "1px solid #28C840", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#28C840" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#28C840", marginBottom: 2 }}>Assessment Complete</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: "var(--fg)" }}>Your Loan Profile</p>
            </div>
          </div>

          {/* Amount */}
          <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "2rem 0", marginBottom: "1.75rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>Estimated Eligibility</p>
            <p
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: 500,
                letterSpacing: "-0.04em",
                color: "var(--fg)",
                lineHeight: 1,
              }}
            >
              {formatCurrency(result.estimated_eligibility_amount ?? 0)}
            </p>
            {result.assessment_result?.recommendation && (
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, marginTop: "1rem", maxWidth: "52ch" }}>
                {result.assessment_result.recommendation}
              </p>
            )}
          </div>

          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em", marginBottom: "1.5rem" }}>
            {result.eligible_lender_ids?.length ?? 0} lenders matched your profile
          </p>

          <button
            onClick={() => { setResult(null); setStep(0); setData(INITIAL_DATA); setError(null); }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "8px 18px",
              borderRadius: 9999,
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--muted)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--fg)"; e.currentTarget.style.color = "var(--fg)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 18,
        overflow: "hidden",
        background: "var(--elev)",
      }}
    >
      {/* Chrome bar with step tracker */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.875rem 1.5rem",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {DOTS.map((d) => <span key={d.c} style={{ width: 10, height: 10, borderRadius: "50%", background: d.c, display: "block" }} />)}
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", marginLeft: 8, letterSpacing: "0.08em" }}>
            LOAN ELIGIBILITY CHECKER
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }} className="wizard-step-tracker">
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: `1px solid ${i <= step ? "var(--fg)" : "var(--border)"}`,
                  background: i < step ? "var(--fg)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s",
                }}
              >
                {i < step ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--bg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: i === step ? "var(--fg)" : "var(--muted)" }}>{i + 1}</span>
                )}
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ width: 18, height: 1, background: i < step ? "var(--fg)" : "var(--border)", transition: "background 0.3s" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div
        style={{
          padding: "2.5rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : animDir === "fwd" ? "translateX(12px)" : "translateX(-12px)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.5rem" }}>
          Step {step + 1} of {STEPS.length} — {STEPS[step]}
        </p>

        {step === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 500, letterSpacing: "-0.03em", color: "var(--fg)", lineHeight: 1.2, marginBottom: "0.5rem" }}>
              Where do you want to study?
            </h3>
            <div>
              <FieldLabel>Target Country</FieldLabel>
              <select
                value={data.target_country}
                onChange={setField("target_country")}
                style={{ ...inputStyle }}
                onFocus={(e) => e.target.style.borderColor = "var(--fg)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              >
                <option value="">Select a country…</option>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <FieldLabel>Course / Program</FieldLabel>
              <input
                type="text"
                placeholder="e.g. MS Computer Science"
                value={data.target_course}
                onChange={setField("target_course")}
                style={{ ...inputStyle }}
                onFocus={(e) => e.target.style.borderColor = "var(--fg)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
            </div>
            <div>
              <FieldLabel>University (optional)</FieldLabel>
              <input
                type="text"
                placeholder="e.g. University of Toronto"
                value={data.target_university}
                onChange={setField("target_university")}
                style={{ ...inputStyle }}
                onFocus={(e) => e.target.style.borderColor = "var(--fg)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 500, letterSpacing: "-0.03em", color: "var(--fg)", lineHeight: 1.2, marginBottom: "0.5rem" }}>
              Tell us about your academics
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="wizard-grid">
              <div>
                <FieldLabel>CGPA (0–10)</FieldLabel>
                <input
                  type="number"
                  placeholder="e.g. 7.8"
                  value={data.cgpa}
                  onChange={setField("cgpa")}
                  min={0} max={10} step={0.01}
                  style={{ ...inputStyle }}
                  onFocus={(e) => e.target.style.borderColor = "var(--fg)"}
                  onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                />
              </div>
              <div>
                <FieldLabel>Work Experience (years)</FieldLabel>
                <input
                  type="number"
                  placeholder="e.g. 2"
                  value={data.work_experience_years}
                  onChange={setField("work_experience_years")}
                  min={0}
                  style={{ ...inputStyle }}
                  onFocus={(e) => e.target.style.borderColor = "var(--fg)"}
                  onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 500, letterSpacing: "-0.03em", color: "var(--fg)", lineHeight: 1.2, marginBottom: "0.5rem" }}>
              Financial background
            </h3>
            <div>
              <FieldLabel>Annual Family Income (USD)</FieldLabel>
              <input
                type="number"
                placeholder="e.g. 30000"
                value={data.family_income_usd}
                onChange={setField("family_income_usd")}
                min={0}
                style={{ ...inputStyle }}
                onFocus={(e) => e.target.style.borderColor = "var(--fg)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
            </div>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {[
                { field: "has_co_applicant", label: "I have a co-applicant" },
                { field: "has_collateral", label: "I have collateral" },
              ].map(({ field, label }) => (
                <label
                  key={field}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 5,
                      border: `1px solid ${(data as any)[field] ? "var(--fg)" : "var(--border)"}`,
                      background: (data as any)[field] ? "var(--fg)" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.15s",
                    }}
                  >
                    {(data as any)[field] && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--bg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={(data as any)[field]}
                    onChange={setField(field)}
                    style={{ display: "none" }}
                  />
                  <span style={{ fontSize: 14, color: "var(--fg)" }}>{label}</span>
                </label>
              ))}
            </div>
            {data.has_collateral && (
              <div>
                <FieldLabel>Collateral Value (USD)</FieldLabel>
                <input
                  type="number"
                  placeholder="e.g. 50000"
                  value={data.collateral_value_usd}
                  onChange={setField("collateral_value_usd")}
                  min={0}
                  style={{ ...inputStyle }}
                  onFocus={(e) => e.target.style.borderColor = "var(--fg)"}
                  onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                />
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 500, letterSpacing: "-0.03em", color: "var(--fg)", lineHeight: 1.2, marginBottom: "0.5rem" }}>
              Almost there
            </h3>
            <div>
              <FieldLabel>Full Name *</FieldLabel>
              <input
                type="text"
                placeholder="Jane Smith"
                value={data.full_name}
                onChange={setField("full_name")}
                required
                style={{ ...inputStyle }}
                onFocus={(e) => e.target.style.borderColor = "var(--fg)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
            </div>
            <div>
              <FieldLabel>Email *</FieldLabel>
              <input
                type="email"
                placeholder="you@example.com"
                value={data.email}
                onChange={setField("email")}
                required
                style={{ ...inputStyle }}
                onFocus={(e) => e.target.style.borderColor = "var(--fg)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
            </div>
            <div>
              <FieldLabel>Phone (optional)</FieldLabel>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={data.phone}
                onChange={setField("phone")}
                style={{ ...inputStyle }}
                onFocus={(e) => e.target.style.borderColor = "var(--fg)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
            </div>
          </div>
        )}

        {error && (
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#FF5F57", marginTop: "1.25rem", letterSpacing: "0.04em" }}>
            {error}
          </p>
        )}
      </div>

      {/* Nav bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 2.5rem",
          borderTop: "1px solid var(--border)",
          background: "var(--bg)",
        }}
      >
        <button
          onClick={() => navigate("bwd")}
          disabled={step === 0}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "8px 18px",
            borderRadius: 9999,
            border: "1px solid var(--border)",
            background: "transparent",
            color: step === 0 ? "var(--border)" : "var(--muted)",
            cursor: step === 0 ? "not-allowed" : "pointer",
            transition: "all 0.2s",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => navigate("fwd")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "8px 18px",
              borderRadius: 9999,
              border: "1px solid var(--fg)",
              background: "var(--fg)",
              color: "var(--bg)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Next
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading || !data.email || !data.full_name}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "8px 20px",
              borderRadius: 9999,
              border: "1px solid var(--fg)",
              background: loading || !data.email || !data.full_name ? "var(--border)" : "var(--fg)",
              color: "var(--bg)",
              cursor: loading || !data.email || !data.full_name ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Checking…" : "Check Eligibility"}
            {!loading && (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Loans Page ──────────────────────────────────────────── */
export function LoansPage() {
  const heroRef = useScrollReveal(0);
  const { data: lendersData, isLoading } = useLenders();
  const lenders: Lender[] = lendersData?.items ?? lendersData ?? [];

  return (
    <main style={{ paddingTop: "var(--nav-h, 72px)", background: "var(--bg)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* ── Hero header ── */}
        <div style={{ padding: "4rem 0 3rem", borderBottom: "1px solid var(--border)" }}>
          <div ref={heroRef}>
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
              Education Loans
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
              Loans
            </h1>
          </div>
        </div>

        {/* ── Two-col: copy + wizard ── */}
        <div
          className="loans-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "4rem",
            padding: "4rem 0 6rem",
            borderBottom: "1px solid var(--border)",
            alignItems: "start",
          }}
        >
          {/* Left copy */}
          <div>
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
              Eligibility Checker
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 4rem)",
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "var(--fg)",
                marginBottom: "1.5rem",
              }}
            >
              Check your
              <br />
              loan eligibility
            </h2>
            <p
              style={{
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.75,
                color: "var(--muted)",
                marginBottom: "2rem",
                maxWidth: "42ch",
              }}
            >
              Our multi-step assessment matches your academic and financial profile
              to the best lenders — giving you a realistic eligibility estimate in minutes.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                "Compare 20+ lenders side-by-side",
                "Personalised loan estimate",
                "100% free — no credit check",
                "Instant lender match",
              ].map((b) => (
                <div key={b} style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--fg)", flexShrink: 0, opacity: 0.7 }} />
                  <span style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: wizard */}
          <div>
            <EligibilityWizard />
          </div>
        </div>

        {/* ── Lender directory ── */}
        <div>
          <div
            style={{
              padding: "3rem 0 2rem",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
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
                Lender Directory
              </p>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 4.5rem)",
                  fontWeight: 500,
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  color: "var(--fg)",
                }}
              >
                All Lenders
              </h2>
            </div>
            {!isLoading && lenders.length > 0 && (
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em" }}>
                {lenders.length} lender{lenders.length !== 1 ? "s" : ""} available
              </p>
            )}
          </div>

          {isLoading && (
            <div style={{ paddingTop: "1rem" }}>
              {Array.from({ length: 5 }).map((_, i) => <LenderSkeleton key={i} index={i} />)}
            </div>
          )}

          {!isLoading && lenders.length === 0 && (
            <div style={{ padding: "6rem 0", textAlign: "center", borderTop: "1px solid var(--border)" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
                No lenders available
              </p>
            </div>
          )}

          {!isLoading && lenders.length > 0 && (
            <div style={{ paddingTop: "1rem", paddingBottom: "5rem" }}>
              {lenders.map((lender, i) => (
                <LenderCard key={lender.id} lender={lender} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── EMI Calculator section ── */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "4rem 0 5rem" }}>
        <div style={{ marginBottom: "2.5rem" }}>
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
            Tools
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 4.5rem)",
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: "var(--fg)",
            }}
          >
            EMI Calculator
          </h2>
        </div>
        <EMICalculator />
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .loans-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .lender-meta-right { display: none !important; }
          .wizard-grid { grid-template-columns: 1fr !important; }
          .loans-grid { gap: 2.5rem !important; }
        }
        @media (max-width: 480px) {
          .wizard-step-tracker { display: none !important; }
        }
      `}</style>
    </main>
  );
}
