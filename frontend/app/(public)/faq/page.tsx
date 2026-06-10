"use client";

import { useState } from "react";

const faqs: { q: string; a: string }[] = [
  { q: "How do I apply to a university?", a: "Book a consultation — our experts guide you through every step, from shortlisting to visa." },
  { q: "What documents do I need?", a: "Typically: passport, transcripts, SOP, LORs, and language test scores (IELTS/TOEFL). Requirements vary by country." },
  { q: "Is Find Abroad free to use?", a: "Yes! Browsing universities, checking scholarships, and booking your first consultation are completely free." },
  { q: "How long does the application process take?", a: "Most applications take 3–6 months from shortlisting to offer. We help you stay on track." },
  { q: "Can I apply without work experience?", a: "Absolutely. Many top programs admit fresh graduates, especially for Masters programs." },
  { q: "Which countries do you support?", a: "USA, UK, Canada, Australia, Germany, France, Ireland, and New Zealand — with more being added." },
  { q: "How does the loan eligibility checker work?", a: "You fill in a quick 4-step form with your academic and financial profile, and we match you with eligible lenders." },
  { q: "What does the Standard plan include?", a: "The Standard plan (₹15,000) covers full application support for 3 universities, 2 rounds of SOP review, a visa document checklist, and a dedicated counselor. View all plans on our Services page." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <style>{`
        .faq-btn:hover { opacity: 0.7; transition: opacity 0.2s; }
      `}</style>

      <section style={{ padding: "6rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>

            {/* Section header */}
            <div style={{ marginBottom: "3rem" }}>
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "0.75rem",
              }}>
                Support
              </p>
              <h1 style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: 800,
                color: "var(--fg)",
                lineHeight: 1.15,
                marginBottom: "0.75rem",
              }}>
                Frequently Asked Questions
              </h1>
              <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.6 }}>
                Everything you need to know about studying abroad with Find Abroad.
              </p>
            </div>

            {/* Accordion list */}
            <div>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <button
                    className="faq-btn"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "none",
                      border: "none",
                      padding: "1.25rem 0",
                      cursor: "pointer",
                      textAlign: "left",
                      gap: "1rem",
                    }}
                  >
                    <span style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--fg)",
                      lineHeight: 1.4,
                    }}>
                      {faq.q}
                    </span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        flexShrink: 0,
                        color: "var(--muted)",
                        transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s",
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {openIndex === i && (
                    <div style={{
                      padding: "0 0 1.25rem",
                      fontSize: 15,
                      color: "var(--muted)",
                      lineHeight: 1.7,
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}