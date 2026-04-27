import { breadcrumbConfig } from "@/config/routes";

export const getBreadcrumbLabels = (pathname: string) => {
  const entries = Object.entries(breadcrumbConfig);

  // find best match (longest matching prefix)
  const match = entries
    .filter(([path]) => pathname.startsWith(path))
    .sort((a, b) => b[0].length - a[0].length)[0];

  if (!match) return [];

  const [basePath, labels] = match;
  const pathSegments = basePath.split("/").filter(Boolean);

  return labels.map((label, idx) => {
    // Keep breadcrumbs progressive so parent labels navigate to parent routes.
    const segmentCount = Math.max(
      1,
      pathSegments.length - labels.length + idx + 1
    );
    const href = `/${pathSegments.slice(0, segmentCount).join("/")}`;

    return { label, href };
  });
};