// lib/axios.ts
import { extractTokensFromAuthPayload } from "@/lib/auth-tokens";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/lib/session";
import axios from "axios";
import { API_URL } from "./constants";

const refreshEnabled = () => process.env.NEXT_PUBLIC_ENABLE_REFRESH === "true";

function isPreAuthRequest(config: { url?: string } | undefined) {
  const url = config?.url ?? "";
  return (
    url.includes("/auth/login") ||
    url.includes("/2fa/verify") ||
    url.includes("/two-factor/verify") ||
    url.includes("/2fa/setup") ||
    url.includes("/auth/verify-otp") ||
    url.includes("/auth/forgot-password") ||
    url.includes("/auth/reset-password")
  );
}

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   timeout: 10000,
// });

/** Free ngrok tunnels return an HTML interstitial unless this header is sent; axios then fails (often net::ERR_FAILED) even when the origin API would return 200. */
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: API_URL?.includes("ngrok")
    ? { "ngrok-skip-browser-warning": "true" }
    : {},
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
      if (isPreAuthRequest(originalRequest)) {
        return Promise.reject(error);
      }

      if (!refreshEnabled()) {
        await clearTokens();
        if (
          typeof window !== "undefined" &&
          !isPreAuthRequest(originalRequest)
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
          { refreshToken },
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
          !isPreAuthRequest(originalRequest)
        ) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
