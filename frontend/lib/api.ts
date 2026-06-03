import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

// ─── Token helpers ────────────────────────────────────────────────────────────
function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refresh_token");
}

function clearTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

function saveTokens(access: string, refresh: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
}

// ─── Request interceptor — attach JWT ─────────────────────────────────────────
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Response interceptor — refresh on 401 ────────────────────────────────────
// Tracks whether a refresh is already in-flight so concurrent 401s don't
// trigger multiple refresh calls.
let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

function processQueue(newToken: string): void {
  refreshQueue.forEach((cb) => cb(newToken));
  refreshQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only attempt refresh for 401s on requests that HAD a token (authenticated calls).
    // Public endpoint 401s (no Authorization header) should not trigger a redirect.
    const hadToken = !!(original?.headers?.Authorization);
    if (
      error.response?.status === 401 &&
      hadToken &&
      !original._retry &&
      typeof window !== "undefined"
    ) {
      const refreshToken = getRefreshToken();

      // No refresh token at all → log out cleanly
      if (!refreshToken) {
        clearTokens();
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Queue this request until refresh completes
        return new Promise((resolve) => {
          refreshQueue.push((newToken: string) => {
            original.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(original));
          });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(`${API_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });
        saveTokens(data.access_token, data.refresh_token);
        processQueue(data.access_token);
        original.headers.Authorization = `Bearer ${data.access_token}`;
        return api(original);
      } catch {
        // Refresh failed → tokens are invalid, force login
        clearTokens();
        window.location.href = "/auth/login";
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  register: (data: {
    email: string;
    full_name: string;
    password: string;
  }) => api.post("/auth/register", data),
  me: () => api.get("/auth/me"),
};

// ─── Leads ────────────────────────────────────────────────────────────────────
export const leadsApi = {
  capture: (data: Record<string, unknown>) => api.post("/leads", data),
};

// ─── Universities ─────────────────────────────────────────────────────────────
export const universitiesApi = {
  list: (params: Record<string, unknown>) =>
    api.get("/universities", { params }),
  get: (slug: string) => api.get(`/universities/${slug}`),
};

// ─── Scholarships ─────────────────────────────────────────────────────────────
export const scholarshipsApi = {
  list: (params: Record<string, unknown>) =>
    api.get("/scholarships", { params }),
  get: (slug: string) => api.get(`/scholarships/${slug}`),
};

// ─── Lenders ──────────────────────────────────────────────────────────────────
export const lendersApi = {
  list: (params?: Record<string, unknown>) =>
    api.get("/lenders", { params }),
  assess: (data: Record<string, unknown>) =>
    api.post("/lenders/assess", data),
};

// ─── Consultations ────────────────────────────────────────────────────────────
export const consultationsApi = {
  book: (data: Record<string, unknown>) => api.post("/consultations", data),
  my: () => api.get("/consultations/my"),
};

// ─── Applications ─────────────────────────────────────────────────────────────
export const applicationsApi = {
  create: (data: Record<string, unknown>) => api.post("/applications", data),
  my: () => api.get("/applications/my"),
};

// ─── Documents ────────────────────────────────────────────────────────────────
export const documentsApi = {
  upload: (formData: FormData) =>
    api.post("/documents", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  my: () => api.get("/documents/my"),
};

// ─── AI ───────────────────────────────────────────────────────────────────────
export const aiApi = {
  generateSop: (data: Record<string, unknown>) =>
    api.post("/ai/sop", data),
  generateLor: (data: Record<string, unknown>) =>
    api.post("/ai/lor", data),
  recommendUniversities: (data: Record<string, unknown>) =>
    api.post("/ai/recommend-universities", data),
};
