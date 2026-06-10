"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const destinations = [
  { name: "USA", flag: "🇺🇸", universities: "180+", slug: "usa", step: "01" },
  { name: "United Kingdom", flag: "🇬🇧", universities: "130+", slug: "uk", step: "02" },
  { name: "Canada", flag: "🇨🇦", universities: "60+", slug: "canada", step: "03" },
  { name: "Australia", flag: "🇦🇺", universities: "45+", slug: "australia", step: "04" },
  { name: "Germany", flag: "🇩🇪", universities: "80+", slug: "germany", step: "05" },
  { name: "Ireland", flag: "🇮🇪", universities: "30+", slug: "ireland", step: "06" },
  { name: "France", flag: "🇫🇷", universities: "50+", slug: "france", step: "07" },
  { name: "New Zealand", flag: "🇳🇿", universities: "20+", slug: "new-zealand", step: "08" },
];

export function DestinationsSection() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const rows = sectionRef.current?.querySelectorAll<HTMLElement>(".dest-row");
    if (!rows) return;
    rows.forEach((row, i) => {
      row.style.opacity = "0";
      row.style.transform = "translateX(-16px)";
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            row.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            row.style.opacity = "1";
            row.style.transform = "translateX(0)";
          }, i * 60);
          observer.disconnect();
        }
      }, { threshold: 0.1 });
      observer.observe(row);
    });
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: isMobile ? "4rem 0" : "7rem 0",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            flexDirection: isMobile ? "column" : "row",
            gap: "2rem",
            marginBottom: "4rem",
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
                marginBottom: "1rem",
              }}
            >
              Top Destinations
            </p>
            <h2
              style={{
                fontSize: "clamp(2.2rem, 5vw, 5rem)",
                fontWeight: 500,
                lineHeight: 0.97,
                letterSpacing: "-0.03em",
                color: "var(--fg)",
              }}
            >
              Eight countries.
              <br />
              Endless futures.
            </h2>
          </div>
          <p
            style={{
              maxWidth: "38ch",
              fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
              lineHeight: 1.7,
              color: "var(--muted)",
            }}
          >
            Choose your destination and explore universities, scholarships, and living costs tailored to each country.
          </p>
        </div>

        {/* Destination list */}
        {isMobile !== null && (
          isMobile ? (
            <div style={{ display: "flex", gap: "0.75rem", overflowX: "auto", paddingBottom: "1rem", scrollbarWidth: "none" }}>
              {destinations.map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/study-abroad/${dest.slug}`}
                  style={{
                    display: "block",
                    minWidth: 140,
                    borderRadius: 14,
                    border: "1px solid var(--border)",
                    background: "var(--elev)",
                    padding: "1.5rem 1rem",
                    textAlign: "center",
                    textDecoration: "none",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: "2.4rem", lineHeight: 1, display: "block", marginBottom: 8 }}>{dest.flag}</span>
                  <p style={{ fontWeight: 600, fontSize: 15, color: "var(--fg)", marginBottom: 3 }}>{dest.name}</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.06em" }}>{dest.universities}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ borderTop: "1px solid var(--border)" }}>
              {destinations.map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/study-abroad/${dest.slug}`}
                  className="dest-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.75rem 0",
                    borderBottom: "1px solid var(--border)",
                    textDecoration: "none",
                    transition: "padding-left 0.3s cubic-bezier(0.175,0.885,0.32,1.275)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.paddingLeft = "1.5rem";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.paddingLeft = "0";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--muted)",
                        letterSpacing: "0.08em",
                        opacity: 0.45,
                        minWidth: "2rem",
                      }}
                    >
                      {dest.step}
                    </span>
                    <span style={{ fontSize: "2rem", lineHeight: 1 }}>{dest.flag}</span>
                    <div>
                      <p
                        style={{
                          fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
                          fontWeight: 500,
                          letterSpacing: "-0.03em",
                          color: "var(--fg)",
                          lineHeight: 1.1,
                        }}
                      >
                        {dest.name}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          color: "var(--muted)",
                          letterSpacing: "0.06em",
                          marginTop: 3,
                        }}
                      >
                        {dest.universities} universities
                      </p>
                    </div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted)", flexShrink: 0 }}>
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              ))}
            </div>
          )
        )}
      </div>
    </section>
  );
}