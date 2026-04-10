// lib/axios.ts
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
