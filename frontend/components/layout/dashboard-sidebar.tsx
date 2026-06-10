"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "~/hooks/use-auth";

const NAV = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    href: "/profile",
    label: "My Profile",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    href: "/applications",
    label: "Applications",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" />
      </svg>
    ),
  },
  {
    href: "/consultations",
    label: "Consultations",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    href: "/documents",
    label: "Documents",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

const EXPLORE = [
  {
    href: "/universities",
    label: "Universities",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/scholarships",
    label: "Scholarships",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    href: "/loans",
    label: "Loans",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

const COUNSELOR_NAV = [
  {
    href: "/leads",
    label: "Leads",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

interface DashboardSidebarProps {
  sidebarOpen?: boolean;
  onClose?: () => void;
}

export function DashboardSidebar({ sidebarOpen = false, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { isCounselor } = useAuth();

  return (
    <>
      <aside
        className={`dashboard-sidebar-overlay${sidebarOpen ? " sidebar-open" : ""}`}
        style={{
          width: collapsed ? 64 : 232,
          flexShrink: 0,
          height: "100%",
          borderRight: "1px solid var(--border)",
          background: "var(--elev)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s cubic-bezier(0.76, 0, 0.24, 1), transform 0.35s cubic-bezier(0.76, 0, 0.24, 1)",
          overflow: "hidden",
          // On desktop these take their natural position; on mobile CSS overrides to fixed+overlay
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "1.25rem 1rem",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            flexShrink: 0,
          }}
        >
          {!collapsed && (
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "var(--fg)",
                textDecoration: "none",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20A14.5 14.5 0 0 0 12 2" /><line x1="2" y1="12" x2="22" y2="12" />
              </svg>
              Find Abroad
            </Link>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-label="Toggle sidebar"
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--muted)",
              cursor: "pointer",
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              padding: 0,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {collapsed
                ? <polyline points="9 18 15 12 9 6" />
                : <polyline points="15 18 9 12 15 6" />}
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "0.75rem 0.5rem", overflowY: "auto", overflowX: "hidden" }}>
          {/* Main */}
          {!collapsed && (
            <p
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 9,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
                padding: "0.25rem 0.75rem 0.5rem",
              }}
            >
              Main
            </p>
          )}
          {NAV.map(({ href, label, icon }) => {
            const active =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href);
            return (
              <SidebarLink
                key={href}
                href={href}
                label={label}
                icon={icon}
                active={active}
                collapsed={collapsed}
                onClick={onClose}
              />
            );
          })}

          {/* Divider */}
          <div style={{ borderTop: "1px solid var(--border)", margin: "0.75rem 0.5rem" }} />

          {/* Counselor — only visible when role is counselor or admin */}
          {isCounselor && (
            <>
              {!collapsed && (
                <p
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    padding: "0 0.75rem 0.5rem",
                  }}
                >
                  Counselor
                </p>
              )}
              {COUNSELOR_NAV.map(({ href, label, icon }) => (
                <SidebarLink
                  key={href}
                  href={href}
                  label={label}
                  icon={icon}
                  active={pathname.startsWith(href)}
                  collapsed={collapsed}
                  onClick={onClose}
                />
              ))}
              <div style={{ borderTop: "1px solid var(--border)", margin: "0.75rem 0.5rem" }} />
            </>
          )}

          {/* Explore */}
          {!collapsed && (
            <p
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 9,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
                padding: "0 0.75rem 0.5rem",
              }}
            >
              Explore
            </p>
          )}
          {EXPLORE.map(({ href, label, icon }) => (
            <SidebarLink
              key={href}
              href={href}
              label={label}
              icon={icon}
              active={pathname.startsWith(href)}
              collapsed={collapsed}
              onClick={onClose}
            />
          ))}
        </nav>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            padding: "0.75rem 0.5rem",
            flexShrink: 0,
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: collapsed ? "0.5rem" : "0.5rem 0.75rem",
              borderRadius: 10,
              textDecoration: "none",
              color: "var(--muted)",
              justifyContent: collapsed ? "center" : "flex-start",
              transition: "background 0.15s",
            }}
            title="Back to site"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            {!collapsed && (
              <span style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)", fontSize: 11, letterSpacing: "0.04em" }}>
                Back to site
              </span>
            )}
          </Link>
        </div>
      </aside>

      <style>{`
        .sidebar-link:hover { background: var(--border) !important; }

        /* On mobile: sidebar is a fixed overlay, hidden off-screen by default */
        @media (max-width: 768px) {
          .dashboard-sidebar-overlay {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            height: 100vh !important;
            width: 240px !important;
            z-index: 200 !important;
            transform: translateX(-100%);
            transition: transform 0.35s cubic-bezier(0.76, 0, 0.24, 1), width 0.3s cubic-bezier(0.76, 0, 0.24, 1);
            box-shadow: 4px 0 40px rgba(0, 0, 0, 0.18);
          }
          .dashboard-sidebar-overlay.sidebar-open {
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </>
  );
}

function SidebarLink({
  href,
  label,
  icon,
  active,
  collapsed,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  collapsed: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className="sidebar-link"
      title={collapsed ? label : undefined}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: collapsed ? "0.6rem" : "0.6rem 0.75rem",
        borderRadius: 10,
        textDecoration: "none",
        marginBottom: 2,
        justifyContent: collapsed ? "center" : "flex-start",
        background: active ? "var(--fg)" : "transparent",
        color: active ? "var(--bg)" : "var(--fg)",
        transition: "background 0.15s, color 0.15s",
      }}
    >
      <span style={{ flexShrink: 0, opacity: active ? 1 : 0.65 }}>{icon}</span>
      {!collapsed && (
        <span
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 12,
            fontWeight: active ? 600 : 400,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      )}
    </Link>
  );
}
