"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { applicationsApi } from "~/lib/api";

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

/* ── Application pipeline stages ── */
const STAGES = [
  { key: "lead",                  label: "Lead" },
  { key: "consultation",          label: "Consultation" },
  { key: "university_shortlisted",label: "Shortlisted" },
  { key: "applied",               label: "Applied" },
  { key: "offer_received",        label: "Offer Received" },
  { key: "visa_processing",       label: "Visa Processing" },
  { key: "completed",             label: "Completed" },
];

const STATUS_DOT: Record<string, string> = {
  lead:                   "#FEBC2E",
  consultation:           "#FEBC2E",
  university_shortlisted: "#FEBC2E",
  applied:                "#28C840",
  offer_received:         "#28C840",
  visa_processing:        "#28C840",
  completed:              "#8a8a8a",
  rejected:               "#FF5F57",
};

/* ── Filter tabs ── */
const FILTERS = ["All", "In Progress", "Completed", "Rejected"];

function statusGroup(status: string) {
  if (status === "completed") return "Completed";
  if (status === "rejected") return "Rejected";
  return "In Progress";
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

/* ── Pipeline progress bar ── */
function Pipeline({ status }: { status: string }) {
  const idx = STAGES.findIndex((s) => s.key === status);
  if (idx < 0) return null;
  const pct = Math.round(((idx + 1) / STAGES.length) * 100);

  return (
    <div>
      {/* Stage labels */}
      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 8,
          overflowX: "auto",
        }}
      >
        {STAGES.map((s, i) => {
          const done = i <= idx;
          const active = i === idx;
          return (
            <div
              key={s.key}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                flex: 1,
                minWidth: 0,
              }}
            >
              {/* dot */}
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: done
                    ? "var(--fg)"
                    : "var(--border)",
                  border: active ? "2px solid var(--fg)" : "none",
                  flexShrink: 0,
                  transition: "background 0.2s",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 8,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: done ? "var(--fg)" : "var(--muted)",
                  opacity: done ? 1 : 0.55,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                }}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 2,
          background: "var(--border)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "var(--fg)",
            borderRadius: 2,
            transition: "width 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 9,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          {STAGES[idx]?.label}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 9,
            letterSpacing: "0.08em",
            color: "var(--muted)",
          }}
        >
          {pct}%
        </span>
      </div>
    </div>
  );
}

/* ── Application card ── */
function ApplicationCard({ item, index }: { item: any; index: number }) {
  const ref = useReveal(index * 60);
  const [expanded, setExpanded] = useState(false);
  const dot = STATUS_DOT[item.status] ?? "#8a8a8a";
  const rejected = item.status === "rejected";

  return (
    <div ref={ref}>
      {/* Row */}
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

        {/* University + program */}
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
            {item.university_name ?? "University"}
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
            {item.program && <span>{item.program}</span>}
            {item.intake && <span>{item.intake}</span>}
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
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: dot, flexShrink: 0 }} />
          {rejected ? "Rejected" : STAGES.find((s) => s.key === item.status)?.label ?? item.status}
        </span>

        {/* Chevron */}
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
          <div />
          <div
            style={{
              background: "var(--elev)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            {/* Mac dots */}
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
                Application Details
              </span>
            </div>

            {/* Metadata grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "1.25rem",
                padding: "1.25rem",
              }}
            >
              {[
                { label: "Application ID",  value: item.id?.slice(0, 8).toUpperCase() ?? "—" },
                { label: "University",      value: item.university_name ?? "—" },
                { label: "Program",         value: item.program ?? "—" },
                { label: "Intake",          value: item.intake ?? "—" },
                { label: "Country",         value: item.country ?? "—" },
                { label: "Applied On",      value: item.created_at ? fmt(item.created_at) : "—" },
                { label: "Last Updated",    value: item.updated_at ? fmt(item.updated_at) : "—" },
                { label: "Current Stage",   value: STAGES.find((s) => s.key === item.status)?.label ?? item.status },
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
                  <div style={{ fontSize: 13, fontWeight: 500, color: "var(--fg)" }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* Pipeline — only for non-rejected */}
            {!rejected && (
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  padding: "1.25rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: 14,
                  }}
                >
                  Application Pipeline
                </div>
                <Pipeline status={item.status} />
              </div>
            )}

            {/* Rejection note */}
            {rejected && item.rejection_reason && (
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
                    color: "#FF5F57",
                    marginBottom: 8,
                  }}
                >
                  Rejection Reason
                </div>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>
                  {item.rejection_reason}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Loading skeletons ── */
function Skeleton() {
  return (
    <div>
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
            <div style={{ width: "45%", height: 14, background: "var(--border)", borderRadius: 4 }} />
            <div style={{ width: "28%", height: 10, background: "var(--border)", borderRadius: 4, opacity: 0.6 }} />
          </div>
          <div style={{ width: 90, height: 26, background: "var(--border)", borderRadius: 9999 }} />
          <div style={{ width: 13, height: 13, background: "var(--border)", borderRadius: 4 }} />
        </div>
      ))}
    </div>
  );
}

/* ── Main component ── */
export function ApplicationTrackerClient() {
  const [filter, setFilter] = useState("All");
  const headRef = useReveal(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["applications"],
    queryFn: () => applicationsApi.my().then((r: any) => r.data),
  });

  const items: any[] = data?.items ?? [];
  const filtered =
    filter === "All"
      ? items
      : items.filter((a) => statusGroup(a.status) === filter);

  /* Summary counts */
  const counts = {
    inProgress: items.filter((a) => statusGroup(a.status) === "In Progress").length,
    completed:  items.filter((a) => a.status === "completed").length,
    rejected:   items.filter((a) => a.status === "rejected").length,
  };

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
          Dashboard — Applications
        </div>
        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--fg)",
            marginBottom: 24,
          }}
        >
          My Applications
        </h1>

        {/* Summary stat row */}
        {items.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            {[
              { label: "Total",       value: items.length },
              { label: "In Progress", value: counts.inProgress },
              { label: "Completed",   value: counts.completed },
              { label: "Rejected",    value: counts.rejected },
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
                    fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                    color: "var(--fg)",
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  }}
                >
                  {String(value).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pill filter tabs */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {FILTERS.map((f) => {
            const count =
              f === "All" ? items.length
              : items.filter((a) => statusGroup(a.status) === f).length;
            return (
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
                <span style={{ marginLeft: 6, opacity: 0.6 }}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

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
          Failed to load applications. Please refresh.
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
            {filter === "All" ? "No applications yet" : `No ${filter.toLowerCase()} applications`}
          </div>
          <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
            {filter === "All"
              ? "Start by exploring universities and booking a consultation to kick off your application journey."
              : `You have no ${filter.toLowerCase()} applications at the moment.`}
          </p>
        </div>
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <div>
          {filtered.map((item, i) => (
            <ApplicationCard key={item.id} item={item} index={i} />
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      )}
    </div>
  );
}
