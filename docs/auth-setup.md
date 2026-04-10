# Authentication setup (step by step)

This document describes how authentication works in this Next.js app: configuration, request flow, token storage, and where each piece lives in the codebase.

---

## 1. Big picture

| Layer | Role |
|--------|------|
| **HTTP client** (`lib/axios.ts`) | Shared Axios instance, attaches `Authorization`, handles **401** (logout path or **refresh** when enabled). |
| **Session** (`lib/session.ts`) | Server-side cookie helpers: **httpOnly** `access-token` and optional `refresh-token`. |
| **Auth API** (`services/auth.service.ts`) | Login, current user (`/auth/me`), logout; normalizes errors. |
| **Token parsing** (`lib/auth-tokens.ts`) | Reads access/refresh tokens from different API payload shapes. |
| **Client state** (`store/authStore.ts`) | Zustand store: `user`, loading flags, persisted user only (not tokens). |
| **Hook** (`hooks/useAuth.ts`) | Wraps the store and navigation after login/logout. |
| **Bootstrap** (`components/layout/Provider/AuthProvider.tsx`) | After Zustand rehydrates from `localStorage`, calls `fetchMe()` to sync the user with the server. |
| **Route guard** (`proxy.ts`) | Next.js **16** entry: redirects using the `access-token` cookie before matched routes render. |

Tokens live in **httpOnly cookies** (not in `localStorage`). The persisted Zustand slice only stores the **user** object for UX (faster paint); it is reconciled with `/auth/me` when the dashboard loads.

---

## 2. Prerequisites

- **Next.js App Router** with client components where auth runs (`"use client"`).
- A backend that exposes at least:
  - `POST /auth/login` — returns tokens (see [API shapes](#5-api-shapes-the-backend-should-match)).
  - `GET /auth/me` — returns the current user when `Authorization: Bearer <access_token>` is sent.
- Optional: `POST /auth/refresh` — used when refresh is enabled (see [Refresh flow](#10-refresh-flow-optional)).

---

## 3. Environment variables

Create `.env.local` in the project root (do not commit secrets):

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | Base URL for the API (no trailing slash). Used by Axios and the refresh `POST`. |
| `NEXT_PUBLIC_ENABLE_REFRESH` | Set to `"true"` to store a refresh cookie and run the refresh interceptor on **401**. Any other value disables refresh: failed auth clears cookies and sends the browser to `/login`. |

Example:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ENABLE_REFRESH=true
```

---

## 4. Cookie and server actions (`lib/session.ts`)

File: `lib/session.ts` (`'use server'`).

- **`setTokens(accessToken, refreshToken?)`**
  - Sets `access-token` (httpOnly, `sameSite: 'lax'`, `maxAge` 15 minutes).
  - If `NEXT_PUBLIC_ENABLE_REFRESH === "true"` and a refresh token is provided, sets `refresh-token` (7 days). Otherwise deletes `refresh-token`.
- **`clearTokens()`** — removes both cookies.
- **`getAccessToken()` / `getRefreshToken()`** — read cookie values (used when attaching the bearer token or refreshing).

Cookies are **httpOnly**, so JavaScript cannot read them directly; the app uses **server actions** from the client bundle to read/write them securely.

---

## 5. API shapes the backend should match

### Login response (`POST /auth/login`)

The client accepts several shapes; `extractTokensFromAuthPayload` in `lib/auth-tokens.ts` normalizes them. Supported patterns include:

- `authorization.access_token` + `authorization.refresh_token`
- Top-level `access_token` + `refresh_token`
- Top-level `accessToken` + `refreshToken`

Types: `types/auth.types.ts` (`LoginResponseBody`).

### Current user (`GET /auth/me`)

Expected: JSON with a `data` field containing the user object (`MeResponseBody` / `User` in `types/auth.types.ts`).

### Refresh (`POST /auth/refresh`) — when refresh is enabled

The client posts JSON: `{ "refreshToken": "<value from refresh-token cookie>" }`.

The response body is parsed with the same `extractTokensFromAuthPayload` helper; a new access token is required; refresh token may rotate.

---

## 6. HTTP client behavior (`lib/axios.ts`)

1. **Request** — For each request, the interceptor calls `getAccessToken()` and, if present, sets `Authorization: Bearer …`.
2. **401**
   - **Login request** (`URL` contains `/auth/login`): error is **not** treated as “session expired”; it is rejected so the login form can show a message.
   - **Refresh disabled** — `clearTokens()`, then redirect to `/login` (browser navigation).
   - **Refresh enabled** — One in-flight refresh; other failed requests **queue** and retry with the new access token. On refresh failure: `clearTokens()`, redirect to `/login`.
3. **403** — No global redirect. The promise **rejects**; handle permission errors in UI (toast, empty state, or a manual `router.push`).

---

## 7. Auth service (`services/auth.service.ts`)

| Method | Behavior |
|--------|----------|
| `login({ email, password })` | `POST /auth/login` → parse tokens → `setTokens` → `GET /auth/me`. If `me` fails, **clears tokens** and throws with a friendly message. |
| `me()` | `GET /auth/me`, returns `User` or throws. |
| `logout()` | `clearTokens()` only (no server revoke in this codebase). |

---

## 8. Zustand store (`store/authStore.ts`)

- State: `user`, `isLoading`, `isHydrated`.
- **Persist** (`auth-store`): only `user` is persisted (`partialize`). Tokens are **not** in localStorage.
- **`onRehydrateStorage`** sets `isHydrated` to `true` after storage is read.
- **`login`** — calls `authService.login`, sets `user`.
- **`fetchMe`** — calls `authService.me`, sets `user`; on failure calls **`clear()`** (invalid session).
- **`logout`** — `authService.logout` then `clear()`.

---

## 9. Hook (`hooks/useAuth.ts`)

- **`login`** — store `login`, then **`router.push('/dashboard')`**.
- **`logout`** — store `logout`, then **`router.push('/login')`**.
- **`fetchMe`** — delegates to the store.

Use this hook in forms (e.g. `components/auth/LoginForm.tsx`) and layout chrome (e.g. topbar).

---

## 10. Refresh flow (optional)

1. Set `NEXT_PUBLIC_ENABLE_REFRESH=true`.
2. Ensure login response includes a refresh token and `setTokens` stores it (see `lib/session.ts`).
3. On **401** (non-login), `lib/axios.ts` calls `/auth/refresh`, updates cookies via `setTokens`, retries the original request, and drains the queue.

If refresh is **off**, any **401** after login clears cookies and redirects to `/login` (no refresh attempt).

---

## 11. Dashboard bootstrap (`AuthProvider` + `Providers`)

- **`app/(dashboard)/layout.tsx`** wraps dashboard pages with `Providers` → `QueryClientProvider` → **`AuthProvider`** → `DashboardLayout`.
- **`AuthProvider`** (`components/layout/Provider/AuthProvider.tsx`):
  - Waits until Zustand **`isHydrated`** is true (persist rehydration finished).
  - Shows a short **Loading…** UI until hydrated.
  - Then runs **`fetchMe()`** once in `useEffect` to validate cookies and refresh `user` from the API.

Login routes under **`app/(auth)/`** do **not** use `AuthProvider`, so unauthenticated users are not forced through `fetchMe` on the login page.

---

## 12. Login page wiring (example)

1. Route: `app/(auth)/login/page.tsx` renders `LoginForm`.
2. `components/auth/LoginForm.tsx` calls `useAuth().login({ email, password })` on submit.
3. On success, `useAuth` navigates to **`/dashboard`**.

---

## 13. Logout

Call `useAuth().logout()` (or store `logout` if you skip navigation). That clears httpOnly cookies and clears the Zustand user; the hook sends the user to **`/login`**.

---

## 14. Route protection (`proxy.ts`)

In **Next.js 16**, the root **`proxy.ts`** file (not `middleware.ts`) runs on matched requests and can redirect or continue before the response is produced. This project implements route gating there.

**File:** `proxy.ts` (project root).

**Cookie checked:** `access-token` (same name as set in `lib/session.ts`). The proxy only sees cookies the browser sends on the request; httpOnly cookies are included.

**Public paths** (no token required — path prefix match):

- `/login`
- `/register`
- `/forgot-password`
- `/verify-otp`
- `/set-password`

**Behavior:**

1. **`/`** — Redirects to `/dashboard` if `access-token` is present, otherwise to `/login`.
2. **No token and path is not public** — Redirect to `/login`.
3. **Token present and path is public** — Redirect to `/dashboard` (already signed-in users skip auth screens).

**Matcher** (`config`): runs for app routes and skips `api`, `_next/static`, `_next/image`, `favicon.ico`, and typical static files (`.*\\..*`).

**Together with the client stack:**

- **Proxy** — First-line navigation: block private routes without a cookie; keep logged-in users off auth pages.
- **Axios 401 / refresh** — Clears session and can send the user to `/login` when the API rejects the token.
- **`AuthProvider` `fetchMe`** — Aligns Zustand `user` with `/auth/me` after hydration; clears store if the session is invalid.

Add new public routes to `PUBLIC_PATHS` in `proxy.ts` whenever you add pages that should be reachable without a token.

---

## 15. File reference

| File | Responsibility |
|------|----------------|
| `lib/session.ts` | Cookie get/set/clear (server actions). |
| `lib/auth-tokens.ts` | Parse tokens from API payloads. |
| `lib/axios.ts` | Axios instance, interceptors, 401/refresh. |
| `services/auth.service.ts` | Login, me, logout. |
| `types/auth.types.ts` | `User`, API response types. |
| `store/authStore.ts` | Zustand + persist. |
| `hooks/useAuth.ts` | Auth API + routing. |
| `components/layout/Provider/AuthProvider.tsx` | Hydration + `fetchMe`. |
| `components/Providers.tsx` | React Query + `AuthProvider`. |
| `app/(dashboard)/layout.tsx` | Wraps dashboard with `Providers`. |
| `components/auth/LoginForm.tsx` | Login UI. |
| `proxy.ts` | Next.js 16 route guard: redirects from `/`, protects private routes, blocks auth pages when already logged in. |

---

## 16. Checklist for a new environment

1. Set `NEXT_PUBLIC_API_URL` to your API base URL.
2. Set `NEXT_PUBLIC_ENABLE_REFRESH` to `"true"` or leave unset/false depending on whether the backend supports refresh.
3. Confirm login response includes tokens in a shape supported by `extractTokensFromAuthPayload`.
4. Confirm `GET /auth/me` returns `{ data: User }` as expected by `auth.service.ts`.
5. Open `/login`, sign in, confirm redirect to `/dashboard` and that API calls include `Authorization` (via cookies + server actions).

This matches the implementation as of the doc date; if you change interceptors or env names, update this file accordingly.
