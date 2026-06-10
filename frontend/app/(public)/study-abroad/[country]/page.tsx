import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COUNTRIES_DATA, COUNTRIES_LIST } from "~/lib/data/countries";
import { UniversityListClient } from "~/components/sections/university-list-client";

const COUNTRY_IMG: Record<string, string> = {
  usa: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&q=75&fit=crop",
  uk: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=75&fit=crop",
  canada: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1200&q=75&fit=crop",
  australia: "https://images.unsplash.com/photo-1524293568345-75d62c3664f7?w=1200&q=75&fit=crop",
  germany: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=75&fit=crop",
  ireland: "https://images.unsplash.com/photo-1549918864-48ac978761a4?w=1200&q=75&fit=crop",
  france: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=75&fit=crop",
  "new-zealand": "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1200&q=75&fit=crop",
};

interface PageProps {
  params: {
    country: string;
  };
}

export function generateStaticParams() {
  return COUNTRIES_LIST.map((c) => ({
    country: c.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = COUNTRIES_DATA[params.country];
  if (!data) return {};
  
  return {
    title: data.metaTitle,
    description: data.metaDescription,
  };
}

export default function StudyAbroadCountryPage({ params }: PageProps) {
  const data = COUNTRIES_DATA[params.country];
  
  if (!data) {
    notFound();
  }

  return (
    <div style={{ background: "var(--bg)", color: "var(--fg)" }}>

      {/* ── Immersive Hero ── */}
      <section
        className="study-hero-section"
        style={{
          position: "relative",
          minHeight: "75vh",
          display: "flex",
          alignItems: "flex-end",
          padding: "2rem",
          paddingBottom: "4rem",
          borderBottom: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={COUNTRY_IMG[data.slug] || "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&q=75&fit=crop"}
            alt={`${data.name} campus`}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", width: "100%" }}>
          {/* Breadcrumb */}
          <div
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Home</Link>
            <span style={{ opacity: 0.4 }}>›</span>
            <Link href="/universities" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Study Abroad</Link>
            <span style={{ opacity: 0.4 }}>›</span>
            <span style={{ color: "#fff" }}>{data.name}</span>
          </div>

          {/* Flag + headline */}
          <div
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.8)",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 20 }}>{data.flag}</span>
            {data.name}
          </div>

          <h1
            style={{
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "#fff",
              marginBottom: "1.5rem",
            }}
          >
            {data.heroTitle}
          </h1>

          <p
            style={{
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.7,
              maxWidth: 540,
              marginBottom: "2.5rem",
            }}
          >
            {data.heroDescription}
          </p>

          <a
            href="/consultation"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "0.7rem 1.6rem",
              borderRadius: 9999,
              border: "1px solid #fff",
              background: "#fff",
              color: "#000",
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            Book Free Consultation
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── Key facts ── */}
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "4rem 2rem",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 9,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "2rem",
            }}
          >
            At a Glance
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 0,
            }}
          >
            {data.facts.map((f, i) => (
              <div
                key={f.label}
                className="facts-grid-item"
                style={{
                  borderLeft: i === 0 ? "none" : "1px solid var(--border)",
                  paddingLeft: i === 0 ? 0 : "2rem",
                  paddingRight: "2rem",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    color: "var(--fg)",
                    marginBottom: 6,
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  }}
                >
                  {f.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  {f.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Country — Split Layout ── */}
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "7rem 2rem",
        }}
      >
        <div 
          className="why-country-split"
          style={{ 
            maxWidth: 1100, 
            margin: "0 auto",
          }}
        >
          {/* Left Column - Sticky Title */}
          <div style={{ position: "sticky", top: "calc(var(--nav-h, 80px) + 2rem)", alignSelf: "start" }}>
            <div
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "1rem",
              }}
            >
              Why {data.name}?
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "var(--fg)",
              }}
            >
              What makes it<br />a top destination
            </h2>
          </div>

          {/* Right Column - Highlights */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {data.highlights.map((h, i) => (
              <div
                key={h.num}
                style={{
                  padding: "2rem",
                  background: "var(--elev)",
                  borderRadius: 14,
                  border: "1px solid var(--border)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: 10,
                      letterSpacing: "0.08em",
                      color: "var(--fg)",
                      background: "var(--border)",
                      padding: "4px 8px",
                      borderRadius: 4,
                    }}
                  >
                    {h.num}
                  </span>
                  <div
                    style={{
                      fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      color: "var(--fg)",
                      paddingTop: 2,
                    }}
                  >
                    {h.title}
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {h.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "7rem 2rem",
          background: "var(--elev)",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "1rem",
              }}
            >
              How It Works
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "var(--fg)",
              }}
            >
              Your journey,<br />step by step
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "2rem",
            }}
          >
            {data.process.map((p, i) => (
              <div
                key={p.step}
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "2rem",
                  transform: `translateY(${i % 2 !== 0 ? '2rem' : '0'})`,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                className="process-card hover-lift"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: "var(--border)",
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--fg)",
                    marginBottom: "1.5rem",
                  }}
                >
                  {p.step}
                </div>
                <div
                  style={{
                    fontSize: "clamp(1.1rem, 1.3vw, 1.2rem)",
                    fontWeight: 500,
                    color: "var(--fg)",
                    marginBottom: 12,
                  }}
                >
                  {p.label}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Courses ── */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 9,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "1rem",
            }}
          >
            Popular Courses
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--fg)",
              marginBottom: "3rem",
            }}
          >
            Top fields of study<br />& average tuition
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: 0,
            }}
          >
            {data.topCourses.map((c, i) => (
              <div
                key={c.name}
                className="courses-grid-item"
                style={{
                  borderLeft: i === 0 ? "none" : "1px solid var(--border)",
                  paddingLeft: i === 0 ? 0 : "1.5rem",
                  paddingRight: "1.5rem",
                  paddingBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: "clamp(1rem, 1.6vw, 1.25rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    color: "var(--fg)",
                    marginBottom: 8,
                  }}
                >
                  {c.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  {c.avg}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cost of Living ── */}
      <section style={{ borderBottom: "1px solid var(--border)", padding: "7rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 9,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "1rem",
            }}
          >
            Cost of Living
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--fg)",
              marginBottom: "3rem",
            }}
          >
            Monthly expenses<br />estimate
          </h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {data.costOfLiving.map((item, i) => (
              <div
                key={item.category}
                className="hover-row group"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1.5rem",
                  borderTop: "1px solid var(--border)",
                  borderBottom: i === data.costOfLiving.length - 1 ? "1px solid var(--border)" : "none",
                  transition: "background 0.2s ease, padding-left 0.2s ease",
                  cursor: "default",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <svg className="row-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0, transform: "translateX(-10px)", transition: "all 0.2s ease", color: "var(--muted)" }}>
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                  <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", color: "var(--fg)", margin: 0, fontWeight: 500 }}>{item.category}</p>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: "var(--fg)",
                    margin: 0,
                    background: "var(--elev)",
                    padding: "4px 12px",
                    borderRadius: 999,
                    border: "1px solid var(--border)",
                  }}
                >
                  {item.monthly}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visa Guide ── */}
      <section style={{ borderBottom: "1px solid var(--border)", padding: "7rem 2rem", background: "var(--elev)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>Visa Guide</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--fg)", marginBottom: "3rem" }}>
            Student visa —<br />step by step
          </h2>
          {data.visaSteps.map((v) => (
            <div key={v.step} className="hover-row group" style={{ borderTop: "1px solid var(--border)", padding: "2rem 1.5rem", display: "flex", gap: "2rem", alignItems: "flex-start", transition: "background 0.2s ease, transform 0.2s ease" }}>
              <span style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)", fontSize: 11, fontWeight: 600, color: "var(--muted)", paddingTop: 3 }}>{v.step}</span>
              <div>
                <div style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--fg)", marginBottom: "0.5rem" }}>{v.title}</div>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </section>

      {/* ── Scholarships ── */}
      <section style={{ borderBottom: "1px solid var(--border)", padding: "7rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>Funding</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--fg)", marginBottom: "3rem" }}>
            Scholarships available
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {data.scholarships.map((s) => (
              <div key={s.name} className="hover-lift" style={{ border: "1px solid var(--border)", borderRadius: 14, padding: "2rem", background: "var(--elev)", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--fg)" }}>{s.name}</div>
                  <span style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 8px", border: "1px solid var(--border)", borderRadius: 999, color: "var(--fg)", background: "var(--bg)" }}>{s.type}</span>
                </div>
                <div style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)", fontSize: 10, color: "var(--fg)", marginBottom: "1rem", letterSpacing: "0.05em", display: "inline-block", padding: "4px 8px", background: "var(--border)", borderRadius: 4 }}>DEADLINE: {s.deadline}</div>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Universities list ── */}
      <section style={{ padding: "5rem 2rem 6rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 9,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "1rem",
            }}
          >
            Universities
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--fg)",
              marginBottom: "3rem",
            }}
          >
            Top {data.name} universities
          </h2>
          <UniversityListClient defaultCountry={data.slug} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          padding: "5rem 2rem",
          background: "var(--elev)",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: "0.75rem",
                }}
              >
                Free Expert Guidance
              </div>
              <h3
                style={{
                  fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  color: "var(--fg)",
                  maxWidth: 400,
                }}
              >
                Ready to study in {data.name}? Let our experts guide you.
              </h3>
            </div>
            <a
              href="/consultation"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "0.7rem 1.6rem",
                borderRadius: 9999,
                border: "1px solid var(--fg)",
                background: "var(--fg)",
                color: "var(--bg)",
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Book Consultation
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .why-country-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }
        @media (max-width: 768px) {
          .why-country-split {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .why-country-split > div:first-child {
            position: relative !important;
            top: 0 !important;
          }
          .process-card {
            transform: none !important;
          }
        }
        .hover-row:hover {
          background: var(--bg);
          padding-left: 2rem !important;
        }
        .hover-row:hover .row-arrow {
          opacity: 1 !important;
          transform: translateX(0) !important;
          color: var(--fg) !important;
        }
        .hover-lift:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 14px 40px rgba(0,0,0,0.06) !important;
        }
      `}} />

    </div>
  );
}
