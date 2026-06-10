"use client";

import { useEffect, useRef } from "react";

const stats = [
  { value: "25K+", label: "Students Guided" },
  { value: "500+", label: "Partner Universities" },
  { value: "40+",  label: "Scholarship Programs" },
  { value: "$2B+", label: "Loans Facilitated" },
];

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll<HTMLElement>(".stat-item");
    if (!items) return;
    items.forEach((item, i) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(16px)";
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, i * 80);
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(item);
    });
  }, []);

  return (
    <section
      ref={ref}
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
        padding: "3.5rem 0",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Inline responsive grid */}
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-item"
              style={{
                textAlign: "center",
                padding: "1rem 1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)",
                  fontSize: "clamp(2.4rem, 5vw, 4rem)",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  color: "var(--fg)",
                  lineHeight: 1,
                  marginBottom: "0.4rem",
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .stats-grid .stat-item {
          border-left: 1px solid var(--border);
        }
        .stats-grid .stat-item:first-child {
          border-left: none;
        }
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .stats-grid .stat-item:nth-child(1),
          .stats-grid .stat-item:nth-child(2) {
            border-bottom: 1px solid var(--border);
          }
          .stats-grid .stat-item:nth-child(odd) {
            border-left: none;
          }
          .stats-grid .stat-item:nth-child(even) {
            border-left: 1px solid var(--border);
          }
        }
      `}</style>
    </section>
  );
}
