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
  // authorization?: {
  //   type?: string;
  //   access_token: string;
  //   refresh_token: string;
  // };
  type?: string;
  data: {
    success: boolean;
    message: string;
    requiresTwoFactor: boolean;
    challengeToken: string;
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
