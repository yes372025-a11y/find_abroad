import Link from "next/link";
import styles from "./footer.module.css";

const LINKS_LEFT = [
  { href: "/universities", label: "Universities" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/courses", label: "Courses" },
  { href: "/loans", label: "Loans" },
  { href: "/services", label: "Services" },
  { href: "/consultation", label: "Consultation" },
];

const LINKS_RIGHT = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/success-stories", label: "Success Stories" },
];

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "3rem 0 5.5rem", /* increased from 2.5rem to clear the floating WhatsApp button */
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {/* Brand */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)",
                fontSize: "1.8rem",
                letterSpacing: "0.06em",
                color: "var(--fg)",
                fontWeight: 400,
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}
            >
              FIND ABROAD
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                color: "var(--muted)",
                textTransform: "uppercase",
              }}
            >
              Your Global Education Partner
            </p>
          </div>

          {/* Nav columns */}
          <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {LINKS_LEFT.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={styles.footerLink}
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    transition: "color 0.2s",
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {LINKS_RIGHT.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={styles.footerLink}
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    transition: "color 0.2s",
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/consultation"
            className="hover-btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "0.625rem 1.25rem",
              borderRadius: 9999,
              border: "1px solid var(--fg)",
              color: "var(--fg)",
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              alignSelf: "flex-start",
              whiteSpace: "nowrap",
            }}
          >
            Free Consultation →
          </Link>
        </div>

        {/* Bottom row */}
        <div
          style={{
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.04em",
            }}
          >
            © {new Date().getFullYear()} Find Abroad
          </p>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[
              { href: "/privacy-policy", label: "Privacy" },
              { href: "/terms-of-service", label: "Terms" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={styles.footerLink}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--muted)",
                  letterSpacing: "0.04em",
                  transition: "color 0.2s",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
