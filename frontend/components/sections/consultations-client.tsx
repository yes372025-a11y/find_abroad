"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { consultationsApi } from "~/lib/api";

/* ── Mac traffic-light dots ── */
const DOTS = [{ c: "#FF5F57" }, { c: "#FEBC2E" }, { c: "#28C840" }];

/* ── Scroll reveal ── */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ── Status config ── */
const STATUS_CONFIG: Record<string, { label: string; dot: string }> = {
  pending:   { label: "Pending",   dot: "#FEBC2E" },
  confirmed: { label: "Confirmed", dot: "#28C840" },
  completed: { label: "Completed", dot: "#8a8a8a" },
  cancelled: { label: "Cancelled", dot: "#FF5F57" },
};

/* ── Filter tabs ── */
const FILTERS = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

/* ── Format date ── */
function fmt(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function fmtTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}

/* ── Consultation card ── */
function ConsultationCard({ item, index }: { item: any; index: number }) {
  const ref = useReveal(index * 60);
  const [expanded, setExpanded] = useState(false);
  const cfg = STATUS_CONFIG[item.status] ?? { label: item.status, dot: "#8a8a8a" };

  return (
    <div ref={ref}>
      {/* Row header — always visible */}
      <div
        onClick={() => setExpanded((e) => !e)}
        style={{
          borderTop: "1px solid var(--border)",
          padding: "1.25rem 0",
          cursor: "pointer",
          display: "grid",
          gridTemplateColumns: "28px 1fr auto auto",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {/* Index */}
        <span
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 10,
            letterSpacing: "0.08em",
            color: "var(--muted)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Main info */}
        <div>
          <div
            style={{
              fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "var(--fg)",
              marginBottom: 4,
            }}
          >
            {item.consultant_name ?? "Consultant Session"}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 10,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {item.scheduled_at && (
              <>
                <span>{fmt(item.scheduled_at)}</span>
                <span>{fmtTime(item.scheduled_at)}</span>
              </>
            )}
            {item.topic && <span>{item.topic}</span>}
          </div>
        </div>

        {/* Status pill */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "0.3rem 0.75rem",
            borderRadius: 9999,
            border: "1px solid var(--border)",
            background: "var(--elev)",
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--fg)",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: cfg.dot,
              flexShrink: 0,
            }}
          />
          {cfg.label}
        </span>

        {/* Expand chevron */}
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.76, 0, 0.24, 1)",
            flexShrink: 0,
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div
          style={{
            borderTop: "1px solid var(--border)",
            padding: "1.5rem 0 2rem",
            display: "grid",
            gridTemplateColumns: "28px 1fr",
            gap: "1rem",
          }}
        >
          <div /> {/* spacer for index column */}
          <div
            style={{
              background: "var(--elev)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            {/* Mac dots header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "0.85rem 1rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {DOTS.map((d, i) => (
                <span
                  key={i}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: d.c,
                    display: "block",
                    flexShrink: 0,
                  }}
                />
              ))}
              <span
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginLeft: 8,
                }}
              >
                Session Details
              </span>
            </div>

            {/* Detail grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "1.25rem",
                padding: "1.25rem",
              }}
            >
              {[
                { label: "Session ID",   value: item.id?.slice(0, 8).toUpperCase() ?? "—" },
                { label: "Consultant",   value: item.consultant_name ?? "—" },
                { label: "Date",         value: item.scheduled_at ? fmt(item.scheduled_at) : "—" },
                { label: "Time",         value: item.scheduled_at ? fmtTime(item.scheduled_at) : "—" },
                { label: "Duration",     value: item.duration_minutes ? `${item.duration_minutes} min` : "60 min" },
                { label: "Topic",        value: item.topic ?? "General Consultation" },
                { label: "Status",       value: cfg.label },
                { label: "Mode",         value: item.mode ?? "Video Call" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: 9,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      marginBottom: 4,
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--fg)",
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* Notes section */}
            {item.notes && (
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  padding: "1rem 1.25rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: 8,
                  }}
                >
                  Notes
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    lineHeight: 1.7,
                  }}
                >
                  {item.notes}
                </p>
              </div>
            )}

            {/* Join / action button */}
            {item.status === "confirmed" && item.meeting_link && (
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  padding: "1rem 1.25rem",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <a
                  href={item.meeting_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "0.6rem 1.4rem",
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
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                >
                  Join Session
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Book consultation CTA ── */
function BookCTA() {
  const ref = useReveal(0);
  return (
    <div
      ref={ref}
      style={{
        background: "var(--elev)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: "2.5rem",
      }}
    >
      {/* Hatched visual area */}
      <div
        style={{
          width: "100%",
          aspectRatio: "6/1",
          background: "repeating-linear-gradient(45deg, var(--border) 0 8px, var(--elev) 8px 16px)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 9,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          Book a new session
        </span>
      </div>

      <div
        style={{
          padding: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 6,
            }}
          >
            Expert Guidance
          </div>
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "var(--fg)",
              maxWidth: 420,
              lineHeight: 1.5,
            }}
          >
            Get personalised advice from our overseas education experts on university selection, applications, and visas.
          </p>
        </div>
        <a
          href="/consultation"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "0.65rem 1.5rem",
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
            transition: "opacity 0.2s",
          }}
        >
          Book Consultation
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ── Loading skeletons ── */
function Skeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            borderTop: "1px solid var(--border)",
            padding: "1.25rem 0",
            display: "grid",
            gridTemplateColumns: "28px 1fr auto auto",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <div style={{ width: 18, height: 10, background: "var(--border)", borderRadius: 4 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ width: "40%", height: 14, background: "var(--border)", borderRadius: 4 }} />
            <div style={{ width: "25%", height: 10, background: "var(--border)", borderRadius: 4, opacity: 0.6 }} />
          </div>
          <div style={{ width: 80, height: 26, background: "var(--border)", borderRadius: 9999 }} />
          <div style={{ width: 13, height: 13, background: "var(--border)", borderRadius: 4 }} />
        </div>
      ))}
    </div>
  );
}

/* ── Main component ── */
export function ConsultationsClient() {
  const [filter, setFilter] = useState("All");
  const headRef = useReveal(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["consultations"],
    queryFn: () => consultationsApi.my().then((r: any) => r.data),
  });

  const items: any[] = data?.items ?? [];
  const filtered =
    filter === "All"
      ? items
      : items.filter((c) => c.status?.toLowerCase() === filter.toLowerCase());

  return (
    <div style={{ maxWidth: 900 }}>
      {/* Editorial header */}
      <div ref={headRef} style={{ marginBottom: "2.5rem" }}>
        <div
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 9,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: 10,
          }}
        >
          Dashboard — Consultations
        </div>
        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--fg)",
            marginBottom: 16,
          }}
        >
          My Consultations
        </h1>

        {/* Pill filter tabs */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "0.35rem 0.9rem",
                borderRadius: 9999,
                border: "1px solid var(--border)",
                background: filter === f ? "var(--fg)" : "transparent",
                color: filter === f ? "var(--bg)" : "var(--muted)",
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              {f}
              {f !== "All" && (
                <span style={{ marginLeft: 6, opacity: 0.6 }}>
                  {items.filter((c) => c.status?.toLowerCase() === f.toLowerCase()).length}
                </span>
              )}
              {f === "All" && (
                <span style={{ marginLeft: 6, opacity: 0.6 }}>{items.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Book CTA */}
      <BookCTA />

      {/* List */}
      {isLoading && <Skeleton />}

      {isError && (
        <div
          style={{
            padding: "1.25rem",
            border: "1px solid var(--border)",
            borderRadius: 12,
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 11,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#FF5F57",
          }}
        >
          Failed to load consultations. Please refresh.
        </div>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "3rem",
            paddingBottom: "2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 12,
            }}
          >
            {filter === "All" ? "No sessions yet" : `No ${filter.toLowerCase()} sessions`}
          </div>
          <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
            {filter === "All"
              ? "Book your first consultation to get expert guidance on your study abroad journey."
              : `You have no ${filter.toLowerCase()} consultations at the moment.`}
          </p>
        </div>
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <div>
          {/* Divider closing the list */}
          {filtered.map((item, i) => (
            <ConsultationCard key={item.id} item={item} index={i} />
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      )}
    </div>
  );
}
