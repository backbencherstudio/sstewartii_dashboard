# Portable auth setup (copy-paste for a new Next.js project)

Use this checklist to reproduce the same pattern in another App Router project: **httpOnly cookies** (server actions), **Axios** + **401 / refresh**, **Zustand** (persisted user), **`useAuth`**, **`AuthProvider`**, and **Next.js 16 `proxy.ts`** route guard.

**Stack reference:** Next.js **16** (`proxy.ts`), React 19, TypeScript, Zustand, TanStack React Query, Axios.

---

## 0. Prerequisites

- Next.js **16** (uses root `proxy.ts`, not `middleware.ts`).
- `@/*` path alias pointing at the project root (see step 2).

---

## 1. Install dependencies

```bash
npm install axios zustand @tanstack/react-query
```

Optional (only if you use the same loading UI as this repo):

```bash
npm install lucide-react
```

---

## 2. TypeScript path alias

In `tsconfig.json`, under `compilerOptions`:

```json
"paths": {
  "@/*": ["./*"]
}
```

Adjust the array if your source lives in `src/` (e.g. `"@/*": ["./src/*"]`) and update all import paths below accordingly.

---

## 3. Axios custom field (retry flag)

Create `types/axios.d.ts`:

```ts
import "axios";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}
```

Ensure `types/axios.d.ts` is included by your `tsconfig.json` `include` glob.

---

## 4. Environment variables

`.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-api.example.com
NEXT_PUBLIC_ENABLE_REFRESH=false
```

Set `NEXT_PUBLIC_ENABLE_REFRESH=true` only if the backend supports `POST /auth/refresh` and returns tokens in a shape supported by `extractTokensFromAuthPayload`.

---

## 5. Types — `types/auth.types.ts`

```ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  country_code: string | null;
  phone_number: string | null;
  type: string;
  gender: string | null;
  date_of_birth: string | null;
  created_at: string;
}

export interface MeResponseBody {
  success?: boolean;
  data?: User;
  message?: string;
}

export interface LoginResponseBody {
  success?: boolean;
  message?: string;
  authorization?: {
    type?: string;
    access_token: string;
    refresh_token: string;
  };
  type?: string;
}
```

Trim or extend `User` to match your API.

---

## 6. Token parsing — `lib/auth-tokens.ts`

```ts
/** Normalize token fields from API payloads (login / refresh). */
export function extractTokensFromAuthPayload(payload: unknown): {
  accessToken: string;
  refreshToken: string;
} | null {
  if (!payload || typeof payload !== "object") return null;
  const p = payload as Record<string, unknown>;
  const auth = p.authorization;
  if (auth && typeof auth === "object") {
    const a = auth as Record<string, unknown>;
    if (
      typeof a.access_token === "string" &&
      typeof a.refresh_token === "string"
    ) {
      return {
        accessToken: a.access_token,
        refreshToken: a.refresh_token,
      };
    }
  }
  if (
    typeof p.access_token === "string" &&
    typeof p.refresh_token === "string"
  ) {
    return { accessToken: p.access_token, refreshToken: p.refresh_token };
  }
  if (
    typeof p.accessToken === "string" &&
    typeof p.refreshToken === "string"
  ) {
    return { accessToken: p.accessToken, refreshToken: p.refreshToken };
  }
  return null;
}
```

---

## 7. Session (server actions) — `lib/session.ts`

```ts
"use server";
import { cookies } from "next/headers";

const ACCESS_TOKEN_MAX_AGE = 24 * 60 * 60; // 24 hours — adjust as needed
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

const refreshFlowEnabled = () =>
  process.env.NEXT_PUBLIC_ENABLE_REFRESH === "true";

export async function setTokens(
  accessToken: string,
  refreshToken?: string | null
) {
  const cookieStore = await cookies();

  cookieStore.set("access-token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ACCESS_TOKEN_MAX_AGE,
    path: "/",
  });

  if (refreshFlowEnabled() && refreshToken) {
    cookieStore.set("refresh-token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: REFRESH_TOKEN_MAX_AGE,
      path: "/",
    });
  } else {
    cookieStore.delete("refresh-token");
  }
}

export async function clearTokens() {
  const cookieStore = await cookies();
  cookieStore.delete("access-token");
  cookieStore.delete("refresh-token");
}

export async function getAccessToken() {
  return (await cookies()).get("access-token")?.value;
}

export async function getRefreshToken() {
  return (await cookies()).get("refresh-token")?.value;
}
```

---

## 8. Axios instance — `lib/axios.ts`

```ts
import axios from "axios";
import { extractTokensFromAuthPayload } from "@/lib/auth-tokens";
import {
  getAccessToken,
  setTokens,
  clearTokens,
  getRefreshToken,
} from "@/lib/session";

const refreshEnabled = () =>
  process.env.NEXT_PUBLIC_ENABLE_REFRESH === "true";

function isAuthLoginRequest(config: { url?: string } | undefined) {
  const url = config?.url ?? "";
  return url.includes("/auth/login");
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (t: string | null) => void;
  reject: (e: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      if (isAuthLoginRequest(originalRequest)) {
        return Promise.reject(error);
      }

      if (!refreshEnabled()) {
        await clearTokens();
        if (
          typeof window !== "undefined" &&
          !isAuthLoginRequest(originalRequest)
        ) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
          throw new Error("No refresh token");
        }
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken }
        );

        const parsed = extractTokensFromAuthPayload(data);
        const accessToken = parsed?.accessToken ?? null;
        const nextRefresh = parsed?.refreshToken ?? refreshToken;

        if (!accessToken) {
          throw new Error("Invalid refresh response");
        }

        await setTokens(accessToken, nextRefresh);
        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        await clearTokens();
        if (
          typeof window !== "undefined" &&
          !isAuthLoginRequest(originalRequest)
        ) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
```

403 responses are **not** redirected globally; handle them in UI or per call.

---

## 9. Auth service — `services/auth.service.ts`

```ts
import api from "@/lib/axios";
import { extractTokensFromAuthPayload } from "@/lib/auth-tokens";
import { clearTokens, setTokens } from "@/lib/session";
import type { LoginResponseBody, MeResponseBody, User } from "@/types/auth.types";
import axios from "axios";

function messageFromAxiosError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data as { message?: string } | undefined;
    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message;
    }
    if (status === 401) return "Invalid email or password.";
    if (status === 403) return "You don't have permission to do that.";
    if (typeof error.message === "string") return error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

export const authService = {
  async login(credentials: { email: string; password: string }) {
    try {
      const { data } = await api.post<LoginResponseBody>(
        "/auth/login",
        credentials
      );
      if (data.success === false) {
        throw new Error(data.message ?? "Login failed");
      }
      const tokens = extractTokensFromAuthPayload(data);
      if (!tokens) {
        throw new Error("Invalid login response");
      }
      await setTokens(tokens.accessToken, tokens.refreshToken);

      try {
        return await authService.me();
      } catch (meErr) {
        await clearTokens();
        throw new Error(messageFromAxiosError(meErr));
      }
    } catch (e) {
      throw new Error(messageFromAxiosError(e));
    }
  },

  async me(): Promise<User> {
    try {
      const { data } = await api.get<MeResponseBody>("/auth/me");
      if (data?.data) {
        return data.data;
      }
      throw new Error(data?.message ?? "Failed to load profile");
    } catch (e) {
      throw new Error(messageFromAxiosError(e));
    }
  },

  async logout() {
    await clearTokens();
  },
};
```

---

## 10. Zustand store — `store/authStore.ts`

```tsx
"use client";

import { User } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/services/auth.service";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isHydrated: boolean;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setHydrated: (hydrated: boolean) => void;
  clear: () => void;

  login: (credentials: { email: string; password: string }) => Promise<void>;
  fetchMe: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isHydrated: false,

      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setHydrated: (isHydrated) => set({ isHydrated }),
      clear: () => set({ user: null, isLoading: false }),

      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const user = await authService.login(credentials);
          set({ user });
        } catch (error) {
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      fetchMe: async () => {
        set({ isLoading: true });
        try {
          const user = await authService.me();
          set({ user });
        } catch {
          get().clear();
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
          get().clear();
        } catch (error) {
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
```

---

## 11. Hook — `hooks/useAuth.ts`

```tsx
"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAuthStore } from "@/store/authStore";

const useAuth = () => {
  const router = useRouter();

  const {
    login: storeLogin,
    logout: storeLogout,
    fetchMe: storeFetchMe,
    user,
    isLoading,
    isHydrated,
  } = useAuthStore();

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      await storeLogin(credentials);
      router.push("/dashboard");
    },
    [storeLogin, router]
  );

  const logout = useCallback(async () => {
    await storeLogout();
    router.push("/login");
  }, [storeLogout, router]);

  const fetchMe = useCallback(async () => {
    await storeFetchMe();
  }, [storeFetchMe]);

  return {
    user,
    isLoading,
    isHydrated,
    login,
    logout,
    fetchMe,
  };
};

export default useAuth;
```

Change `/dashboard` and `/login` to match your routes.

---

## 12. Auth provider — `components/layout/Provider/AuthProvider.tsx`

```tsx
"use client";

import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { Loader } from "lucide-react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { fetchMe, isHydrated } = useAuth();

  useEffect(() => {
    if (isHydrated) {
      void fetchMe();
    }
  }, [isHydrated, fetchMe]);

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background text-muted-foreground text-sm">
        <Loader className="h-8 w-8 animate-spin md:h-10 md:w-10" />
      </div>
    );
  }

  return <>{children}</>;
}
```

Without `lucide-react`, replace the loader with any spinner or `null`.

---

## 13. App providers — `components/Providers.tsx` (auth-only)

```tsx
"use client";

import { AuthProvider } from "@/components/layout/Provider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
```

In this monorepo, `Providers` also wraps `SidebarProvider` from `@/components/ui/sidebar`. For a minimal portable setup, omit that unless you have the same UI component.

---

## 14. Route guard — `proxy.ts` (project root, Next.js 16)

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/verify-otp",
  "/set-password",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("access-token")?.value;

  const isPublicPath = PUBLIC_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(token ? "/dashboard" : "/login", request.url)
    );
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
```

Keep `PUBLIC_PATHS` in sync with every route that must work **without** `access-token`.

---

## 15. Wire layouts

**Protected segment** (example: `app/(dashboard)/layout.tsx`):

```tsx
import { Providers } from "@/components/Providers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
```

Wrap your shell (`Sidebar`, `Topbar`, etc.) inside `Providers` or inside `children` as you prefer.

**Auth pages** (example: `app/(auth)/login/page.tsx`) must **not** sit under the layout that mounts `AuthProvider` if you want to avoid calling `fetchMe` on the login screen. In this repo, `(auth)` and `(dashboard)` are sibling route groups.

---

## 16. Minimal login form — `components/auth/LoginForm.tsx`

```tsx
"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";

export default function LoginForm() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      await login({ email, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-sm flex-col gap-4 p-6">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="rounded border px-3 py-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="rounded border px-3 py-2"
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={isLoading}
        className="rounded bg-blue-600 py-2 text-white disabled:opacity-50"
      >
        {isLoading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
```

Style as needed.

---

## 17. Verification checklist

1. `npm run dev` — no TypeScript errors on `lib/session.ts` / `lib/axios.ts`.
2. `.env.local` has a valid `NEXT_PUBLIC_API_URL`.
3. Login sets `access-token` (check Application → Cookies in devtools).
4. Navigating to a protected path without a cookie redirects to `/login` (`proxy.ts`).
5. After login, `router.push("/dashboard")` and `/auth/me` populate `user` in the store.

---

## 18. Related doc

Conceptual overview and API contracts: [auth-setup.md](./auth-setup.md).
