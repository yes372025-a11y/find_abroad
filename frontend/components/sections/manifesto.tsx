"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

export function ManifestoSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const heading = ref.current?.querySelector<HTMLElement>(".manifesto-heading");
    const sub = ref.current?.querySelector<HTMLElement>(".manifesto-sub");
    if (!heading || !sub) return;

    const revealEl = (el: HTMLElement, delay: number) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.transition = "opacity 0.9s ease, transform 0.9s ease";
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, delay);
            observer.disconnect();
          }
        },
        { threshold: 0.12 }
      );
      observer.observe(el);
    };

    revealEl(heading, 0);
    revealEl(sub, 180);
  }, []);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "7rem 0 6rem",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <h2
          className="manifesto-heading"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 6rem)",
            fontWeight: 500,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            margin: "0 0 2rem",
            maxWidth: "16ch",
            color: "var(--fg)",
          }}
        >
          Expert Guidance, Not Generic Advice
        </h2>
        <p
          className="manifesto-sub"
          style={{
            maxWidth: "52ch",
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            lineHeight: 1.65,
            color: "var(--muted)",
            fontWeight: 400,
          }}
        >
          We don&apos;t stop at a brochure. We understand your academic profile,
          your financial situation, and your goals — then deploy expert counselors
          and smart tools to get you into the right university, with the right
          funding.
        </p>
        <Link
          href="/services"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginTop: "1.75rem",
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--muted)",
            textDecoration: "none",
          }}
        >
          View services &amp; pricing
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
      {/* Bottom hairline */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "var(--border)",
        }}
      />
    </section>
  );
}
