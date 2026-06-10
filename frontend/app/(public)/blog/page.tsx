"use client";

const posts: { title: string; tag: string; date: string; summary: string }[] = [
  { title: "Top 10 Universities for MS in Computer Science in 2025", tag: "Universities", date: "Jan 15, 2025", summary: "A comprehensive guide to the best CS programs globally — rankings, fees, and acceptance rates." },
  { title: "How to Get a Fully-Funded Scholarship Abroad", tag: "Scholarships", date: "Feb 3, 2025", summary: "Step-by-step guide to finding and winning scholarships that cover tuition, living, and more." },
  { title: "Education Loans Without Collateral: A Complete Guide", tag: "Loans", date: "Mar 12, 2025", summary: "Prodigy Finance, MPOWER, and other lenders that offer loans without requiring collateral." },
  { title: "Study in Germany for Free: Public Universities Explained", tag: "Study Abroad", date: "Apr 8, 2025", summary: "Germany offers world-class education at near-zero tuition. Here's what you need to know." },
  { title: "SOP Writing Tips That Actually Get You Admitted", tag: "Application", date: "May 5, 2025", summary: "Common mistakes to avoid and proven strategies to write a compelling Statement of Purpose." },
  { title: "Post-Study Work Visa Options by Country", tag: "Visa", date: "May 20, 2025", summary: "A comparison of post-study work permits in the USA, UK, Canada, Australia, Germany, France, Ireland, and New Zealand." },
];

export default function BlogPage() {
  return (
    <>
      <style>{`
        .blog-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          transition: all 0.2s;
        }
      `}</style>

      <section style={{ padding: "6rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>

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
              Resources
            </p>
            <h1 style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "var(--fg)",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}>
              Blog
            </h1>
            <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.6, maxWidth: 520 }}>
              Expert guides, tips, and insights to help you study abroad successfully.
            </p>
          </div>

          {/* Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}>
            {posts.map((p) => (
              <div
                key={p.title}
                className="blog-card"
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  background: "var(--elev)",
                  padding: "1.75rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {/* Tag + Date row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    padding: "3px 10px",
                    borderRadius: 9999,
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                  }}>
                    {p.tag}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--muted)",
                  }}>
                    {p.date}
                  </span>
                </div>

                {/* Title */}
                <p style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--fg)",
                  lineHeight: 1.4,
                  marginBottom: "0.75rem",
                }}>
                  {p.title}
                </p>

                {/* Summary */}
                <p style={{
                  fontSize: 14,
                  color: "var(--muted)",
                  lineHeight: 1.7,
                }}>
                  {p.summary}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}