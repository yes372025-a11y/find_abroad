"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { leadsApi } from "~/lib/api";

const COUNTRIES = ["USA", "UK", "Canada", "Australia", "Germany", "Ireland", "France", "New Zealand"];

export function ContactForm() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    message: "",
    target_country: "",
  });
  const [loading, setLoading] = useState(false);

  const set =
    (field: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await leadsApi.capture({ ...form, source: "contact_form" });
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm({ full_name: "", email: "", phone: "", message: "", target_country: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid var(--border)",
          borderRadius: 16,
          background: "var(--elev)",
          padding: "2.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        {/* Two-column row */}
        <div className="contact-form-grid">
          <Field label="Full Name" required>
            <input
              type="text"
              required
              placeholder="Jane Smith"
              value={form.full_name}
              onChange={set("full_name")}
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={set("email")}
            />
          </Field>
          <Field label="Phone (optional)">
            <input
              type="tel"
              placeholder="+1 234 567 8900"
              value={form.phone}
              onChange={set("phone")}
            />
          </Field>
          <Field label="Target Country">
            <select
              value={form.target_country}
              onChange={set("target_country")}
            >
              <option value="">Select a country</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Message" required>
          <textarea
            required
            rows={4}
            placeholder="Tell us about your study abroad goals..."
            value={form.message}
            onChange={set("message")}
            style={{ resize: "vertical", minHeight: 110 }}
          />
        </Field>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "0.85rem 1.5rem",
            borderRadius: 9999,
            border: "1px solid var(--fg)",
            background: "var(--fg)",
            color: "var(--bg)",
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
            transition: "opacity 0.15s",
          }}
        >
          {loading ? (
            <>
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: "1.5px solid var(--bg)",
                  borderTop: "1.5px solid transparent",
                  animation: "cf-spin 0.7s linear infinite",
                  flexShrink: 0,
                }}
              />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <svg
                width="12"
                height="12"
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

        <style>{`
          .contact-form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.25rem;
          }
          @media (max-width: 480px) {
            .contact-form-grid { grid-template-columns: 1fr !important; }
          }
          .contact-form-field { display: flex; flex-direction: column; gap: 6px; }
          .contact-field-label {
            font-family: var(--font-mono, 'JetBrains Mono', monospace);
            font-size: 10px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--muted);
          }
          .contact-form-field input,
          .contact-form-field select,
          .contact-form-field textarea {
            width: 100%;
            padding: 0.65rem 0.9rem;
            border: 1px solid var(--border);
            border-radius: 10px;
            background: var(--bg);
            color: var(--fg);
            font-family: inherit;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s;
            appearance: none;
          }
          .contact-form-field input:focus,
          .contact-form-field select:focus,
          .contact-form-field textarea:focus {
            border-color: var(--fg);
          }
          @keyframes cf-spin { to { transform: rotate(360deg); } }
        `}</style>
      </form>
    </>
  );
}

/* ── Field wrapper ── */
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="contact-form-field">
      <label className="contact-field-label">
        {label}
        {required && (
          <span style={{ color: "#FF5F57", marginLeft: 2 }}>*</span>
        )}
      </label>
      {children}
    </div>
  );
}
