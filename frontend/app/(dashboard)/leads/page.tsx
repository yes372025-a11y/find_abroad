"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { leadsApi } from "~/lib/api";
import { useAuth } from "~/hooks/use-auth";

/* ── Mac traffic lights — consistent with dashboard.tsx ── */
const DOTS = [{ c: "#FF5F57" }, { c: "#FEBC2E" }, { c: "#28C840" }];

/* ── Status colour map ── */
const STATUS_COLORS: Record<string, string> = {
  new: "#28C840",
  contacted: "#FEBC2E",
  qualified: "#007AFF",
  converted: "#32ADE6",
  lost: "var(--muted)",
};

/* ── Scroll-reveal — same hook pattern as dashboard.tsx ── */
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
            el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
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

/* ── Lead data shape from backend ── */
interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  source: string;
  status: string;
  target_country: string | null;
  target_program: string | null;
  message: string | null;
  notes: string | null;
  counselor_assigned: string | null;
  created_at: string;
}

/* ── Stat card — matches dashboard.tsx StatCard exactly ── */
function StatCard({
  value,
  label,
  index,
}: {
  value: string | number;
  label: string;
  index: number;
}) {
  const ref = useReveal(index * 80);
  return (
    <div
      ref={ref}
      style={{
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "1.5rem 1.75rem",
        background: "var(--elev)",
      }}
    >
      <p
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: "var(--fg)",
          lineHeight: 1,
          marginBottom: 8,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {label}
      </p>
    </div>
  );
}

/* ── Lead row — border-separated row pattern from dashboard.tsx ── */
function LeadRow({
  lead,
  index,
  onSelect,
}: {
  lead: Lead;
  index: number;
  onSelect: (lead: Lead) => void;
}) {
  const ref = useReveal(index * 40);
  const color = STATUS_COLORS[lead.status] ?? "var(--muted)";

  return (
    <div ref={ref} style={{ borderTop: "1px solid var(--border)" }}>
      <button
        onClick={() => onSelect(lead)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          padding: "0.875rem 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          transition: "opacity 0.15s",
          color: "var(--fg)",
        }}
        className="lead-row-btn"
      >
        {/* Left */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: 0 }}>
          {/* Mac dots */}
          <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
            {DOTS.map((d) => (
              <span
                key={d.c}
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: d.c,
                  display: "block",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
          <span
            style={{
              width: 1,
              height: 14,
              background: "var(--border)",
              display: "block",
              flexShrink: 0,
            }}
          />
          {/* Index */}
          <span
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 10,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
              flexShrink: 0,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {/* Name + meta */}
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "var(--fg)",
                lineHeight: 1.3,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {lead.full_name}
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 10,
                letterSpacing: "0.06em",
                color: "var(--muted)",
                marginTop: 2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {lead.email}
              {lead.target_country ? ` · ${lead.target_country}` : ""}
              {lead.source ? ` · ${lead.source}` : ""}
            </p>
          </div>
        </div>

        {/* Right: status pill */}
        <span
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "3px 10px",
            borderRadius: 9999,
            border: `1px solid ${color}`,
            color,
            flexShrink: 0,
            fontWeight: 600,
          }}
        >
          {lead.status}
        </span>
      </button>
    </div>
  );
}

/* ── Detail drawer ── */
function LeadDrawer({
  lead,
  onClose,
}: {
  lead: Lead | null;
  onClose: () => void;
}) {
  if (!lead) return null;
  const color = STATUS_COLORS[lead.status] ?? "var(--muted)";

  const Field = ({
    label,
    value,
  }: {
    label: string;
    value: string | null | undefined;
  }) =>
    value ? (
      <div style={{ marginBottom: "1.25rem" }}>
        <p
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
        </p>
        <p style={{ fontSize: 14, color: "var(--fg)", lineHeight: 1.6 }}>{value}</p>
      </div>
    ) : null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.3)",
          zIndex: 300,
          animation: "fade-in 0.2s ease",
        }}
      />
      {/* Drawer */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(420px, 92vw)",
          background: "var(--elev)",
          borderLeft: "1px solid var(--border)",
          zIndex: 301,
          overflowY: "auto",
          padding: "2rem 1.75rem",
          animation: "slide-in 0.3s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: "2rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 9,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 8,
              }}
            >
              Lead detail
            </p>
            <h2
              style={{
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "var(--fg)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              {lead.full_name}
            </h2>
            <span
              style={{
                display: "inline-block",
                marginTop: 8,
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "3px 10px",
                borderRadius: 9999,
                border: `1px solid ${color}`,
                color,
                fontWeight: 600,
              }}
            >
              {lead.status}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: 8,
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--muted)",
              flexShrink: 0,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--border)", marginBottom: "1.75rem" }} />

        {/* Fields */}
        <Field label="Email" value={lead.email} />
        <Field label="Phone" value={lead.phone} />
        <Field label="Source" value={lead.source} />
        <Field label="Target country" value={lead.target_country} />
        <Field label="Target program" value={lead.target_program} />
        <Field label="Message" value={lead.message} />
        <Field label="Notes" value={lead.notes} />
        <Field label="Counselor assigned" value={lead.counselor_assigned} />
        <Field
          label="Submitted"
          value={new Date(lead.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        />
      </aside>

      <style>{`
        @keyframes fade-in  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </>
  );
}

/* ── Page ── */
export default function LeadsPage() {
  const { isCounselor, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const headRef = useReveal(0);

  /* Guard: redirect non-counselors */
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isCounselor)) {
      router.replace("/dashboard");
    }
  }, [authLoading, isAuthenticated, isCounselor, router]);

  /* Fetch leads */
  useEffect(() => {
    if (!isCounselor) return;
    setLoading(true);
    leadsApi
      .list({})
      .then((res) => setLeads(res.data.items ?? res.data))
      .catch(() => setError("Failed to load leads."))
      .finally(() => setLoading(false));
  }, [isCounselor]);

  /* Derived */
  const filtered = leads.filter((l) => {
    const matchSearch =
      !search ||
      l.full_name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      (l.target_country ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statuses = ["all", ...Array.from(new Set(leads.map((l) => l.status)))];

  const countByStatus = (s: string) =>
    s === "all" ? leads.length : leads.filter((l) => l.status === s).length;

  if (authLoading || (!isCounselor && isAuthenticated)) return null;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* ── Editorial header — matches dashboard.tsx heading block ── */}
      <div ref={headRef} style={{ marginBottom: "3rem" }}>
        <p
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: 12,
          }}
        >
          Counselor view
        </p>
        <h1
          style={{
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
            marginBottom: 14,
          }}
        >
          Leads
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "var(--muted)",
            maxWidth: 460,
            lineHeight: 1.65,
          }}
        >
          All incoming leads from forms, loan tools, and consultation requests.
        </p>
      </div>

      {/* ── Stats row — matches dashboard.tsx StatCard grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "1rem",
          marginBottom: "3rem",
        }}
      >
        <StatCard value={leads.length} label="Total leads" index={0} />
        <StatCard
          value={leads.filter((l) => l.status === "new").length}
          label="New"
          index={1}
        />
        <StatCard
          value={leads.filter((l) => l.status === "qualified").length}
          label="Qualified"
          index={2}
        />
        <StatCard
          value={leads.filter((l) => l.status === "converted").length}
          label="Converted"
          index={3}
        />
      </div>

      {/* ── Filter bar — matches .schol-filter-bar pattern ── */}
      <div className="schol-filter-bar" style={{ marginBottom: "2rem" }}>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--muted)"
            strokeWidth="2"
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search name, email, country…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="schol-search-input"
            style={{
              paddingLeft: 36,
              paddingRight: 16,
              paddingTop: "0.55rem",
              paddingBottom: "0.55rem",
              border: "1px solid var(--border)",
              borderRadius: 9999,
              background: "var(--elev)",
              color: "var(--fg)",
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 11,
              letterSpacing: "0.04em",
              outline: "none",
              width: 260,
              transition: "border-color 0.2s",
            }}
          />
        </div>

        {/* Status pills */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {statuses.map((s) => {
            const active = statusFilter === s;
            const color = s === "all" ? "var(--fg)" : (STATUS_COLORS[s] ?? "var(--muted)");
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "4px 12px",
                  borderRadius: 9999,
                  border: `1px solid ${active ? color : "var(--border)"}`,
                  background: active ? color : "transparent",
                  color: active ? (s === "all" ? "var(--bg)" : "var(--bg)") : "var(--muted)",
                  cursor: "pointer",
                  fontWeight: 600,
                  transition: "all 0.15s",
                }}
              >
                {s} ({countByStatus(s)})
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Leads list ── */}
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "3rem 0",
            color: "var(--muted)",
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 11,
            letterSpacing: "0.06em",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              border: "1.5px solid var(--border)",
              borderTop: "1.5px solid var(--fg)",
              animation: "spin 0.7s linear infinite",
              flexShrink: 0,
            }}
          />
          Loading leads…
        </div>
      ) : error ? (
        <p
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 12,
            color: "#FF5F57",
            letterSpacing: "0.06em",
            padding: "2rem 0",
          }}
        >
          {error}
        </p>
      ) : filtered.length === 0 ? (
        <div style={{ padding: "3rem 0", borderTop: "1px solid var(--border)" }}>
          <p
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            No leads found
          </p>
        </div>
      ) : (
        <>
          {/* Section label */}
          <p
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "1.25rem",
            }}
          >
            {filtered.length} lead{filtered.length !== 1 ? "s" : ""}
          </p>

          {filtered.map((lead, i) => (
            <LeadRow
              key={lead.id}
              lead={lead}
              index={i}
              onSelect={setSelectedLead}
            />
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </>
      )}

      {/* ── Lead detail drawer ── */}
      <LeadDrawer lead={selectedLead} onClose={() => setSelectedLead(null)} />

      <style>{`
        .lead-row-btn:hover { opacity: 0.65; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
