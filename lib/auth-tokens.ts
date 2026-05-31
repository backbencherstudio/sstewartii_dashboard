/** Normalize token fields from API payloads (login / refresh). */
export function extractTokensFromAuthPayload(payload: unknown): {
  accessToken: string;
  refreshToken: string;
} | null {
  if (!payload || typeof payload !== "object") return null;

  const p = payload as Record<string, unknown>;
  const data = p.data;

  if (!data || typeof data !== "object") return null;

  const authData = data as Record<string, unknown>;

  if (
    typeof authData.accessToken === "string" &&
    typeof authData.refreshToken === "string"
  ) {
    return {
      accessToken: authData.accessToken,
      refreshToken: authData.refreshToken,
    };
  }

  return null;
}