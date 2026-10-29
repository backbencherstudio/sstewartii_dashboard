export interface UserRoleObject {
  id: string;
  name: string;
  slug?: string | null;
  description?: string | null;
  isSystem?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  country_code: string | null;
  phone_number: string | null;
  role: string | UserRoleObject;
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
  // authorization?: {
  //   type?: string;
  //   access_token: string;
  //   refresh_token: string;
  // };
  type?: string;
  data: {
    success: boolean;
    message: string;

    /** `true` when this account has no 2FA enrolled yet and must complete
     *  setup before continuing. Only present on setup-required logins.
     *  Handle by storing {@link setupToken} and routing to the 2FA setup page. */
    requiresTwoFactorSetup?: boolean;
    /** Short-lived token authorizing the 2FA setup calls (fetch QR data +
     *  confirm). Only present when `requiresTwoFactorSetup` is true.
     *  Single-use: discard after setup completes or a new login starts. */
    setupToken?: string;

    /** `true` when 2FA is already enrolled: this login pauses and waits for
     *  a TOTP code from the authenticator app. Only present on
     *  verification-required logins. Handle by storing {@link challengeToken}
     *  and routing to `/login/two-factor/app`. */
    requiresTwoFactor?: boolean;
    /** Short-lived token authorizing the 2FA code-verification call.
     *  Only present when `requiresTwoFactor` is true. Single-use:
     *  cleared from sessionStorage after verify (or a new login). */
    challengeToken?: string;
  };
}

export interface ForgotPasswordResponseBody {
  success?: boolean;
  message?: string;
}

export interface VerifyOTPResponseBody {
  success?: boolean;
  message?: string;
  resetToken?: string;
  reset_token?: string;
  token?: string;
  data?: {
    resetToken?: string;
    reset_token?: string;
    token?: string;
  };
}

export interface ResetPasswordResponseBody {
  success?: boolean;
  message?: string;
}

export interface TwoFactorVerifyResponseBody {
  success: boolean;
  statusCode?: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      role: "ADMIN";
      isVerified: boolean;
    };
    deletionInfo: null;
  };
}

export interface TwoFactorSetupResponseBody {
  success: boolean;
  statusCode?: number;
  message: string;
  data: {
    qrCodeDataUrl: string;
    manualEntryKey: string;
    otpauthUrl: string;
  };
}
