

export const cookie = {
    get: (name: string): string | null => {
        if (typeof document === "undefined") return null;   // SSR guard
        const row = document.cookie.split("; ").find((r) => r.startsWith(`${name}=`));
        if (!row) return null;
        const raw = row.slice(name.length + 1);
        try {
            return decodeURIComponent(raw);
        } catch {
            return raw;
        }
    },

    set: (name: string, value: string, days: number = 1) => {
        const expires = new Date();
        expires.setDate(expires.getDate() + days);
        document.cookie = [
            `${name}=${encodeURIComponent(value)}`,
            `expires=${expires.toUTCString()}`,
            "path=/",
            "SameSite=Strict",
            process.env.NODE_ENV === "production" ? "Secure" : "",
        ]
            .filter(Boolean)
            .join("; ");
    },

    remove: (name: string) => {
        document.cookie = `${name}=; Max-Age=0; path=/`;
    },
};