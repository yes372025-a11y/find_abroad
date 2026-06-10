"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    id: "01",
    title: "University Explorer",
    desc: "Browse 500+ universities with rankings, tuition, intake info, and acceptance rates — all in one place.",
    href: "/universities",
    sector: "Discovery",
    year: "2024",
    // Grand university library interior — scholarly atmosphere
    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1400&q=80&fit=crop",
  },
  {
    id: "02",
    title: "Scholarship Finder",
    desc: "Discover fully-funded and partial scholarships matched precisely to your profile, GPA, and field of study.",
    href: "/scholarships",
    sector: "Funding",
    year: "2024",
    // Graduate students celebrating — achievement and scholarship success
    img: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "03",
    title: "Loan Eligibility Checker",
    desc: "Instantly assess your eligibility and compare 20+ lenders side-by-side for the best education loan terms.",
    href: "/loans",
    sector: "Finance",
    year: "2024",
    // Financial planning / documents on a clean desk
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1400&q=80&fit=crop",
  },
  {
    id: "04",
    title: "Expert Consultations",
    desc: "Book free 1:1 sessions with certified study abroad counselors who've helped thousands of students.",
    href: "/consultation",
    sector: "Guidance",
    year: "2025",
    // Professional one-on-one mentoring session
    img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1400&q=80&fit=crop",
  },
  {
    id: "05",
    title: "Services & Pricing",
    desc: "End-to-end support — university shortlisting, SOP review, visa prep, and loan assistance. Transparent pricing from ₹0 to ₹35,000.",
    href: "/services",
    sector: "Plans",
    year: "2025",
    // Clean workspace with planning tools — represents structured support
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80&fit=crop",
  },
];

const DOTS = [{ color: "#FF5F57" }, { color: "#FEBC2E" }, { color: "#28C840" }];

export function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const cards = ref.current?.querySelectorAll<HTMLElement>(".feature-card-wrap");
    if (!cards) return;
    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(32px)";
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            card.style.transition = "opacity 0.65s ease, transform 0.65s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, i * 90);
          observer.disconnect();
        }
      }, { threshold: 0.1 });
      observer.observe(card);
    });
  }, [isMobile]);

  return (
    <section
      ref={ref}
      style={{
        background: "var(--bg)",
        padding: "6rem 0",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Section label */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "4rem",
          }}
        >
          What We Offer
        </p>

        {/* Stacked cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {features.map((feat, i) => (
            <div
              key={feat.id}
              className="feature-card-wrap"
              style={{
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid var(--border)",
                background: "var(--elev)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              }}
            >
              <Link href={feat.href} style={{ display: "block", textDecoration: "none" }}>
                {/* Mac-style chrome bar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.875rem 1.5rem",
                    borderBottom: "1px solid var(--border)",
                    background: "var(--bg)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      {DOTS.map((d) => (
                        <span key={d.color} style={{ width: 10, height: 10, borderRadius: "50%", background: d.color, display: "block", flexShrink: 0 }} />
                      ))}
                    </div>
                    <span style={{ width: 1, height: 14, background: "var(--border)", display: "block", flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>
                      {feat.id}
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "var(--fg)" }}>
                      {feat.title}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexShrink: 0 }} className="feat-chrome-right">
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.06em" }}>{feat.sector}</p>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.06em" }}>{feat.year}</p>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted)", flexShrink: 0 }}>
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>

                {/* Card body — real photo with overlay and description */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: isMobile ? "3/1" : "16/5",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={feat.img}
                    alt={feat.title}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                    className={`feat-img-${i}`}
                  />
                  {/* Gradient overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                    }}
                  />
                  {/* Description pill */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "1.5rem",
                      left: "2rem",
                      right: "2rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                        lineHeight: 1.65,
                        color: "rgba(255,255,255,0.9)",
                        maxWidth: "52ch",
                        background: "rgba(0,0,0,0.4)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        padding: "0.875rem 1.125rem",
                        borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .feature-card-wrap:hover .feat-img-0,
        .feature-card-wrap:hover .feat-img-1,
        .feature-card-wrap:hover .feat-img-2,
        .feature-card-wrap:hover .feat-img-3,
        .feature-card-wrap:hover .feat-img-4 {
          transform: scale(1.04);
        }
      ` }} />
    </section>
  );
}
