"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";

// Country color palettes for each destination card
const DESTINATION_CARDS = [
  {
    tile: "tile-1",
    ar: "3/4",
    label: "United Kingdom",
    stat: "130+ Universities",
    href: "/study-abroad/uk",
    accent: "#CF142B",
    accentLight: "#fff",
    abbr: "UK",
    symbol: "✦",
    img: "https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&q=75&fit=crop",
  },
  {
    tile: "tile-3",
    ar: "4/3",
    label: "Canada",
    stat: "60+ Universities",
    href: "/study-abroad/canada",
    accent: "#FF0000",
    accentLight: "#fff",
    abbr: "CA",
    symbol: "❋",
    img: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=75&fit=crop",
  },
  {
    tile: "tile-4",
    ar: "4/3",
    label: "Australia",
    stat: "45+ Universities",
    href: "/study-abroad/australia",
    accent: "#00008B",
    accentLight: "#FFD700",
    abbr: "AU",
    symbol: "✵",
    img: "https://images.unsplash.com/photo-1524293568345-75d62c3664f7?w=800&q=75&fit=crop",
  },
  {
    tile: "tile-5",
    ar: "4/3",
    label: "Germany",
    stat: "80+ Universities",
    href: "/study-abroad/germany",
    accent: "#000000",
    accentLight: "#FFCE00",
    abbr: "DE",
    symbol: "◆",
    img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=75&fit=crop",
  },
  {
    tile: "tile-6",
    ar: "4/3",
    label: "Ireland",
    stat: "30+ Universities",
    href: "/study-abroad/ireland",
    accent: "#169B62",
    accentLight: "#fff",
    abbr: "IE",
    symbol: "☘",
    img: "https://images.unsplash.com/photo-1549918864-48ac978761a4?w=600&q=75&fit=crop",
  },
  {
    tile: "tile-2",
    ar: "3/4",
    label: "France",
    stat: "50+ Universities",
    href: "/study-abroad/france",
    accent: "#0055A4",
    accentLight: "#fff",
    abbr: "FR",
    symbol: "★",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=75&fit=crop",
  },
  {
    tile: "tile-7",
    ar: "4/3",
    label: "New Zealand",
    stat: "20+ Universities",
    href: "/study-abroad/new-zealand",
    accent: "#00247D",
    accentLight: "#fff",
    abbr: "NZ",
    symbol: "✦",
    img: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=75&fit=crop",
  },
  {
    tile: "tile-8",
    ar: "3/4",
    label: "United States",
    stat: "180+ Universities",
    href: "/study-abroad/usa",
    accent: "#002868",
    accentLight: "#fff",
    abbr: "US",
    symbol: "★",
    img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=75&fit=crop",
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Mouse parallax
  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const strength = window.innerWidth < 768 ? 0.6 : 2.5;
    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      targetX = -dx * strength * 0.03;
      targetY = -dy * strength * 0.03;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      if (cards) cards.style.transform = `translate(${currentX}px, ${currentY}px)`;
      rafId = requestAnimationFrame(animate);
    };

    animate();
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Staggered card entry + wordmark fade
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".canvas-card");
    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "scale(0.55)";
      setTimeout(() => {
        card.style.transition =
          "opacity 0.7s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1)";
        card.style.opacity = "1";
        card.style.transform = "scale(1)";
      }, 650 + i * 120);
    });

    const heading = document.querySelector<HTMLElement>(".hero-wordmark");
    if (heading) {
      heading.style.opacity = "0";
      heading.style.transform = "translateY(24px)";
      setTimeout(() => {
        heading.style.transition = "opacity 0.9s ease, transform 0.9s ease";
        heading.style.opacity = "1";
        heading.style.transform = "translateY(0)";
      }, 150);
    }
    const sub = document.querySelector<HTMLElement>(".hero-sub");
    if (sub) {
      sub.style.opacity = "0";
      setTimeout(() => {
        sub.style.transition = "opacity 0.8s ease";
        sub.style.opacity = "1";
      }, 700);
    }
    const ctaStrip = document.querySelector<HTMLElement>(".hero-cta-strip");
    if (ctaStrip) {
      ctaStrip.style.opacity = "0";
      ctaStrip.style.transform = "translateY(12px)";
      setTimeout(() => {
        ctaStrip.style.transition = "opacity 0.7s ease, transform 0.7s ease";
        ctaStrip.style.opacity = "1";
        ctaStrip.style.transform = "translateY(0)";
      }, 900);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: "var(--bg)",
      }}
      aria-label="Find Abroad hero"
    >
      {/* Floating destination cards */}
      <div
        ref={cardsRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "auto",
          willChange: "transform",
          zIndex: 1,
        }}
      >
        {DESTINATION_CARDS.map((card, i) => (
          <Link key={i} className="canvas-card" href={card.href}>
            <span
              className={`tile ${card.tile}`}
              style={{
                aspectRatio: card.ar,
                display: "block",
                position: "relative",
              }}
            >
              {/* Image Background */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.img}
                alt={card.label}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 0,
                  borderRadius: "inherit"
                }}
              />
              {/* Overlay to ensure text readability */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.5)",
                  zIndex: 1,
                  borderRadius: "inherit"
                }}
              />
              {/* Country visual — elegant monochrome with accent strip */}
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "1rem",
                  zIndex: 2,
                }}
              >
                {/* Accent block */}
                <span
                  style={{
                    width: "2.2rem",
                    height: "2.2rem",
                    borderRadius: 8,
                    background: card.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "clamp(9px, 1.2vw, 12px)",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      color: card.accentLight,
                    }}
                  >
                    {card.abbr}
                  </span>
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(7px, 0.85vw, 9px)",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#ffffff",
                    textAlign: "center",
                    lineHeight: 1.3,
                  }}
                >
                  {card.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(6px, 0.7vw, 8px)",
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.75)",
                    textAlign: "center",
                  }}
                >
                  {card.stat}
                </span>
              </span>
              {/* Bottom watermark */}
              <span
                className="cap"
                style={{
                  position: "absolute",
                  left: 9,
                  bottom: 7,
                  fontFamily: "var(--font-mono)",
                  fontSize: 8,
                  letterSpacing: "0.06em",
                  color: "rgba(255,255,255,0.6)",
                  textTransform: "uppercase",
                  opacity: 0.55,
                  zIndex: 2,
                }}
              >
                findabroad.com
              </span>
            </span>
          </Link>
        ))}
      </div>

      {/* Wordmark — centered over everything */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 3,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            className="hero-wordmark"
            style={{
              fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)",
              fontWeight: 400,
              fontSize: "clamp(4.5rem, 13vw, 11rem)",
              lineHeight: 0.92,
              letterSpacing: "0.025em",
              margin: 0,
              color: "var(--fg)",
              padding: "0.1em 0 0.18em",
            }}
          >
            FIND
            <br />
            ABROAD
          </h1>
          <p
            className="hero-sub"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(10px, 1.2vw, 13px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginTop: "1.25rem",
            }}
          >
            Your Global Education Partner
          </p>
        </div>
      </div>

      {/* Bottom gradient fade — keeps CTA readable */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 5,
          height: 240,
          background:
            "linear-gradient(to bottom, transparent 0%, var(--bg) 85%)",
          pointerEvents: "none",
        }}
      />

      {/* CTA strip */}
      <div
        className="hero-cta-strip"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          zIndex: 6,
          pointerEvents: "auto",
          padding: "0 1.5rem",
        }}
      >
        <Link
          href="/consultation"
          className="cta-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "0.75rem 1.5rem",
            borderRadius: 9999,
            border: "1px solid var(--fg)",
            color: "var(--fg)",
            background: "var(--bg)",
            fontSize: 13,
            fontWeight: 500,
            whiteSpace: "nowrap",
            transition: "background 0.2s, color 0.2s",
          }}
        >
          Book Free Consultation
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
        <Link
          href="/universities"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "0.75rem 1.5rem",
            borderRadius: 9999,
            border: "1px solid var(--border)",
            color: "var(--muted)",
            background: "var(--elev)",
            fontSize: 13,
            fontWeight: 500,
            whiteSpace: "nowrap",
            transition: "background 0.2s, color 0.2s",
          }}
        >
          Explore Universities
        </Link>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2.25rem",
          right: "2rem",
          zIndex: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
            writingMode: "vertical-rl",
            opacity: 0.4,
          }}
        >
          Scroll
        </span>
        <span
          style={{
            width: 7,
            height: 7,
            border: "1px solid var(--muted)",
            display: "block",
            transform: "rotate(45deg)",
            opacity: 0.35,
            animation: "bob 1.6s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}