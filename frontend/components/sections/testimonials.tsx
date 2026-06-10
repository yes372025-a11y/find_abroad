"use client";

import { useRef, useState, useEffect } from "react";

const testimonials = [
  {
    name: "Priya Sharma",
    university: "University of Toronto",
    country: "Canada",
    year: "2024",
    text: "Find Abroad made the entire process seamless. From shortlisting universities to getting my study permit — their team was with me every step of the way.",
    rating: 5,
    // Indian female student avatar
    avatar: "https://i.pravatar.cc/80?img=47",
  },
  {
    name: "Rahul Menon",
    university: "TU Munich",
    country: "Germany",
    year: "2024",
    text: "I had no idea I could get a fully-funded scholarship for my MS in Germany. The scholarship explorer on Find Abroad changed my life completely.",
    rating: 5,
    // Indian male student avatar
    avatar: "https://i.pravatar.cc/80?img=12",
  },
  {
    name: "Ananya Patel",
    university: "University College London",
    country: "UK",
    year: "2023",
    text: "The loan eligibility checker was incredibly accurate. I got approved for the exact amount predicted. Brilliant tool, highly recommend.",
    rating: 5,
    // Indian female student avatar
    avatar: "https://i.pravatar.cc/80?img=44",
  },
  {
    name: "Arjun Nair",
    university: "University of Melbourne",
    country: "Australia",
    year: "2024",
    text: "The consultation sessions were invaluable. My counselor had deep knowledge of Australian universities and helped me craft a winning SOP.",
    rating: 5,
    // South Asian male student avatar
    avatar: "https://i.pravatar.cc/80?img=15",
  },
];


export function TestimonialsSection() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".testimonial-card");
    if (!cards) return;
    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(24px)";
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, i * 80);
          observer.disconnect();
        }
      }, { threshold: 0.1 });
      observer.observe(card);
    });
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "7rem 0",
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
              Students Love Find Abroad
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
              Real students.<br />Real results.
            </h2>
          </div>
          <p
            style={{
              maxWidth: "34ch",
              fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
              lineHeight: 1.7,
              color: "var(--muted)",
            }}
          >
            25,000+ students have trusted Find Abroad to navigate their international education journey.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "1rem",
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card"
              style={{
                borderRadius: 16,
                border: "1px solid var(--border)",
                background: "var(--elev)",
                padding: "2rem",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
              }}
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: 3, marginBottom: "1.25rem" }}>
                {Array.from({ length: t.rating }).map((_, s) => (
                  <span key={s} style={{ color: "var(--fg)", fontSize: 11, opacity: 0.7 }}>★</span>
                ))}
              </div>

              <p
                style={{
                  fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                  lineHeight: 1.75,
                  color: "var(--muted)",
                  marginBottom: "1.75rem",
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={t.name}
                    width={40}
                    height={40}
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "1px solid var(--border)",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14, color: "var(--fg)" }}>{t.name}</p>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", marginTop: 3, letterSpacing: "0.04em" }}>
                      {t.university}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.06em" }}>{t.country}</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.06em", marginTop: 2 }}>{t.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
