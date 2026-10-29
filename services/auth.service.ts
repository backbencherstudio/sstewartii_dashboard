import api from "@/lib/axios";
import { clearTokens, setTokens } from "@/lib/session";
import type {
  ForgotPasswordResponseBody,
  LoginResponseBody,
  MeResponseBody,
  ResetPasswordResponseBody,
  SidebarMenuItemData,
  TwoFactorSetupResponseBody,
  TwoFactorVerifyResponseBody,
  User,
  VerifyOTPResponseBody,
} from "@/types/auth.types";
import axios from "axios";

function messageFromAxiosError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data as { message?: string } | undefined;
    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message;
    }
    // Avoid showing axios’s generic "Request failed with status code …" when the API omits `message`.
    if (status === 401) return "Invalid email or password.";
    if (status === 403) return "You don't have permission to do that.";
    if (typeof error.message === "string") return error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

export const authService = {
  async login(credentials: {
    email: string;
    password: string;
  }): Promise<LoginResponseBody> {
    try {
      const { data } = await api.post<LoginResponseBody>(
        "/auth/login",
        credentials,
      );

      if (data.success === false) {
        throw new Error(data.message ?? "Login failed");
      }
      // const tokens = extractTokensFromAuthPayload(data);
      // if (!tokens) {
      //   throw new Error("Invalid login response");
      // }
      // await setTokens(tokens.accessToken, tokens.refreshToken);

      // try {
      //   return await authService.me();
      // } catch (meErr) {
      //   await clearTokens();
      //   throw new Error(messageFromAxiosError(meErr));
      // }

      return data;
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

  async getSidebarMenu(): Promise<SidebarMenuItemData[]> {
    try {
      const response = await api.get<{
        success?: boolean;
        data?: SidebarMenuItemData[];
      }>("/auth/me/sidebar");

      const res = response?.data;
      if (Array.isArray(res)) {
        return res;
      }
      if (Array.isArray(res?.data)) {
        return res.data;
      }
      return [];
    } catch (e) {
      console.error("Error fetching /auth/me/sidebar:", e);
      return [];
    }
  },

  async logout() {
    await clearTokens();
  },

  // Forgot Password
  async forgotPassword(email: string): Promise<ForgotPasswordResponseBody> {
    try {
      const { data } = await api.post<ForgotPasswordResponseBody>(
        "/auth/forgot-password",
        { email },
      );
      if (data.success === false) {
        throw new Error(data.message ?? "Failed to send verification code");
      }
      return data;
    } catch (e) {
      throw new Error(messageFromAxiosError(e));
    }
  },

  // Verify OTP
  async verifyOTP(email: string, otp: string): Promise<string> {
    try {
      const { data } = await api.post<VerifyOTPResponseBody>(
        "/auth/verify-otp",
        { email, otp },
      );
      if (data.success === false) {
        throw new Error(data.message ?? "OTP verification failed");
      }

      const resetToken =
        data.resetToken ??
        data.reset_token ??
        data.token ??
        data.data?.resetToken ??
        data.data?.reset_token ??
        data.data?.token;

      if (!resetToken) {
        throw new Error("Invalid OTP verification response");
      }

      return resetToken;
    } catch (e) {
      throw new Error(messageFromAxiosError(e));
    }
  },

  // Verify Two-Factor (TOTP app code)
  async verifyTwoFactor(
    challengeToken: string,
    code: string,
  ): Promise<TwoFactorVerifyResponseBody["data"]> {
    try {
      const { data } = await api.post<TwoFactorVerifyResponseBody>(
        "/auth/admin/2fa/verify",
        { challengeToken, code },
      );
      if (!data?.success) {
        throw new Error(data?.message ?? "Two-factor verification failed");
      }
      const payload = data.data;
      if (
        !payload ||
        typeof payload.accessToken !== "string" ||
        typeof payload.refreshToken !== "string"
      ) {
        throw new Error("Invalid two-factor verification response");
      }
      await setTokens(payload.accessToken, payload.refreshToken);
      return payload;
    } catch (e) {
      throw new Error(messageFromAxiosError(e));
    }
  },

  // Two-Factor setup (fetch QR data for the authenticator app)
  async setupTwoFactor(
    setupToken: string,
  ): Promise<TwoFactorSetupResponseBody["data"]> {
    try {
      const { data } = await api.post<TwoFactorSetupResponseBody>(
        "/auth/admin/2fa/setup",
        { setupToken },
      );
      if (!data?.success) {
        throw new Error(data?.message ?? "Two-factor setup failed");
      }
      const payload = data.data;
      if (
        !payload ||
        typeof payload.qrCodeDataUrl !== "string" ||
        !payload.qrCodeDataUrl ||
        typeof payload.manualEntryKey !== "string" ||
        !payload.manualEntryKey ||
        typeof payload.otpauthUrl !== "string" ||
        !payload.otpauthUrl
      ) {
        throw new Error("Invalid two-factor setup response");
      }

      return payload;
    } catch (e) {
      throw new Error(messageFromAxiosError(e));
    }
  },

  // Reset Password
  async resetPassword(
    resetToken: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<ResetPasswordResponseBody> {
    try {
      const { data } = await api.post<ResetPasswordResponseBody>(
        "/auth/reset-password",
        { resetToken, newPassword, confirmPassword },
      );
      if (data.success === false) {
        throw new Error(data.message ?? "Reset password failed");
      }
      return data;
    } catch (e) {
      throw new Error(messageFromAxiosError(e));
    }
  },
};
