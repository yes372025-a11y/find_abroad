"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "~/lib/api";

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
}

/** Decode the payload of a JWT without verifying the signature. */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1];
    // Base64url → Base64
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [role, setRole] = useState<string>("student");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("access_token");
    setAccessToken(token);

    if (token) {
      const payload = decodeJwtPayload(token);
      if (payload?.role) {
        setRole(payload.role as string);
      }
    }

    setLoading(false);

    const handleStorage = () => {
      const t = localStorage.getItem("access_token");
      setAccessToken(t);
      if (t) {
        const payload = decodeJwtPayload(t);
        setRole((payload?.role as string) ?? "student");
      } else {
        setRole("student");
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    const { access_token, refresh_token } = res.data;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    setAccessToken(access_token);

    const payload = decodeJwtPayload(access_token);
    setRole((payload?.role as string) ?? "student");

    setLoading(false);
    setUser(null);
    return null;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAccessToken(null);
    setUser(null);
    setRole("student");
    router.push("/");
  };

  return {
    user,
    role,
    loading,
    login,
    logout,
    isAuthenticated: !!accessToken,
    isCounselor: role === "counselor" || role === "admin",
    isAdmin: role === "admin",
  };
}
