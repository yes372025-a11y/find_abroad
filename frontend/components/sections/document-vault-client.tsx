"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { documentsApi } from "~/lib/api";

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

/* ── Document types ── */
const DOC_TYPES = [
  { value: "passport",        label: "Passport" },
  { value: "sop",             label: "Statement of Purpose" },
  { value: "lor",             label: "Letter of Recommendation" },
  { value: "mark_sheet",      label: "Mark Sheet / Transcript" },
  { value: "offer_letter",    label: "Offer Letter" },
  { value: "bank_statement",  label: "Bank Statement" },
  { value: "visa",            label: "Visa" },
  { value: "other",           label: "Other" },
];

function docLabel(value: string) {
  return DOC_TYPES.find((t) => t.value === value)?.label ?? value;
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function fileExt(name: string) {
  return name.split(".").pop()?.toUpperCase() ?? "FILE";
}

function fileIcon(name: string) {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return "#FF5F57";
  if (["jpg", "jpeg", "png"].includes(ext ?? "")) return "#28C840";
  if (["doc", "docx"].includes(ext ?? "")) return "#4A90D9";
  return "var(--muted)";
}

/* ── Filter tabs ── */
const FILTERS = [
  { key: "all",   label: "All" },
  ...DOC_TYPES.map((t) => ({ key: t.value, label: t.label })),
];

/* ── Upload zone ── */
function UploadZone({
  docType,
  setDocType,
  onUpload,
  uploading,
}: {
  docType: string;
  setDocType: (v: string) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
}) {
  const ref = useReveal(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

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
          Upload Document
        </span>
      </div>

      <div style={{ padding: "1.5rem" }}>
        {/* Doc type selector */}
        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              display: "block",
              marginBottom: 8,
            }}
          >
            Document Type
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {DOC_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setDocType(t.value)}
                style={{
                  padding: "0.3rem 0.8rem",
                  borderRadius: 9999,
                  border: "1px solid var(--border)",
                  background: docType === t.value ? "var(--fg)" : "transparent",
                  color: docType === t.value ? "var(--bg)" : "var(--muted)",
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 9,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const file = e.dataTransfer.files?.[0];
            if (file && fileRef.current) {
              const dt = new DataTransfer();
              dt.items.add(file);
              fileRef.current.files = dt.files;
              fileRef.current.dispatchEvent(new Event("change", { bubbles: true }));
            }
          }}
          style={{
            border: `1.5px dashed ${dragOver ? "var(--fg)" : "var(--border)"}`,
            borderRadius: 12,
            padding: "2.5rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            background: dragOver
              ? "repeating-linear-gradient(45deg, var(--border) 0 8px, var(--elev) 8px 16px)"
              : "transparent",
            transition: "border-color 0.2s, background 0.2s",
            cursor: "pointer",
          }}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? (
            <>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: "1.5px solid var(--border)",
                  borderTop: "1.5px solid var(--fg)",
                  animation: "spin 0.7s linear infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                Uploading…
              </span>
            </>
          ) : (
            <>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 16 12 12 8 16" />
                <line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--fg)",
                    marginBottom: 4,
                  }}
                >
                  Drop file here or click to browse
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 9,
                    letterSpacing: "0.08em",
                    color: "var(--muted)",
                  }}
                >
                  PDF, DOC, DOCX, JPG, PNG — Max 10 MB
                </div>
              </div>
            </>
          )}

          <input
            ref={fileRef}
            type="file"
            hidden
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={onUpload}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Document row card ── */
function DocCard({ doc, index }: { doc: any; index: number }) {
  const ref = useReveal(index * 50);
  const [expanded, setExpanded] = useState(false);
  const iconColor = fileIcon(doc.file_name ?? "");
  const ext = fileExt(doc.file_name ?? "file.bin");

  return (
    <div ref={ref}>
      {/* Row */}
      <div
        onClick={() => setExpanded((e) => !e)}
        style={{
          borderTop: "1px solid var(--border)",
          padding: "1.1rem 0",
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

        {/* File name + type */}
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: "clamp(0.88rem, 1.3vw, 0.98rem)",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "var(--fg)",
              marginBottom: 4,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {doc.file_name ?? "document"}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 9,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <span>{docLabel(doc.document_type)}</span>
            {doc.uploaded_at && <span>{fmt(doc.uploaded_at)}</span>}
            <span style={{ color: iconColor }}>{ext}</span>
          </div>
        </div>

        {/* Verified status */}
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
              background: doc.is_verified ? "#28C840" : "#FEBC2E",
              flexShrink: 0,
            }}
          />
          {doc.is_verified ? "Verified" : "Pending"}
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
                File Details
              </span>
            </div>

            {/* File visual + meta */}
            <div style={{ display: "flex", gap: 0 }}>
              {/* Hatched file preview */}
              <div
                style={{
                  width: 100,
                  flexShrink: 0,
                  background: "repeating-linear-gradient(135deg, var(--border) 0 8px, var(--elev) 8px 16px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  padding: "1.25rem 0.75rem",
                  borderRight: "1px solid var(--border)",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 8,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: iconColor,
                  }}
                >
                  {ext}
                </span>
              </div>

              {/* Meta grid */}
              <div
                style={{
                  flex: 1,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                  gap: "1.25rem",
                  padding: "1.25rem",
                }}
              >
                {[
                  { label: "Document ID",   value: doc.id?.slice(0, 8).toUpperCase() ?? "—" },
                  { label: "File Name",     value: doc.file_name ?? "—" },
                  { label: "Document Type", value: docLabel(doc.document_type) },
                  { label: "Format",        value: ext },
                  { label: "Uploaded",      value: doc.uploaded_at ? fmt(doc.uploaded_at) : "—" },
                  { label: "Status",        value: doc.is_verified ? "Verified" : "Pending Review" },
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
                        wordBreak: "break-all",
                      }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions row */}
            <div
              style={{
                borderTop: "1px solid var(--border)",
                padding: "0.85rem 1.25rem",
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
              }}
            >
              {doc.file_url && (
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "0.5rem 1.1rem",
                    borderRadius: 9999,
                    border: "1px solid var(--fg)",
                    background: "var(--fg)",
                    color: "var(--bg)",
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                >
                  Download
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="8 17 12 21 16 17" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
                  </svg>
                </a>
              )}
            </div>
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
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            borderTop: "1px solid var(--border)",
            padding: "1.1rem 0",
            display: "grid",
            gridTemplateColumns: "28px 1fr auto auto",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <div style={{ width: 18, height: 10, background: "var(--border)", borderRadius: 4 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ width: "50%", height: 13, background: "var(--border)", borderRadius: 4 }} />
            <div style={{ width: "30%", height: 9, background: "var(--border)", borderRadius: 4, opacity: 0.6 }} />
          </div>
          <div style={{ width: 72, height: 26, background: "var(--border)", borderRadius: 9999 }} />
          <div style={{ width: 13, height: 13, background: "var(--border)", borderRadius: 4 }} />
        </div>
      ))}
    </div>
  );
}

/* ── Main component ── */
export function DocumentVaultClient() {
  const [docType, setDocType] = useState("other");
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState("all");
  const headRef = useReveal(0);
  const qc = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["documents"],
    queryFn: () => documentsApi.my().then((r: any) => r.data),
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("document_type", docType);
      await documentsApi.upload(fd);
      toast.success("Document uploaded successfully");
      qc.invalidateQueries({ queryKey: ["documents"] });
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const items: any[] = data?.items ?? [];
  const filtered =
    filter === "all"
      ? items
      : items.filter((d) => d.document_type === filter);

  /* Summary: count per type */
  const typeCounts = DOC_TYPES.reduce<Record<string, number>>((acc, t) => {
    acc[t.value] = items.filter((d) => d.document_type === t.value).length;
    return acc;
  }, {});

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--elev)",
            color: "var(--fg)",
            border: "1px solid var(--border)",
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 11,
            letterSpacing: "0.04em",
            borderRadius: 10,
          },
        }}
      />

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
            Dashboard — Documents
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
            Document Vault
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
                { label: "Total",    value: items.length },
                { label: "Verified", value: items.filter((d) => d.is_verified).length },
                { label: "Pending",  value: items.filter((d) => !d.is_verified).length },
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
            <button
              onClick={() => setFilter("all")}
              style={{
                padding: "0.35rem 0.9rem",
                borderRadius: 9999,
                border: "1px solid var(--border)",
                background: filter === "all" ? "var(--fg)" : "transparent",
                color: filter === "all" ? "var(--bg)" : "var(--muted)",
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              All <span style={{ opacity: 0.6, marginLeft: 4 }}>{items.length}</span>
            </button>
            {DOC_TYPES.filter((t) => typeCounts[t.value] > 0).map((t) => (
              <button
                key={t.value}
                onClick={() => setFilter(t.value)}
                style={{
                  padding: "0.35rem 0.9rem",
                  borderRadius: 9999,
                  border: "1px solid var(--border)",
                  background: filter === t.value ? "var(--fg)" : "transparent",
                  color: filter === t.value ? "var(--bg)" : "var(--muted)",
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {t.label} <span style={{ opacity: 0.6, marginLeft: 4 }}>{typeCounts[t.value]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Upload zone */}
        <UploadZone
          docType={docType}
          setDocType={setDocType}
          onUpload={handleUpload}
          uploading={uploading}
        />

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
            Failed to load documents. Please refresh.
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
              {filter === "all" ? "Vault is empty" : `No ${docLabel(filter)} documents`}
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
              {filter === "all"
                ? "Start by uploading your passport, transcripts, or statement of purpose."
                : `You haven't uploaded any ${docLabel(filter).toLowerCase()} documents yet.`}
            </p>
          </div>
        )}

        {!isLoading && !isError && filtered.length > 0 && (
          <div>
            {filtered.map((doc, i) => (
              <DocCard key={doc.id} doc={doc} index={i} />
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
