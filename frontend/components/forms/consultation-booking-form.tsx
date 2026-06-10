"use client";

import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { leadsApi } from "~/lib/api";

/* ── Mac traffic-light dots ── */
const DOTS = [{ c: "#FF5F57" }, { c: "#FEBC2E" }, { c: "#28C840" }];

/* ── Scroll reveal hook ── */
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

const COUNTRIES = ["USA", "UK", "Canada", "Australia", "Germany", "Ireland", "France", "New Zealand"];
const TOPICS = [
  "University Selection",
  "Scholarship Search",
  "Loan & Funding",
  "Application & SOP",
  "Visa Guidance",
  "General Advice",
];

/* ── Custom Tivor-style dropdown ── */
function CustomSelect({
  id,
  options,
  value,
  onChange,
  placeholder,
  label,
}: {
  id: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 10,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: "0.5rem",
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>

      {/* Trigger button — looks like the other inputs */}
      <button
        id={id}
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderBottom: `1px solid ${open ? "var(--fg)" : "var(--border)"}`,
          color: value ? "var(--fg)" : "var(--muted)",
          padding: "0.75rem 1.5rem 0.75rem 0",
          fontSize: 15,
          outline: "none",
          fontFamily: "var(--font-inter, 'Inter', sans-serif)",
          transition: "border-color 0.2s ease",
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ flex: 1, textAlign: "left" }}>
          {value || placeholder}
        </span>
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s cubic-bezier(0.76, 0, 0.24, 1)",
            flexShrink: 0,
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "var(--elev)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            overflow: "hidden",
            zIndex: 50,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          }}
        >
          {/* Mac dots header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "0.6rem 0.9rem",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {DOTS.map((d, i) => (
              <span
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: d.c,
                  display: "block",
                  flexShrink: 0,
                }}
              />
            ))}
            <span
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 8,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginLeft: 6,
              }}
            >
              {label}
            </span>
          </div>

          {/* Options */}
          <div style={{ padding: "0.4rem" }}>
            {options.map((opt) => {
              const selected = opt === value;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "0.55rem 0.8rem",
                    borderRadius: 8,
                    border: "none",
                    background: selected ? "var(--fg)" : "transparent",
                    color: selected ? "var(--bg)" : "var(--fg)",
                    fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                    fontSize: 13,
                    fontWeight: selected ? 500 : 400,
                    cursor: "pointer",
                    transition: "background 0.15s ease, color 0.15s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  onMouseEnter={(e) => {
                    if (!selected) {
                      (e.currentTarget as HTMLElement).style.background = "var(--border)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selected) {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  {opt}
                  {selected && (
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function ConsultationBookingForm() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    target_country: "",
    target_program: "",
    topic: "",
    message: "",
    preferred_time: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const formRef = useReveal(0);
  const successRef = useReveal(0);

  const set =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const setField = (field: string) => (value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await leadsApi.capture({ ...form, source: "consultation" });
      setSubmitted(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("consultation_submitted", "true");
        window.dispatchEvent(new Event("consultation_submitted"));
      }
      toast.success("Consultation booked! We'll be in touch within 24 hours.");
    } catch {
      toast.error("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === name ? "var(--fg)" : "var(--border)"}`,
    color: "var(--fg)",
    padding: "0.75rem 0",
    fontSize: 15,
    outline: "none",
    fontFamily: "var(--font-inter, 'Inter', sans-serif)",
    transition: "border-color 0.2s ease",
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 10,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "var(--muted)",
    marginBottom: "0.5rem",
  };

  /* ── Success state ── */
  if (submitted) {
    return (
      <div
        ref={successRef}
        style={{
          background: "var(--elev)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "0.85rem 1.1rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {DOTS.map((d, i) => (
            <span
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: d.c,
                display: "block",
              }}
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
            Status: Confirmed
          </span>
        </div>

        <div
          style={{
            width: "100%",
            aspectRatio: "6/1",
            background:
              "repeating-linear-gradient(45deg, var(--border) 0 8px, var(--elev) 8px 16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            Booking confirmed
          </span>
        </div>

        <div style={{ padding: "2rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 9,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#28C840",
              marginBottom: 12,
            }}
          >
            ● You&apos;re all set
          </p>
          <h3
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--fg)",
              marginBottom: "1rem",
            }}
          >
            We&apos;ll be in touch.
          </h3>
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
              color: "var(--muted)",
              lineHeight: 1.7,
              maxWidth: "42ch",
            }}
          >
            Our counselor will reach out within 24 hours to confirm your slot.
            Keep an eye on your inbox at{" "}
            <strong style={{ color: "var(--fg)" }}>{form.email}</strong>.
          </p>
        </div>
      </div>
    );
  }

  /* ── Booking form ── */
  return (
    <>
      <Toaster position="top-right" />

      <div
        ref={formRef}
        style={{
          background: "var(--elev)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          overflow: "visible",
        }}
      >
        {/* Mac dots header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "0.85rem 1.1rem",
            borderBottom: "1px solid var(--border)",
            borderRadius: "14px 14px 0 0",
            overflow: "hidden",
          }}
        >
          {DOTS.map((d, i) => (
            <span
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: d.c,
                display: "block",
                flexShrink: 0,
              }}
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
            Consultation Booking Form
          </span>
        </div>

        {/* Hatched visual strip */}
        <div
          style={{
            width: "100%",
            aspectRatio: "7/1",
            background:
              "repeating-linear-gradient(45deg, var(--border) 0 8px, var(--elev) 8px 16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            Free · 30–45 min · Expert-led
          </span>
        </div>

        {/* Form content */}
        <form onSubmit={handleSubmit}>
          <div style={{ padding: "2rem" }}>
            {/* Section label */}
            <p style={{ ...labelStyle, marginBottom: "1.25rem" }}>
              Personal Details
            </p>

            {/* 2-col grid */}
            <div className="booking-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 2rem" }}>
              {/* Full name */}
              <div style={{ marginBottom: "1.75rem" }}>
                <label htmlFor="book_name" style={labelStyle}>
                  Full Name
                </label>
                <input
                  id="book_name"
                  type="text"
                  required
                  value={form.full_name}
                  onChange={set("full_name")}
                  onFocus={() => setFocused("full_name")}
                  onBlur={() => setFocused(null)}
                  placeholder="Jane Smith"
                  style={inputStyle("full_name")}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "1.75rem" }}>
                <label htmlFor="book_email" style={labelStyle}>
                  Email Address
                </label>
                <input
                  id="book_email"
                  type="email"
                  required
                  value={form.email}
                  onChange={set("email")}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="you@example.com"
                  style={inputStyle("email")}
                />
              </div>

              {/* Phone */}
              <div style={{ marginBottom: "1.75rem" }}>
                <label htmlFor="book_phone" style={labelStyle}>
                  Phone (Optional)
                </label>
                <input
                  id="book_phone"
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused(null)}
                  placeholder="+91 98765 43210"
                  style={inputStyle("phone")}
                />
              </div>

              {/* Target country — custom dropdown */}
              <div style={{ marginBottom: "1.75rem", position: "relative" }}>
                <CustomSelect
                  id="book_country"
                  label="Target Country"
                  options={COUNTRIES}
                  value={form.target_country}
                  onChange={setField("target_country")}
                  placeholder="Select country"
                />
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                borderTop: "1px solid var(--border)",
                margin: "0.25rem 0 1.75rem",
              }}
            />

            {/* Consultation details label */}
            <p style={{ ...labelStyle, marginBottom: "1.25rem" }}>
              Consultation Details
            </p>

            <div className="booking-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 2rem" }}>
              {/* Topic — custom dropdown */}
              <div style={{ marginBottom: "1.75rem", position: "relative" }}>
                <CustomSelect
                  id="book_topic"
                  label="Topic"
                  options={TOPICS}
                  value={form.topic}
                  onChange={setField("topic")}
                  placeholder="Select topic"
                />
              </div>

              {/* Preferred time */}
              <div style={{ marginBottom: "1.75rem" }}>
                <label htmlFor="book_time" style={labelStyle}>
                  Preferred Time
                </label>
                <input
                  id="book_time"
                  type="text"
                  value={form.preferred_time}
                  onChange={set("preferred_time")}
                  onFocus={() => setFocused("preferred_time")}
                  onBlur={() => setFocused(null)}
                  placeholder="e.g. Weekday mornings IST"
                  style={inputStyle("preferred_time")}
                />
              </div>
            </div>

            {/* Target program */}
            <div style={{ marginBottom: "1.75rem" }}>
              <label htmlFor="book_program" style={labelStyle}>
                Target Program
              </label>
              <input
                id="book_program"
                type="text"
                value={form.target_program}
                onChange={set("target_program")}
                onFocus={() => setFocused("target_program")}
                onBlur={() => setFocused(null)}
                placeholder="e.g. MS Computer Science, MBA, MBBS"
                style={inputStyle("target_program")}
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: "2rem" }}>
              <label htmlFor="book_message" style={labelStyle}>
                Anything else?
              </label>
              <textarea
                id="book_message"
                rows={3}
                value={form.message}
                onChange={set("message")}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                placeholder="Share your goals, timeline, or questions..."
                style={{
                  ...inputStyle("message"),
                  resize: "none",
                  lineHeight: 1.7,
                  display: "block",
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="book-consultation-submit"
              disabled={loading}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: "100%",
                padding: "0.875rem 1.5rem",
                borderRadius: 9999,
                border: "1px solid var(--fg)",
                background: "var(--fg)",
                color: "var(--bg)",
                fontFamily:
                  "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {loading ? (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ animation: "spin 1s linear infinite" }}
                  >
                    <path
                      d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                      opacity="0.3"
                    />
                    <path d="M21 12a9 9 0 0 0-9-9" />
                  </svg>
                  Booking…
                </>
              ) : (
                <>
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
                </>
              )}
            </button>

            <p
              style={{
                fontFamily:
                  "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 9,
                letterSpacing: "0.06em",
                color: "var(--muted)",
                textAlign: "center",
                marginTop: "1rem",
              }}
            >
              Free · No commitment · Expert-led session
            </p>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .booking-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}