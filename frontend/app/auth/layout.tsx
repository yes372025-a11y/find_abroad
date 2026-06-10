import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="auth-grid"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "var(--bg)",
      }}
    >
      {/* ── Left panel: editorial / decorative ── */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: "var(--elev)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "2rem",
        }}
        className="auth-panel-left"
      >
        {/* Hatched background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(45deg, var(--border) 0 1px, transparent 1px 16px)",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <Link
          href="/"
          style={{
            position: "relative",
            zIndex: 2,
            fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)",
            fontSize: "1.5rem",
            letterSpacing: "0.06em",
            color: "var(--fg)",
            fontWeight: 400,
            lineHeight: 1,
            textDecoration: "none",
          }}
        >
          FIND ABROAD
        </Link>

        {/* Center editorial text */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "2rem 0",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "1.5rem",
            }}
          >
            Study Abroad Platform
          </p>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: "var(--fg)",
              marginBottom: "2rem",
            }}
          >
            Your journey
            <br />
            starts here.
          </h2>
          <p
            style={{
              fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
              lineHeight: 1.7,
              color: "var(--muted)",
              maxWidth: "36ch",
            }}
          >
            Connect with top universities, discover scholarships tailored to your profile,
            and book expert consultations — all in one place.
          </p>
        </div>

        {/* Bottom stats row */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            borderTop: "1px solid var(--border)",
            paddingTop: "1.5rem",
          }}
        >
          {[
            { value: "500+", label: "Universities" },
            { value: "25K+", label: "Students" },
            { value: "6", label: "Countries" },
          ].map((s) => (
            <div key={s.label}>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  color: "var(--fg)",
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 10,
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

      {/* ── Right panel: form area ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 2rem",
          overflowY: "auto",
        }}
        className="auth-panel-right"
      >
        <div style={{ width: "100%", maxWidth: 440 }}>{children}</div>
      </div>

      {/* Responsive: stack on mobile */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .auth-panel-left { display: none !important; }
          .auth-grid {
            grid-template-columns: 1fr !important;
          }
          .auth-panel-right {
            padding: 2rem 1.25rem !important;
            min-height: 100vh;
          }
        }
      ` }} />
    </div>
  );
}
