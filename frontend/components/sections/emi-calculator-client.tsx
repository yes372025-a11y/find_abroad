"use client";

import { useState } from "react";
import Link from "next/link";

/* ── Currency config ─────────────────────────────────────── */
const CURRENCIES = {
  INR: { symbol: "₹", rate: 1,      maxLoan: 10000000, step: 100000 },
  USD: { symbol: "$", rate: 0.012,  maxLoan: 150000,   step: 1000   },
  GBP: { symbol: "£", rate: 0.0095, maxLoan: 120000,   step: 1000   },
  AUD: { symbol: "A$", rate: 0.019, maxLoan: 180000,   step: 1000   },
} as const;

type CurrencyKey = keyof typeof CURRENCIES;

/* ── Mac window dots (shared across codebase) ─────────────── */
const DOTS = [{ c: "#FF5F57" }, { c: "#FEBC2E" }, { c: "#28C840" }];

/* ── Pure EMI formula ────────────────────────────────────── */
function calcEMI(principal: number, annualRate: number, months: number): number {
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

/* ── Currency formatter ───────────────────────────────────── */
function formatCurrency(amount: number, symbol: string): string {
  return symbol + amount.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

/* ── Amortization row type ────────────────────────────────── */
interface AmortRow {
  month: number;
  openingBalance: number;
  emi: number;
  principal: number;
  interest: number;
  closingBalance: number;
}

/* ── Build amortization schedule ─────────────────────────── */
function buildSchedule(
  principal: number,
  annualRate: number,
  months: number,
  emi: number,
): AmortRow[] {
  const rows: AmortRow[] = [];
  let balance = principal;
  const r = annualRate / 100 / 12;
  for (let m = 1; m <= months; m++) {
    const interest = balance * r;
    const principalPart = emi - interest;
    const closingBalance = Math.max(0, balance - principalPart);
    rows.push({
      month: m,
      openingBalance: balance,
      emi,
      principal: principalPart,
      interest,
      closingBalance,
    });
    balance = closingBalance;
  }
  return rows;
}

/* ── Main component ───────────────────────────────────────── */
export function EMICalculator() {
  const [loanAmount, setLoanAmount]     = useState(2500000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenureMonths, setTenureMonths] = useState(60);
  const [currency, setCurrency]         = useState<CurrencyKey>("INR");
  const [showAmortization, setShowAmortization] = useState(false);

  const cfg = CURRENCIES[currency];

  /* ── Derived values ── */
  const emi            = calcEMI(loanAmount, interestRate, tenureMonths);
  const totalPayment   = emi * tenureMonths;
  const totalInterest  = totalPayment - loanAmount;
  const principalPct   = (loanAmount / totalPayment) * 100;
  const interestPct    = 100 - principalPct;

  /* ── Amortization (only when open) ── */
  const schedule: AmortRow[] = showAmortization
    ? buildSchedule(loanAmount, interestRate, tenureMonths, emi)
    : [];

  /* ── Helpers ── */
  const sym     = cfg.symbol;
  const years   = (tenureMonths / 12).toFixed(1);
  const isWholeYear = tenureMonths % 12 === 0;

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 18,
        overflow: "hidden",
        background: "var(--elev)",
      }}
    >
      {/* ── Chrome bar ─────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.875rem 1.5rem",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {DOTS.map((d) => (
            <span
              key={d.c}
              style={{ width: 10, height: 10, borderRadius: "50%", background: d.c, display: "block" }}
            />
          ))}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--muted)",
              marginLeft: 8,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            EMI CALCULATOR
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
            opacity: 0.5,
          }}
        >
          Education Loan
        </span>
      </div>

      {/* ── Body ───────────────────────────────────────────── */}
      <div
        className="emi-body"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0,
        }}
      >
        {/* ════════════════════════════════════════════════════
            LEFT — Inputs (~45%)
            ════════════════════════════════════════════════════ */}
        <div
          className="emi-left"
          style={{
            flex: "0 0 45%",
            minWidth: 280,
            padding: "2rem 1.75rem",
            borderRight: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
          }}
        >
          {/* ── Label helper ── */}
          {(label: string) => (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 6,
              }}
            >
              {label}
            </p>
          )}

          {/* ── 1. Currency selector ── */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "0.75rem",
              }}
            >
              Currency
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {(Object.keys(CURRENCIES) as CurrencyKey[]).map((cur) => {
                const isActive = currency === cur;
                return (
                  <button
                    key={cur}
                    onClick={() => {
                      setCurrency(cur);
                      /* reset loan amount to a sensible default per currency */
                      const newCfg = CURRENCIES[cur];
                      setLoanAmount(Math.min(loanAmount, newCfg.maxLoan));
                    }}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.06em",
                      padding: "5px 14px",
                      borderRadius: 9999,
                      border: isActive ? "1px solid var(--fg)" : "1px solid var(--border)",
                      background: isActive ? "var(--fg)" : "transparent",
                      color: isActive ? "var(--bg)" : "var(--muted)",
                      cursor: "pointer",
                      transition: "all 0.18s ease",
                    }}
                  >
                    {cur}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── 2. Loan Amount ── */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                Loan Amount
              </p>
              <input
                type="number"
                value={loanAmount}
                min={cfg.step}
                max={cfg.maxLoan}
                step={cfg.step}
                onChange={(e) => {
                  const v = Math.min(Math.max(Number(e.target.value), cfg.step), cfg.maxLoan);
                  setLoanAmount(v);
                }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--fg)",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  textAlign: "right",
                  width: 120,
                  cursor: "text",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--muted)",
                marginBottom: "0.5rem",
                textAlign: "right",
              }}
            >
              {formatCurrency(loanAmount, sym)}
            </p>
            <input
              type="range"
              min={cfg.step}
              max={cfg.maxLoan}
              step={cfg.step}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.35rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", opacity: 0.5 }}>
                {sym}{cfg.step.toLocaleString()}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", opacity: 0.5 }}>
                {sym}{cfg.maxLoan.toLocaleString()}
              </span>
            </div>
          </div>

          {/* ── 3. Interest Rate ── */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                Interest Rate
              </p>
              <input
                type="number"
                value={interestRate}
                min={5}
                max={20}
                step={0.1}
                onChange={(e) => {
                  const v = Math.min(Math.max(Number(e.target.value), 5), 20);
                  setInterestRate(parseFloat(v.toFixed(1)));
                }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--fg)",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  textAlign: "right",
                  width: 60,
                  cursor: "text",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--muted)",
                marginBottom: "0.5rem",
                textAlign: "right",
              }}
            >
              {interestRate.toFixed(1)}% per annum
            </p>
            <input
              type="range"
              min={5}
              max={20}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.35rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", opacity: 0.5 }}>5%</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", opacity: 0.5 }}>20%</span>
            </div>
          </div>

          {/* ── 4. Tenure ── */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                Loan Tenure
              </p>
              <input
                type="number"
                value={tenureMonths}
                min={12}
                max={180}
                step={1}
                onChange={(e) => {
                  const v = Math.min(Math.max(Number(e.target.value), 12), 180);
                  setTenureMonths(v);
                }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--fg)",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  textAlign: "right",
                  width: 60,
                  cursor: "text",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--muted)",
                marginBottom: "0.5rem",
                textAlign: "right",
              }}
            >
              {tenureMonths} months
              {" "}
              <span style={{ opacity: 0.55 }}>
                ({isWholeYear ? `${Math.round(tenureMonths / 12)} yr` : `${years} yr`})
              </span>
            </p>
            <input
              type="range"
              min={12}
              max={180}
              step={1}
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.35rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", opacity: 0.5 }}>12 mo</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", opacity: 0.5 }}>180 mo</span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            RIGHT — Outputs (~55%)
            ════════════════════════════════════════════════════ */}
        <div
          className="emi-right"
          style={{
            flex: "1 1 55%",
            minWidth: 280,
            padding: "2rem 1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* ── Monthly EMI hero ── */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "0.5rem",
              }}
            >
              Monthly EMI
            </p>
            <p
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "var(--fg)",
                lineHeight: 1,
              }}
            >
              {formatCurrency(Math.round(emi), sym)}
            </p>
          </div>

          {/* ── Divider ── */}
          <div style={{ height: 1, background: "var(--border)" }} />

          {/* ── Summary rows ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { label: "Total Principal",  value: formatCurrency(Math.round(loanAmount), sym)      },
              { label: "Total Interest",   value: formatCurrency(Math.round(totalInterest), sym)   },
              { label: "Total Payment",    value: formatCurrency(Math.round(totalPayment), sym)    },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 0",
                  borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : undefined,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    color: "var(--muted)",
                    textTransform: "uppercase",
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--fg)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* ── Split bar ── */}
          <div>
            <div
              style={{
                display: "flex",
                height: 8,
                borderRadius: 4,
                overflow: "hidden",
                background: "var(--border)",
              }}
            >
              <div
                style={{
                  width: `${principalPct}%`,
                  background: "var(--fg)",
                  transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
              <div
                style={{
                  width: `${interestPct}%`,
                  background: "#FF5F57",
                  transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.625rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: "var(--fg)", display: "block", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", letterSpacing: "0.06em" }}>
                  Principal {principalPct.toFixed(1)}%
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: "#FF5F57", display: "block", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", letterSpacing: "0.06em" }}>
                  Interest {interestPct.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div>
            <Link
              href="/loans"
              className="cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid var(--fg)",
                padding: "0.75rem 1.75rem",
                borderRadius: 9999,
                color: "var(--fg)",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              Check Loan Eligibility
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Amortization toggle ──────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        <button
          onClick={() => setShowAmortization((v) => !v)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 1.75rem",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            transition: "background 0.18s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "color-mix(in srgb, var(--border) 40%, transparent)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {showAmortization ? "Hide schedule" : "Show amortization schedule"}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--muted)",
              display: "inline-block",
              transform: showAmortization ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            ▾
          </span>
        </button>

        {/* ── Amortization table ── */}
        {showAmortization && (
          <div
            style={{
              maxHeight: 400,
              overflowY: "auto",
              borderTop: "1px solid var(--border)",
            }}
          >
            {/* Hatched decoration strip */}
            <div
              style={{
                width: "100%",
                height: 8,
                background: "repeating-linear-gradient(135deg, var(--border) 0 4px, var(--elev) 4px 10px)",
                flexShrink: 0,
              }}
            />

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "fixed",
              }}
            >
              <thead>
                <tr style={{ position: "sticky", top: 0, background: "var(--bg)", zIndex: 1 }}>
                  {["Month", "Opening", "EMI", "Principal", "Interest", "Closing"].map((h) => (
                    <th
                      key={h}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        textAlign: "right",
                        padding: "0.75rem 1rem",
                        fontWeight: 400,
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr
                    key={row.month}
                    style={{
                      background: i % 2 === 0 ? "var(--elev)" : "transparent",
                    }}
                  >
                    {/* Month */}
                    <td
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--muted)",
                        padding: "0.5rem 1rem",
                        textAlign: "right",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {String(row.month).padStart(2, "0")}
                    </td>

                    {/* Opening Balance */}
                    <td
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--fg)",
                        padding: "0.5rem 1rem",
                        textAlign: "right",
                      }}
                    >
                      {formatCurrency(Math.round(row.openingBalance), sym)}
                    </td>

                    {/* EMI */}
                    <td
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--fg)",
                        fontWeight: 600,
                        padding: "0.5rem 1rem",
                        textAlign: "right",
                      }}
                    >
                      {formatCurrency(Math.round(row.emi), sym)}
                    </td>

                    {/* Principal */}
                    <td
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--fg)",
                        padding: "0.5rem 1rem",
                        textAlign: "right",
                      }}
                    >
                      {formatCurrency(Math.round(row.principal), sym)}
                    </td>

                    {/* Interest */}
                    <td
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "#FF5F57",
                        padding: "0.5rem 1rem",
                        textAlign: "right",
                      }}
                    >
                      {formatCurrency(Math.round(row.interest), sym)}
                    </td>

                    {/* Closing Balance */}
                    <td
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--muted)",
                        padding: "0.5rem 1rem",
                        textAlign: "right",
                        opacity: 0.8,
                      }}
                    >
                      {formatCurrency(Math.round(row.closingBalance), sym)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Slider + responsive styles ──────────────────────── */}
      <style>{`
        input[type=range] {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 2px;
          background: var(--border);
          outline: none;
          cursor: pointer;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--fg);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          transform: scale(1.25);
        }
        input[type=range]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--fg);
          border: none;
          cursor: pointer;
        }
        /* Number inputs: hide spinners */
        .emi-body input[type=number]::-webkit-inner-spin-button,
        .emi-body input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .emi-body input[type=number] { -moz-appearance: textfield; }

        /* Responsive: stack columns on narrow screens */
        @media (max-width: 768px) {
          .emi-left {
            flex: 1 1 100% !important;
            border-right: none !important;
            border-bottom: 1px solid var(--border);
          }
          .emi-right {
            flex: 1 1 100% !important;
          }
        }
      `}</style>
    </div>
  );
}

export default EMICalculator;
