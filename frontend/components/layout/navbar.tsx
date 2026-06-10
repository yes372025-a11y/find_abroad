"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useAuth } from "~/hooks/use-auth";
import { useTheme } from "./theme-provider";

import { COUNTRIES_LIST } from "~/lib/data/countries";

const studyAbroadItems = COUNTRIES_LIST.map(c => ({
  href: `/study-abroad/${c.slug}`,
  label: c.name.replace(/(Republic of|Federal Republic of|Commonwealth of)/g, '').trim()
}));


const NAV_LINKS = [
  { href: "/universities", label: "Universities" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/courses", label: "Courses" },
  { href: "/loans", label: "Loans" },
  { href: "/study-abroad", label: "Study Abroad", hasDropdown: true },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        /* Sun icon */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        /* Moon icon */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

function StudyDropdown({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        left: "50%",
        transform: "translateX(-50%)",
        background: "var(--elev)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "6px",
        minWidth: 160,
        zIndex: 100,
        boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
      }}
    >
      {studyAbroadItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          style={{
            display: "block",
            padding: "8px 14px",
            borderRadius: 9,
            fontSize: 13,
            fontWeight: 500,
            color: "var(--fg)",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--border)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [studyOpen, setStudyOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close study dropdown on outside click
  useEffect(() => {
    if (!studyOpen) return;
    const handler = (e: globalThis.MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setStudyOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [studyOpen]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1001,   /* above WhatsApp (999) and mobile-menu (1000) */
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem",
          height: "var(--nav-h, 72px)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          background: "var(--nav-bg)",
          borderBottom: "1px solid var(--border)",
        }}
        aria-label="Primary"
      >
        {/* ── Wordmark Logo ── */}
        <Link
          href="/"
          aria-label="Find Abroad home"
          style={{
            fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)",
            fontSize: "1.65rem",
            letterSpacing: "0.06em",
            color: "var(--fg)",
            fontWeight: 400,
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          FIND ABROAD
        </Link>

        {/* ── Center nav — desktop only ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            // Hide on mobile via CSS media query approach — inline style only
          }}
          className="nav-center"
        >
          {NAV_LINKS.map(({ href, label, hasDropdown }) =>
            hasDropdown ? (
              <div
                key={href}
                ref={dropdownRef}
                style={{ position: "relative" }}
              >
                <button
                  className="nav-button"
                  style={{
                    color: "var(--fg)",
                    fontWeight: 500,
                    gap: 4,
                  }}
                  onClick={() => setStudyOpen((v) => !v)}
                >
                  <span className="nav-button-dot" />
                  <span>{label}</span>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ opacity: 0.5, marginLeft: 2, transition: "transform 0.2s", transform: studyOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <StudyDropdown open={studyOpen} onClose={() => setStudyOpen(false)} />
              </div>
            ) : (
              <Link
                key={href}
                href={href}
                className="nav-button"
                style={{
                  color: "var(--fg)",
                  fontWeight: pathname.startsWith(href) ? 600 : 500,
                }}
              >
                <span className="nav-button-dot" />
                <span>{label}</span>
              </Link>
            )
          )}
        </div>

        {/* ── Right side — desktop only ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
          className="nav-right"
        >
          <ThemeToggle />
          <div className="nav-auth">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="nav-button"
                  style={{ color: "var(--fg)", fontWeight: 500 }}
                >
                  <span className="nav-button-dot" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="nav-button"
                  style={{ color: "var(--muted)", fontWeight: 400 }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="nav-button"
                style={{ color: "var(--muted)", fontWeight: 500 }}
              >
                <span className="nav-button-dot" />
                <span>Sign In</span>
              </Link>
            )}
            <Link
              href="/consultation"
              className="cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "0.55rem 1.125rem",
                borderRadius: 9999,
                border: "1px solid var(--fg)",
                color: "var(--fg)",
                background: "transparent",
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              Free Consultation
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
          {/* Hamburger — always rendered, hidden on desktop via CSS */}
          <button
            className="hamburger-btn"
            style={{
              display: "none", // overridden by media query in style tag below
              alignItems: "center",
              justifyContent: "center",
              width: 46,
              height: 46,
              borderRadius: 9999,
              background: "var(--fg)",
              color: "var(--bg)",
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
            }}
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              style={{ display: "flex", flexDirection: "column", gap: 4, width: 16, position: "relative" }}
              aria-hidden
            >
              <span style={{ 
                display: "block", width: "100%", height: 1.5, background: "currentColor",
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                transform: menuOpen ? "translateY(5.5px) rotate(45deg)" : "translateY(0) rotate(0)",
              }} />
              <span style={{ 
                display: "block", width: "100%", height: 1.5, background: "currentColor",
                transition: "opacity 0.3s ease",
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{ 
                display: "block", width: "100%", height: 1.5, background: "currentColor",
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                transform: menuOpen ? "translateY(-5.5px) rotate(-45deg)" : "translateY(0) rotate(0)",
              }} />
            </span>
          </button>
        </div>
      </nav>

      {/* Responsive styles — inline style tag since no Tailwind */}
      <style>{`
        @media (max-width: 1024px) {
          .nav-center { display: none !important; }
          .nav-auth { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .hamburger-btn { display: none !important; }
          .nav-center { display: flex !important; }
          .nav-auth { display: flex !important; align-items: center; gap: 6px; }
        }
        .mobile-link {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .is-open .mobile-link {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* ── Mobile full-screen menu ── */}
      <div
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
        style={{ paddingTop: "calc(var(--nav-h, 72px) + 2rem)" }}
      >
        {/* Nav links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {NAV_LINKS.filter((l) => !l.hasDropdown).map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="mobile-link"
              style={{
                fontSize: "clamp(2rem, 8vw, 3.5rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                color: "var(--fg)",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid var(--border)",
                lineHeight: 1.15,
                transitionDelay: `${i * 0.05}s`,
              }}
            >
              {label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="mobile-link"
                style={{
                  fontSize: "clamp(2rem, 8vw, 3.5rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  color: "var(--fg)",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  borderBottom: "1px solid var(--border)",
                  lineHeight: 1.15,
                  transitionDelay: `${NAV_LINKS.filter(l => !l.hasDropdown).length * 0.05}s`,
                }}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="mobile-link"
                style={{
                  fontSize: "clamp(2rem, 8vw, 3.5rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  color: "var(--muted)",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "1px solid var(--border)",
                  lineHeight: 1.15,
                  textAlign: "left",
                  background: "transparent",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transitionDelay: `${(NAV_LINKS.filter(l => !l.hasDropdown).length + 1) * 0.05}s`,
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              onClick={() => setMenuOpen(false)}
              className="mobile-link"
              style={{
                fontSize: "clamp(2rem, 8vw, 3.5rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                color: "var(--muted)",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid var(--border)",
                lineHeight: 1.15,
                transitionDelay: `${NAV_LINKS.filter(l => !l.hasDropdown).length * 0.05}s`,
              }}
            >
              Sign In
            </Link>
          )}
          {/* Study Abroad countries */}
          <div
            className="mobile-link"
            style={{
              paddingTop: "1.25rem",
              paddingBottom: "1.25rem",
              borderBottom: "1px solid var(--border)",
              transitionDelay: `${(NAV_LINKS.filter(l => !l.hasDropdown).length + 2) * 0.05}s`,
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "0.75rem",
              }}
            >
              Study Abroad
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {studyAbroadItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 9999,
                    fontSize: 13,
                    fontWeight: 500,
                    border: "1px solid var(--border)",
                    color: "var(--fg)",
                    background: "var(--elev)",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer of mobile menu */}
        <div
          className="mobile-link"
          style={{
            marginTop: "auto",
            paddingTop: "2rem",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            transitionDelay: `${(NAV_LINKS.filter(l => !l.hasDropdown).length + 3) * 0.05}s`,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <ThemeToggle />
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              © {new Date().getFullYear()} Find Abroad
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999"}?text=Hi%2C%20I%20am%20interested%20in%20studying%20abroad`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "#25D366",
                color: "white",
              }}
              aria-label="Chat on WhatsApp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.856L.057 23.57a.75.75 0 0 0 .92.921l5.882-1.538A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.7-.528-5.23-1.448l-.374-.222-3.89 1.018 1.034-3.774-.244-.386A9.944 9.944 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
              </svg>
            </a>
            <Link
              href="/consultation"
              onClick={() => setMenuOpen(false)}
              className="cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 20px",
                borderRadius: 9999,
                border: "1px solid var(--fg)",
                color: "var(--fg)",
                background: "transparent",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              Free Consultation →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
