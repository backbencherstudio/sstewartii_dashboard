import { breadcrumbConfig } from "@/config/routes";

export const getBreadcrumbLabels = (pathname: string) => {
  const entries = Object.entries(breadcrumbConfig);

  // find best match (longest matching prefix)
  const match = entries
    .filter(([path]) => pathname.startsWith(path))
    .sort((a, b) => b[0].length - a[0].length)[0];

  if (!match) return [];

  const [basePath, labels] = match;

  let currentPath = basePath;

  return labels.map((label) => {
    const href = currentPath;

    return { label, href };
  });
};