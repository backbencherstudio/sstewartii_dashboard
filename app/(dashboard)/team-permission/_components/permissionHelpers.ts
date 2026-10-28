import axios from "axios";
import { format } from "date-fns";
import { Permission } from "@/types/teamPermission.types";

export interface GroupedPermissionCategory {
  category: string;
  permissions: Permission[];
}

/**
 * Groups raw permissions array by module resource (e.g. user, vendor, product, order).
 * Ensures full null-safety and defensive fallbacks.
 */
export function groupPermissionsByResource(
  permissions?: Permission[] | null
): GroupedPermissionCategory[] {
  if (!permissions || !Array.isArray(permissions)) {
    return [];
  }

  const map = new Map<string, Permission[]>();

  permissions.forEach((perm) => {
    if (!perm || !perm.name) return;

    let category = "General";

    if (perm.name.includes(":")) {
      const parts = perm.name.split(":");
      const resource = parts[1]?.trim() || "";
      if (resource) {
        category = resource.charAt(0).toUpperCase() + resource.slice(1);
      }
    }

    if (!map.has(category)) {
      map.set(category, []);
    }
    map.get(category)!.push(perm);
  });

  const actionOrder = ["create", "read", "update", "delete", "manage"];

  const result: GroupedPermissionCategory[] = [];
  map.forEach((perms, category) => {
    perms.sort((a, b) => {
      const aName = a?.name || "";
      const bName = b?.name || "";
      const aAction = aName.split(":")[0]?.toLowerCase();
      const bAction = bName.split(":")[0]?.toLowerCase();
      const aIndex = actionOrder.indexOf(aAction);
      const bIndex = actionOrder.indexOf(bAction);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      return aName.localeCompare(bName);
    });
    result.push({ category, permissions: perms });
  });

  return result.sort((a, b) => a.category.localeCompare(b.category));
}

/**
 * Returns badge styling and formatted action string for permission tags.
 */
export function getActionBadgeInfo(permName?: string | null): {
  action: string;
  resource: string;
  badgeClass: string;
} {
  const safeName = permName || "";
  const [action = "ACTION", resource = ""] = safeName.split(":");
  let badgeClass = "bg-gray-100 text-gray-700 border-gray-200";

  switch (action.toLowerCase()) {
    case "create":
      badgeClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
      break;
    case "read":
      badgeClass = "bg-blue-50 text-blue-700 border-blue-200";
      break;
    case "update":
      badgeClass = "bg-amber-50 text-amber-700 border-amber-200";
      break;
    case "delete":
      badgeClass = "bg-rose-50 text-rose-700 border-rose-200";
      break;
    case "manage":
      badgeClass = "bg-purple-50 text-purple-700 border-purple-200";
      break;
  }

  return {
    action: action.toUpperCase(),
    resource: resource ? resource.charAt(0).toUpperCase() + resource.slice(1) : "",
    badgeClass,
  };
}

/**
 * Safely formats a date string without throwing on invalid dates or undefined values.
 */
export function formatDateSafe(
  dateStr?: string | null,
  formatPattern = "MMM d, yyyy"
): string {
  if (!dateStr) return "N/A";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "N/A";
    return format(d, formatPattern);
  } catch {
    return "N/A";
  }
}

/**
 * Extracts a human-readable error message from unknown or Axios error payloads.
 */
export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong"
): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message;
    }
    const status = error.response?.status;
    if (status === 401) return "Session expired or unauthorized. Please log in again.";
    if (status === 403) return "You do not have permission to perform this action.";
    if (status === 404) return "Requested role or permission resource was not found.";
    if (status === 409) return data?.message || "A role with this name already exists.";
    if (typeof error.message === "string" && error.message.trim()) {
      return error.message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
