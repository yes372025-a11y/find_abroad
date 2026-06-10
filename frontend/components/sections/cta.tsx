"use client";

import Link from "next/link";
import { Fragment, useRef, useEffect } from "react";

const MARQUEE_PHRASES = [
  "study in usa.", "scholarship ready.", "loan approved.", "visa granted.",
  "dreams fulfilled.", "study in uk.", "new beginnings.", "study in canada.",
  "expert guidance.", "study in germany.", "your future.", "starts here.",
  "study in france.", "study in ireland.", "study in new zealand."
];

const PARTNER_LOGOS = [
  { name: "Harvard" }, { name: "Oxford" }, { name: "MIT" }, { name: "Toronto" },
  { name: "TU Munich" }, { name: "UCD" }, { name: "Melbourne" }, { name: "McGill" },
];

export function CTASection() {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Magnetic CTA
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    let animId: number;
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) { targetX = dx * 0.35; targetY = dy * 0.35; }
      else { targetX = 0; targetY = 0; }
    };
    const animate = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      btn.style.transform = `translate(${currentX}px, ${currentY}px)`;
      animId = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(animId); };
  }, []);

  // Scroll reveal for heading
  useEffect(() => {
    const el = sectionRef.current?.querySelector<HTMLElement>(".cta-heading");
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.transition = "opacity 0.9s ease, transform 0.9s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(el);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pad-xl"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", padding: "7rem 0 0" }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 1.5rem 7rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "2rem",
          }}
        >
          Ready to start
        </p>

        <h2
          className="cta-heading"
          style={{
            fontSize: "clamp(3rem, 9vw, 9rem)",
            fontWeight: 500,
            lineHeight: 0.93,
            letterSpacing: "-0.04em",
            color: "var(--fg)",
            margin: "0 0 3.5rem",
          }}
        >
          Let&apos;s find your<br />university abroad
        </h2>

        <Link
          ref={btnRef}
          href="/consultation"
          className="hover-btn-primary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "1rem 2rem",
            borderRadius: 9999,
            border: "1px solid var(--fg)",
            color: "var(--fg)",
            fontSize: 15,
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Book Free Consultation
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>

      {/* Partner logo marquee */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          overflow: "hidden",
          maskImage: "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          padding: "1.75rem 0",
        }}
        aria-hidden="true"
      >
        <div className="logo-track">
          {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
            <Fragment key={`logo-${i}`}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 110,
                  height: 42,
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  background: "var(--elev)",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", color: "var(--muted)", textTransform: "uppercase" }}>
                  {logo.name}
                </span>
              </div>
              <span style={{ flexShrink: 0, opacity: 0.2, fontSize: 9, color: "var(--muted)" }}>◆</span>
            </Fragment>
          ))}
        </div>
      </div>

    </section>
  );
}
