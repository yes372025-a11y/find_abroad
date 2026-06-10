"use client";

const stories: {
  name: string;
  from: string;
  to: string;
  program: string;
  scholarship: string;
  rating: number;
  quote: string;
  avatar: string;
  campusImg: string;
  countryFlag: string;
}[] = [
  {
    name: "Priya Sharma",
    from: "India",
    to: "University of Toronto, Canada",
    program: "MBA",
    scholarship: "$15,000/yr scholarship",
    rating: 5,
    quote: "Find Abroad connected me with a scholarship I never knew existed. The counselors were exceptional.",
    avatar: "https://i.pravatar.cc/120?img=47",
    campusImg: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=75&fit=crop",
    countryFlag: "🇨🇦",
  },
  {
    name: "Rahul Menon",
    from: "India",
    to: "TU Munich, Germany",
    program: "MS Computer Science",
    scholarship: "Fully funded DAAD scholarship",
    rating: 5,
    quote: "From zero knowledge about German universities to a fully-funded admit — Find Abroad made it happen.",
    avatar: "https://i.pravatar.cc/120?img=12",
    campusImg: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=75&fit=crop",
    countryFlag: "🇩🇪",
  },
  {
    name: "Ananya Patel",
    from: "India",
    to: "University College London, UK",
    program: "MSc Finance",
    scholarship: "Partial merit scholarship",
    rating: 5,
    quote: "The loan checker was spot on. I got approved for exactly the amount predicted.",
    avatar: "https://i.pravatar.cc/120?img=44",
    campusImg: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=75&fit=crop",
    countryFlag: "🇬🇧",
  },
  {
    name: "Vikram Singh",
    from: "India",
    to: "University of Melbourne, Australia",
    program: "MS Data Science",
    scholarship: "University scholarship",
    rating: 5,
    quote: "Booked a consultation on a whim. Six months later I had an Australian student visa.",
    avatar: "https://i.pravatar.cc/120?img=15",
    campusImg: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800&q=75&fit=crop",
    countryFlag: "🇦🇺",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 3, marginBottom: "0.75rem" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? "#FEBC2E" : "none"}
          stroke={i < rating ? "#FEBC2E" : "var(--border)"}
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function SuccessStoriesPage() {
  return (
    <>
      <style>{`
        .story-card:hover { transform: translateY(-3px); transition: transform 0.2s; }
      `}</style>

      <section style={{ padding: "6rem 0", paddingTop: "calc(var(--nav-h, 80px) + 4rem)" }}>
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
              Student Stories
            </p>
            <h1 style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--fg)",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}>
              Success Stories
            </h1>
            <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.65, maxWidth: 520 }}>
              25,000+ students have trusted Find Abroad. Here&apos;s how we changed their lives.
            </p>
          </div>

          {/* Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.5rem",
          }}>
            {stories.map((s) => (
              <div
                key={s.name}
                className="story-card"
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "var(--elev)",
                  transition: "transform 0.2s",
                }}
              >
                {/* Campus image */}
                <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.campusImg}
                    alt={`${s.to} campus`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                  />
                  {/* Gradient overlay */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)",
                  }} />
                  {/* Flag + university name */}
                  <div style={{
                    position: "absolute",
                    bottom: 14,
                    left: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}>
                    <span style={{ fontSize: "1.2rem" }}>{s.countryFlag}</span>
                    <span style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.9)",
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.06em",
                    }}>
                      {s.to}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: "1.5rem" }}>
                  <StarRating rating={s.rating} />

                  {/* Quote */}
                  <p style={{
                    fontStyle: "italic",
                    fontSize: 14,
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    marginTop: "1rem",
                    borderLeft: "2px solid var(--border)",
                    paddingLeft: "1rem",
                  }}>
                    &ldquo;{s.quote}&rdquo;
                  </p>

                  {/* Divider */}
                  <div style={{ borderTop: "1px solid var(--border)", marginTop: "1.25rem", paddingTop: "1.25rem" }}>
                    {/* Avatar + name row */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={s.avatar}
                          alt={s.name}
                          width={42}
                          height={42}
                          style={{ borderRadius: "50%", objectFit: "cover", border: "2px solid var(--border)", flexShrink: 0 }}
                        />
                        <div>
                          <p style={{ fontSize: 17, fontWeight: 700, color: "var(--fg)" }}>{s.name}</p>
                          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{s.program}</p>
                        </div>
                      </div>

                      {/* Scholarship pill */}
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        padding: "2px 10px",
                        borderRadius: 9999,
                        border: "1px solid var(--border)",
                        color: "var(--muted)",
                        whiteSpace: "nowrap",
                        maxWidth: 160,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                        {s.scholarship}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}