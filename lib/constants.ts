export const IS_DEV = process.env.NODE_ENV === "development";

export const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL ||
  (process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api(\/v\d+)?\/?$/, "")
    : "https://atliss.anikstudio.com");

export const TWO_FACTOR_CHALLENGE_KEY = "2fa-challenge-token";
export const TWO_FACTOR_SETUP_KEY = "2fa-setup-token";
