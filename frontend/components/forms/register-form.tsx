"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { authApi } from "~/lib/api";

/* ── Mac traffic-light dots ── */
const DOTS = [{ c: "#FF5F57" }, { c: "#FEBC2E" }, { c: "#28C840" }];

export function RegisterForm() {
  const [data, setData] = useState({ email: "", full_name: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.register(data);
      toast.success("Account created! Please sign in.");
      router.push("/auth/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.detail ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const set =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setData((prev) => ({ ...prev, [field]: e.target.value }));

  const inputStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === name ? "var(--fg)" : "var(--border)"}`,
    color: "var(--fg)",
    padding: "0.75rem 0",
    fontSize: 16,
    outline: "none",
    fontFamily: "var(--font-inter, 'Inter', sans-serif)",
    transition: "border-color 0.2s ease",
  });

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
    <>
      <Toaster position="top-right" />

      {/* Card shell with Mac dots */}
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
            auth/register
          </span>
        </div>

        {/* Form body */}
        <div style={{ padding: "2rem" }}>
          {/* Heading */}
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
              Join today
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
              Create account
            </h1>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {/* Full name */}
            <div style={{ marginBottom: "1.75rem" }}>
              <label htmlFor="full_name" style={labelStyle}>
                Full name
              </label>
              <input
                id="full_name"
                type="text"
                required
                minLength={2}
                value={data.full_name}
                onChange={set("full_name")}
                onFocus={() => setFocused("full_name")}
                onBlur={() => setFocused(null)}
                placeholder="Jane Smith"
                style={inputStyle("full_name")}
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "1.75rem" }}>
              <label htmlFor="email" style={labelStyle}>
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={data.email}
                onChange={set("email")}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                placeholder="you@example.com"
                style={inputStyle("email")}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "2rem" }}>
              <label htmlFor="password" style={labelStyle}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  value={data.password}
                  onChange={set("password")}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  placeholder="At least 8 characters"
                  style={{ ...inputStyle("password"), paddingRight: "2.5rem" }}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--muted)",
                    padding: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 9,
                  letterSpacing: "0.08em",
                  color: "var(--muted)",
                  marginTop: 6,
                }}
              >
                Minimum 8 characters
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="register-submit"
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
                  Creating…
                </>
              ) : (
                <>
                  Create Account
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Terms note */}
          <p
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 9,
              letterSpacing: "0.06em",
              color: "var(--muted)",
              textAlign: "center",
              marginTop: "1.25rem",
              lineHeight: 1.6,
            }}
          >
            By creating an account you agree to our{" "}
            <Link href="/terms-of-service" style={{ color: "var(--fg)", textDecoration: "none", borderBottom: "1px solid var(--border)" }}>
              Terms
            </Link>{" "}
            &amp;{" "}
            <Link href="/privacy-policy" style={{ color: "var(--fg)", textDecoration: "none", borderBottom: "1px solid var(--border)" }}>
              Privacy Policy
            </Link>
          </p>

          {/* Divider */}
          <div
            style={{
              borderTop: "1px solid var(--border)",
              marginTop: "1.5rem",
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
              Already have an account?{" "}
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
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
