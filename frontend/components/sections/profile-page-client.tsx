"use client";

import { useState, useEffect, useRef } from "react";

/* ── Mac dots ── */
const DOTS = [{ c: "#FF5F57" }, { c: "#FEBC2E" }, { c: "#28C840" }];

/* ── Scroll reveal ── */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
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
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ── Tab type ── */
type Tab = "academic" | "scores" | "preferences" | "financial";

const TABS: { id: Tab; label: string }[] = [
  { id: "academic", label: "Academic" },
  { id: "scores", label: "Test Scores" },
  { id: "preferences", label: "Preferences" },
  { id: "financial", label: "Financial" },
];

/* ── Text input ── */
function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  min,
  max,
  step,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  min?: string;
  max?: string;
  step?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: 9,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        style={{
          background: "var(--bg)",
          border: `1px solid ${focused ? "var(--fg)" : "var(--border)"}`,
          borderRadius: 10,
          padding: "0.65rem 0.85rem",
          fontSize: 13,
          color: "var(--fg)",
          fontFamily: "inherit",
          outline: "none",
          transition: "border-color 0.15s",
          width: "100%",
        }}
      />
    </div>
  );
}

/* ── Select input ── */
function SelectField({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: 9,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: "var(--bg)",
          border: `1px solid ${focused ? "var(--fg)" : "var(--border)"}`,
          borderRadius: 10,
          padding: "0.65rem 0.85rem",
          fontSize: 13,
          color: "var(--fg)",
          fontFamily: "inherit",
          outline: "none",
          cursor: "pointer",
          appearance: "none",
          transition: "border-color 0.15s",
          width: "100%",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%236b6b6b' stroke-width='1.5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          paddingRight: "2rem",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ── Toggle (checkbox) ── */
function Toggle({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
    >
      <div
        style={{
          width: 36,
          height: 20,
          borderRadius: 10,
          background: checked ? "var(--fg)" : "var(--border)",
          position: "relative",
          transition: "background 0.2s",
          flexShrink: 0,
        }}
        onClick={() => onChange(!checked)}
      >
        <div
          style={{
            position: "absolute",
            top: 2,
            left: checked ? 18 : 2,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: checked ? "var(--bg)" : "var(--elev)",
            transition: "left 0.2s",
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: 11,
          letterSpacing: "0.04em",
          color: "var(--fg)",
        }}
      >
        {label}
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ display: "none" }}
      />
    </label>
  );
}

/* ── Section card (Tivor-style) ── */
function SectionCard({
  title,
  num,
  children,
  index,
}: {
  title: string;
  num: string;
  children: React.ReactNode;
  index: number;
}) {
  const ref = useReveal(index * 70);
  return (
    <div
      ref={ref}
      style={{
        border: "1px solid var(--border)",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {/* Card header bar — mac-chrome style */}
      <div
        style={{
          background: "var(--elev)",
          borderBottom: "1px solid var(--border)",
          padding: "0.875rem 1.25rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          {DOTS.map((d) => (
            <span
              key={d.c}
              style={{ width: 9, height: 9, borderRadius: "50%", background: d.c, display: "block" }}
            />
          ))}
        </div>
        <span style={{ width: 1, height: 14, background: "var(--border)", display: "block" }} />
        <span
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 10,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          {num}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "var(--fg)",
          }}
        >
          {title}
        </span>
      </div>
      {/* Card body */}
      <div style={{ padding: "1.5rem 1.25rem", background: "var(--bg)" }}>{children}</div>
    </div>
  );
}

/* ── Avatar initials ── */
function AvatarBlock() {
  const ref = useReveal(0);
  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2.5rem" }}>
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "var(--fg)",
          color: "var(--bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.04em",
          flexShrink: 0,
        }}
      >
        S
      </div>
      <div>
        <p style={{ fontSize: 20, fontWeight: 700, color: "var(--fg)", marginBottom: 4 }}>Student User</p>
        <p
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          student@findabroad.com
        </p>
      </div>
    </div>
  );
}

/* ── Grid helper ── */
function Grid({ children, cols = 3 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div
      className={`profile-grid-${cols}`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: "1rem",
      }}
    >
      {children}
    </div>
  );
}

/* ── Main component ── */
export function ProfilePageClient() {
  const [activeTab, setActiveTab] = useState<Tab>("academic");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    cgpa: "",
    work_exp: "",
    grad_year: "",
    undergrad_uni: "",
    undergrad_field: "",
    qualification: "",
    ielts: "",
    toefl: "",
    gre: "",
    gmat: "",
    sat: "",
    target_countries: "",
    target_programs: "",
    intake: "",
    budget: "",
    family_income: "",
    has_co_applicant: false,
    has_collateral: false,
    loan_required: false,
  });

  const set = (field: string) => (v: string | boolean) => {
    setForm((p) => ({ ...p, [field]: v }));
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900)); // Simulate API
    setSaving(false);
    setSaved(true);
  };

  const headRef = useReveal(0);

  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>
      {/* Editorial header */}
      <div ref={headRef} style={{ marginBottom: "2.5rem" }}>
        <p
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: 10,
          }}
        >
          Account
        </p>
        <h1
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
            marginBottom: 12,
          }}
        >
          My Profile
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "var(--muted)",
            lineHeight: 1.65,
            maxWidth: 400,
          }}
        >
          Keep your academic, financial, and preference details up to date for better matches.
        </p>
      </div>

      {/* Avatar */}
      <AvatarBlock />

      {/* Pill filter tabs */}
      <div
        style={{
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          marginBottom: "2rem",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "1.25rem",
        }}
      >
        {TABS.map((t) => {
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: "0.4rem 1.1rem",
                borderRadius: 9999,
                border: `1px solid ${active ? "var(--fg)" : "var(--border)"}`,
                background: active ? "var(--fg)" : "transparent",
                color: active ? "var(--bg)" : "var(--muted)",
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 11,
                fontWeight: active ? 600 : 400,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      <form onSubmit={handleSubmit}>
        {/* Academic */}
        {activeTab === "academic" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <SectionCard title="Background" num="01" index={0}>
              <Grid cols={3}>
                <Field
                  id="cgpa"
                  label="CGPA"
                  type="number"
                  value={form.cgpa}
                  onChange={set("cgpa")}
                  placeholder="7.8"
                  min="0"
                  max="10"
                  step="0.01"
                />
                <Field
                  id="work_exp"
                  label="Work Experience (yrs)"
                  type="number"
                  value={form.work_exp}
                  onChange={set("work_exp")}
                  placeholder="2"
                  min="0"
                />
                <Field
                  id="grad_year"
                  label="Graduation Year"
                  type="number"
                  value={form.grad_year}
                  onChange={set("grad_year")}
                  placeholder="2023"
                />
              </Grid>
            </SectionCard>

            <SectionCard title="Education" num="02" index={1}>
              <Grid cols={2}>
                <Field
                  id="undergrad_uni"
                  label="Undergraduate University"
                  value={form.undergrad_uni}
                  onChange={set("undergrad_uni")}
                  placeholder="Anna University"
                />
                <Field
                  id="undergrad_field"
                  label="Field of Study"
                  value={form.undergrad_field}
                  onChange={set("undergrad_field")}
                  placeholder="Computer Science"
                />
              </Grid>
              <div style={{ marginTop: "1rem" }}>
                <SelectField
                  id="qualification"
                  label="Highest Qualification"
                  value={form.qualification}
                  onChange={set("qualification")}
                  options={[
                    { value: "", label: "Select qualification" },
                    { value: "Bachelor", label: "Bachelor's Degree" },
                    { value: "Diploma", label: "Diploma" },
                    { value: "12th", label: "12th Grade" },
                    { value: "10th", label: "10th Grade" },
                  ]}
                />
              </div>
            </SectionCard>
          </div>
        )}

        {/* Test Scores */}
        {activeTab === "scores" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <SectionCard title="English Proficiency" num="01" index={0}>
              <Grid cols={2}>
                <Field
                  id="ielts"
                  label="IELTS Score"
                  type="number"
                  value={form.ielts}
                  onChange={set("ielts")}
                  placeholder="7.0"
                  min="0"
                  max="9"
                  step="0.5"
                />
                <Field
                  id="toefl"
                  label="TOEFL Score"
                  type="number"
                  value={form.toefl}
                  onChange={set("toefl")}
                  placeholder="100"
                  min="0"
                  max="120"
                />
              </Grid>
            </SectionCard>

            <SectionCard title="Standardised Tests" num="02" index={1}>
              <Grid cols={3}>
                <Field
                  id="gre"
                  label="GRE Score"
                  type="number"
                  value={form.gre}
                  onChange={set("gre")}
                  placeholder="320"
                  min="260"
                  max="340"
                />
                <Field
                  id="gmat"
                  label="GMAT Score"
                  type="number"
                  value={form.gmat}
                  onChange={set("gmat")}
                  placeholder="680"
                  min="200"
                  max="800"
                />
                <Field
                  id="sat"
                  label="SAT Score"
                  type="number"
                  value={form.sat}
                  onChange={set("sat")}
                  placeholder="1400"
                  min="400"
                  max="1600"
                />
              </Grid>
            </SectionCard>
          </div>
        )}

        {/* Study Preferences */}
        {activeTab === "preferences" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <SectionCard title="Destination & Program" num="01" index={0}>
              <Grid cols={2}>
                <Field
                  id="target_countries"
                  label="Target Countries"
                  value={form.target_countries}
                  onChange={set("target_countries")}
                  placeholder="USA, UK, Canada"
                />
                <Field
                  id="target_programs"
                  label="Target Programs"
                  value={form.target_programs}
                  onChange={set("target_programs")}
                  placeholder="Computer Science, Data Science"
                />
              </Grid>
            </SectionCard>

            <SectionCard title="Timeline & Budget" num="02" index={1}>
              <Grid cols={2}>
                <SelectField
                  id="intake"
                  label="Intended Intake"
                  value={form.intake}
                  onChange={set("intake")}
                  options={[
                    { value: "", label: "Select intake" },
                    { value: "Fall 2025", label: "Fall 2025" },
                    { value: "Spring 2026", label: "Spring 2026" },
                    { value: "Fall 2026", label: "Fall 2026" },
                    { value: "Spring 2027", label: "Spring 2027" },
                  ]}
                />
                <Field
                  id="budget"
                  label="Annual Budget (USD)"
                  type="number"
                  value={form.budget}
                  onChange={set("budget")}
                  placeholder="40000"
                  min="0"
                />
              </Grid>
            </SectionCard>
          </div>
        )}

        {/* Financial */}
        {activeTab === "financial" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <SectionCard title="Income & Assets" num="01" index={0}>
              <div style={{ maxWidth: 340 }}>
                <Field
                  id="family_income"
                  label="Family Annual Income (INR)"
                  type="number"
                  value={form.family_income}
                  onChange={set("family_income")}
                  placeholder="1200000"
                  min="0"
                />
              </div>
            </SectionCard>

            <SectionCard title="Loan Eligibility" num="02" index={1}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Toggle
                  id="has_co_applicant"
                  label="I have a co-applicant"
                  checked={form.has_co_applicant}
                  onChange={set("has_co_applicant")}
                />
                <Toggle
                  id="has_collateral"
                  label="I have collateral to offer"
                  checked={form.has_collateral}
                  onChange={set("has_collateral")}
                />
                <Toggle
                  id="loan_required"
                  label="I require an education loan"
                  checked={form.loan_required}
                  onChange={set("loan_required")}
                />
              </div>
            </SectionCard>
          </div>
        )}

        {/* Save row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "2rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border)",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {saved ? (
            <span
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#28C840",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#28C840" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Saved successfully
            </span>
          ) : (
            <span
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              {activeTab === "academic" ? "Academic details" : activeTab === "scores" ? "Test scores" : activeTab === "preferences" ? "Study preferences" : "Financial info"}
            </span>
          )}

          <button
            type="submit"
            disabled={saving}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "0.65rem 1.5rem",
              borderRadius: 9999,
              border: "1px solid var(--fg)",
              background: saving ? "var(--border)" : "var(--fg)",
              color: saving ? "var(--muted)" : "var(--bg)",
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              cursor: saving ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {saving ? (
              <>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    border: "1.5px solid var(--muted)",
                    borderTop: "1.5px solid var(--fg)",
                    animation: "spin 0.6s linear infinite",
                    display: "block",
                  }}
                />
                Saving...
              </>
            ) : (
              <>
                Save Profile
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .profile-grid-3 { grid-template-columns: 1fr !important; }
          .profile-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
