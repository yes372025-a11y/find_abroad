"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { DashboardSidebar } from "~/components/layout/dashboard-sidebar";
import { DashboardHeader } from "~/components/layout/dashboard-header";
import { useAuth } from "~/hooks/use-auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden", bgcolor: "grey.50" }}>
      <DashboardSidebar />
      <Box sx={{ display: "flex", flex: 1, flexDirection: "column", overflow: "hidden" }}>
        <DashboardHeader />
        <Box component="main" sx={{ flex: 1, overflowY: "auto", p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
