"use client";

import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

/* ── Mac traffic-light dots ── */
const DOTS = [{ c: "#FF5F57" }, { c: "#FEBC2E" }, { c: "#28C840" }];

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: 10,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "0.5rem",
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: wire to actual API
      await new Promise((res) => setTimeout(res, 1000));
      setSent(true);
      toast.success("Reset link sent — check your inbox.");
    } catch {
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div
        style={{
          background: "var(--elev)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          overflow: "hidden",
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
            auth/forgot-password
          </span>
        </div>

        <div style={{ padding: "2rem" }}>
          {sent ? (
            <>
              <p
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#28C840",
                  marginBottom: 10,
                }}
              >
                ● Email sent
              </p>
              <h1
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  color: "var(--fg)",
                  marginBottom: "1rem",
                }}
              >
                Check your inbox.
              </h1>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--muted)",
                  lineHeight: 1.7,
                  marginBottom: "2rem",
                }}
              >
                We sent a password reset link to <strong style={{ color: "var(--fg)" }}>{email}</strong>.
                It may take a couple of minutes to arrive.
              </p>
              <Link
                href="/auth/login"
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: 1,
                }}
              >
                ← Back to Sign In
              </Link>
            </>
          ) : (
            <>
              <div style={{ marginBottom: "2rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 9,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: 10,
                  }}
                >
                  Account recovery
                </p>
                <h1
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    color: "var(--fg)",
                  }}
                >
                  Reset password
                </h1>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1.75rem" }}>
                  <label htmlFor="reset_email" style={labelStyle}>
                    Email address
                  </label>
                  <input
                    id="reset_email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="you@example.com"
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      borderBottom: `1px solid ${focused ? "var(--fg)" : "var(--border)"}`,
                      color: "var(--fg)",
                      padding: "0.75rem 0",
                      fontSize: 16,
                      outline: "none",
                      fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                      transition: "border-color 0.2s ease",
                    }}
                    autoComplete="email"
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: 9,
                      letterSpacing: "0.06em",
                      color: "var(--muted)",
                      marginTop: 6,
                    }}
                  >
                    We&apos;ll send a reset link to this address.
                  </p>
                </div>

                <button
                  type="submit"
                  id="forgot-password-submit"
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
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
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
                        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" opacity="0.3" />
                        <path d="M21 12a9 9 0 0 0-9-9" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  marginTop: "1.75rem",
                  paddingTop: "1.5rem",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  Remember your password?{" "}
                  <Link
                    href="/auth/login"
                    style={{
                      color: "var(--fg)",
                      fontWeight: 600,
                      textDecoration: "none",
                      borderBottom: "1px solid var(--fg)",
                      paddingBottom: 1,
                    }}
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
