"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardSidebar } from "~/components/layout/dashboard-sidebar";
import { DashboardHeader } from "~/components/layout/dashboard-header";
import { useAuth } from "~/hooks/use-auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [loading, isAuthenticated, router]);

  // Close sidebar on route change on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
        }}
      >
        {/* Tivor-style spinner */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "1.5px solid var(--border)",
            borderTop: "1.5px solid var(--fg)",
            animation: "spin 0.7s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* Mobile backdrop */}
      <div
        className="dashboard-backdrop"
        onClick={() => setSidebarOpen(false)}
        style={{
          display: "none",
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 199,
          opacity: sidebarOpen ? 1 : 0,
          pointerEvents: sidebarOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      <DashboardSidebar sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className="dashboard-main-area"
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        <DashboardHeader onMenuClick={() => setSidebarOpen((o) => !o)} />
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "2rem 2.5rem",
          }}
        >
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          main { padding: 1.5rem 1.25rem !important; }
        }
      `}</style>
    </div>
  );
}
