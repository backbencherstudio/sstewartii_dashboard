# Dashboard layout + sidebar — folder structure and setup

This guide describes how the **dashboard shell** is organized in this repo: **sidebar**, **topbar**, **main content**, and how that maps to **App Router** folders. It includes **copy-paste source** for the layout components.

For **auth + providers** wiring, see [auth-setup.md](./auth-setup.md) and [auth-portable-setup.md](./auth-portable-setup.md).

---

## 1. Design goals

| Goal | How it is done |
|------|------------------|
| **Shell once** | `(dashboard)` route group uses one layout: `Providers` → `DashboardLayout`. |
| **Responsive sidebar** | `Sidebar`: off-canvas + backdrop on small screens; fixed column on `md+`; optional **collapsible** width on desktop. |
| **Menu driven by config** | `SidebarMenu.tsx` holds an array of items; `SidebarItem` renders links, groups, and actions (e.g. logout). |
| **Topbar + mobile menu** | `DashboardLayout` owns `sidebarOpen` state; `Topbar` receives `onMenuClick` to open the drawer on mobile. |

---

## 2. Recommended folder structure

Place **layout UI** under `components/layout/` so it stays separate from feature pages and shared UI primitives (`components/ui/`).

```text
components/
├── Providers.tsx                 # QueryClient, AuthProvider, optional SidebarProvider (shadcn)
├── layout/
│   ├── Provider/
│   │   └── AuthProvider.tsx      # fetchMe after Zustand hydrate (auth)
│   ├── DashboardLayout/
│   │   ├── DashboardLayout.tsx   # Shell: Sidebar + main + Topbar
│   │   └── index.ts              # optional barrel export
│   ├── Sidebar/
│   │   ├── Sidebar.tsx           # Aside, backdrop, collapse variant
│   │   ├── SidebarHeader.tsx     # Title + desktop collapse control
│   │   ├── SidebarMenu.tsx       # Nav config + top/bottom sections
│   │   └── SidebarItem.tsx       # Link / group / button item
│   └── Topbar/
│       ├── Topbar.tsx
│       └── index.ts              # optional
│
app/
├── (auth)/                       # Public auth pages (no dashboard shell)
│   └── login/
│       └── page.tsx
├── (dashboard)/                  # All authenticated “app” pages
│   ├── layout.tsx                # Providers + DashboardLayout
│   ├── dashboard/
│   │   ├── page.tsx              # e.g. /dashboard
│   │   └── _components/          # page-local components (optional)
│   ├── vendors/
│   │   └── page.tsx              # e.g. /vendors
│   └── settings/
│       └── page.tsx              # e.g. /settings
└── layout.tsx                    # Root HTML + fonts only
```

**Conventions**

- **`(dashboard)`** — Route group name in parentheses → **does not** affect the URL. Pages inside still use normal segments: `app/(dashboard)/vendors/page.tsx` → `/vendors`.
- **`_components/`** — Underscore folder: colocate small components with a route without creating new URL segments.
- **`components/layout/`** — Only **app chrome** (sidebar, topbar, dashboard wrapper). Feature-specific widgets can live under `app/(dashboard)/<feature>/`.

---

## 3. How pieces connect (data flow)

```text
app/(dashboard)/layout.tsx
  └── <Providers>
        └── <DashboardLayout>
              ├── <Sidebar open onClose variant />
              └── <main>
                    ├── <Topbar onMenuClick />
                    └── {children}   ← page content from app/(dashboard)/...
```

1. **`layout.tsx`** (dashboard group) wraps every dashboard URL with `Providers` then `DashboardLayout`.
2. **`DashboardLayout`** keeps `sidebarOpen` for mobile; passes **`onMenuClick`** to `Topbar` and **`open` / `onClose`** to `Sidebar`.
3. **`Sidebar`** renders backdrop (mobile), sliding `<aside>`, **`SidebarHeader`**, **`SidebarMenu`**.
4. **`SidebarMenu`** defines **`menuItems`** (href, nested `children`, `onClick` for logout). Keep `href` values **in sync** with real routes under `app/(dashboard)/`.

---

## 4. Copy-paste source files

Requires **`useAuth`** from your auth setup ([auth-portable-setup.md](./auth-portable-setup.md)), **`@/*`** path alias, **Tailwind**, and **`lucide-react`**.

### 4.1 `components/layout/DashboardLayout/DashboardLayout.tsx`

```tsx
"use client";

import React, { useState } from "react";
import { Topbar } from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full w-full bg-white">
      <div className="h-screen">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          variant="collapsible"
        />
      </div>
      <main className="flex-1 w-full overflow-auto bg-gray-50">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        {children}
      </main>
    </div>
  );
}
```

Use **`variant="basic"`** if you do not want the desktop collapse rail.

---

### 4.2 `components/layout/Sidebar/Sidebar.tsx`

```tsx
"use client";

import React, { useEffect, useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";

type SidebarVariant = "basic" | "collapsible";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant?: SidebarVariant;
}

const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  variant = "basic",
}) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (variant === "basic") setCollapsed(false);
  }, [variant]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const isCollapsible = variant === "collapsible";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r border-gray-200 bg-gray-100
          transform transition-all duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          ${isCollapsible && collapsed ? "w-16" : "w-64"}
          md:relative md:z-auto md:translate-x-0
        `}
      >
        <SidebarHeader
          collapsed={isCollapsible && collapsed}
          showCollapseButton={isCollapsible}
          onToggleCollapse={() => setCollapsed((prev) => !prev)}
        />

        <div className="h-full flex-1 overflow-x-hidden overflow-y-auto">
          <SidebarMenu
            collapsed={isCollapsible && collapsed}
            onRequestExpand={() => setCollapsed(false)}
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
```

---

### 4.3 `components/layout/Sidebar/SidebarHeader.tsx`

```tsx
import React from "react";
import { ChevronLeft } from "lucide-react";

interface SidebarHeaderProps {
  collapsed: boolean;
  showCollapseButton: boolean;
  onToggleCollapse: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  collapsed,
  showCollapseButton,
  onToggleCollapse,
}) => {
  return (
    <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-4">
      {!collapsed && (
        <span className="truncate text-xl font-bold text-gray-800">
          Dashboard
        </span>
      )}

      {showCollapseButton && (
        <button
          type="button"
          onClick={onToggleCollapse}
          className="ml-auto rounded-md p-1.5 transition-colors hover:bg-gray-200"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            size={18}
            className={`hidden transition-transform duration-300 md:block ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </div>
  );
};

export default SidebarHeader;
```

---

### 4.4 `components/layout/Sidebar/SidebarMenu.tsx`

Edit **`menuItems`** when you add routes. Every **`href`** should exist under `app/(dashboard)/`.

```tsx
"use client";

import React from "react";
import { Home, Store, Settings, LogOut, User } from "lucide-react";
import SidebarItem from "./SidebarItem";
import useAuth from "@/hooks/useAuth";

interface SidebarMenuProps {
  collapsed: boolean;
  onRequestExpand?: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  collapsed,
  onRequestExpand,
}) => {
  const { logout } = useAuth();

  const menuItems = [
    {
      label: "Home",
      href: "/dashboard",
      icon: <Home size={18} />,
    },
    {
      label: "Vendors",
      icon: <Store size={18} />,
      isCollapsible: true,
      children: [
        { label: "All Vendors", href: "/vendors" },
        { label: "Add Vendor", href: "/vendors/add" },
        { label: "Pending", href: "/vendors/pending" },
      ],
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings size={18} />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <User size={18} />,
      isBottom: true,
    },
    {
      label: "Logout",
      onClick: logout,
      icon: <LogOut size={18} />,
      isBottom: true,
    },
  ];

  const topItems = menuItems.filter((item) => !item.isBottom);
  const bottomItems = menuItems.filter((item) => item.isBottom);

  return (
    <nav className="flex h-full flex-col justify-between px-3 py-4">
      <div className="flex flex-col gap-1">
        {topItems.map((item) => (
          <SidebarItem
            key={item.label}
            {...item}
            collapsed={collapsed}
            onRequestExpand={onRequestExpand}
          />
        ))}
      </div>
      <div className="-mx-3 border-t border-gray-200 pt-4">
        <div className="flex flex-col gap-1 px-3">
          {bottomItems.map((item) => (
            <SidebarItem
              key={item.label}
              {...item}
              collapsed={collapsed}
              onRequestExpand={onRequestExpand}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SidebarMenu;
```

---

### 4.5 `components/layout/Sidebar/SidebarItem.tsx`

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface ChildItem {
  label: string;
  href: string;
}

interface SidebarItemProps {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  isBottom?: boolean;
  isCollapsible?: boolean;
  children?: ChildItem[];
  collapsed?: boolean;
  onRequestExpand?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  onClick,
  icon,
  isCollapsible,
  children,
  collapsed,
  onRequestExpand,
}) => {
  const pathname = usePathname();
  const isActive = href ? pathname === href : false;
  const isChildActive = children?.some((child) => pathname === child.href);
  const [open, setOpen] = useState(isChildActive ?? false);

  const baseClass = `
    flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-left text-sm
    transition-colors duration-150
    ${collapsed ? "justify-center px-2" : ""}
    ${
      isActive || isChildActive
        ? "bg-gray-900 font-medium text-white"
        : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
    }
  `;

  if (collapsed) {
    if (isCollapsible && children?.length && !href) {
      return (
        <button
          type="button"
          onClick={() => {
            onRequestExpand?.();
            setOpen(true);
          }}
          className={baseClass}
          title={label}
        >
          {icon && <span className="shrink-0">{icon}</span>}
        </button>
      );
    }

    if (href) {
      return (
        <Link href={href} className={baseClass} title={label}>
          {icon && <span className="shrink-0">{icon}</span>}
        </Link>
      );
    }
    return (
      <button type="button" onClick={onClick} className={baseClass} title={label}>
        {icon && <span className="shrink-0">{icon}</span>}
      </button>
    );
  }

  if (isCollapsible && children) {
    return (
      <div>
        <button type="button" onClick={() => setOpen((prev) => !prev)} className={baseClass}>
          {icon && <span className="shrink-0">{icon}</span>}
          <span className="flex-1">{label}</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-200 ease-in-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="relative ml-6 flex flex-col">
            <div className="absolute bottom-6 left-0 top-0 h-[calc(100%-2rem)] w-px bg-gray-600" />
            {children.map((child) => (
              <ChildItem
                key={child.label}
                label={child.label}
                href={child.href}
                isActive={pathname === child.href}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClass}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default SidebarItem;

interface ChildItemProps {
  label: string;
  href: string;
  isActive: boolean;
}

const ChildItem: React.FC<ChildItemProps> = ({ label, href, isActive }) => {
  return (
    <Link
      href={href}
      className={`
        relative flex items-center py-2 pl-6 text-sm transition-colors duration-150
        ${isActive ? "font-semibold text-gray-800" : "text-gray-600 hover:text-gray-800"}
        before:absolute before:left-0 before:top-1/3 before:h-4 before:w-5
        before:-translate-y-1/2 before:rounded-bl-md before:border-b before:border-l before:border-gray-600
      `}
    >
      {label}
    </Link>
  );
};
```

---

### 4.6 `components/layout/Topbar/Topbar.tsx`

```tsx
"use client";

import { Bell, Menu, User } from "lucide-react";
import useAuth from "@/hooks/useAuth";

type Props = {
  onMenuClick?: () => void;
};

export const Topbar = ({ onMenuClick }: Props) => {
  const { user } = useAuth();

  const email = user?.email ?? "—";
  const role = user?.type ?? "—";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#EAECF0] bg-white px-4 md:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-md p-1.5 hover:bg-gray-100 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            type="button"
            className="rounded-full border border-solid border-white/10 bg-gray-100 p-2 transition-colors hover:border-[#F6D642]/40"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          <span className="absolute right-2.5 top-2.5 h-2 w-2 shrink-0 rounded-[14px] bg-[#EB3D4D]" />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-solid border-white/10 bg-gray-100 p-2 transition-colors hover:border-[#F6D642]/40"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </button>
          <div>
            <p className="text-sm font-semibold leading-[150%]">{email}</p>
            <p className="text-xs font-normal leading-[150%] text-gray-500">{role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
```

---

### 4.7 `app/(dashboard)/layout.tsx`

```tsx
import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import { Providers } from "@/components/Providers";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <DashboardLayout>{children}</DashboardLayout>
    </Providers>
  );
}
```

---

### 4.8 Example page `app/(dashboard)/dashboard/page.tsx`

```tsx
export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-gray-600">Main content goes here.</p>
    </div>
  );
}
```

---

## 5. Step-by-step: wire-up checklist

1. **Install:** `npm install lucide-react` (plus auth stack deps if needed).
2. **Paths:** `@/*` in `tsconfig.json` (see [auth-portable-setup.md](./auth-portable-setup.md)).
3. **Create files** from [§4](#4-copy-paste-source-files) under `components/layout/…` and `app/(dashboard)/…`.
4. **`Providers.tsx`:** Must wrap children with **AuthProvider** (and React Query if you use it). This repo also includes optional **`SidebarProvider`** from shadcn — the custom sidebar in §4 does **not** require it; you can use:

```tsx
"use client";

import { AuthProvider } from "@/components/layout/Provider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
```

5. **Routes:** Add `page.tsx` files for every `href` in `SidebarMenu` (e.g. `/profile`, `/vendors/add`) or remove unused menu entries.
6. **`proxy.ts`:** Keep dashboard paths **off** `PUBLIC_PATHS` so they require `access-token`.

---

## 6. Sidebar variants

| `variant` | Behavior |
|-----------|----------|
| **`basic`** | Full width on desktop; mobile still uses `open` / backdrop / slide. |
| **`collapsible`** | Desktop: narrow (icons) vs wide via header chevron; groups can request expand when collapsed. |

`DashboardLayout` in §4.1 uses **`collapsible`**. Pass **`basic`** for a simpler header.

---

## 7. Menu item contract (`SidebarMenu.tsx`)

- **`label`**, optional **`href`**, optional **`icon`**
- **`isCollapsible: true`** + **`children: { label, href }[]`**
- **`isBottom: true`** — pinned to the bottom section
- **`onClick`** — actions without navigation (e.g. `logout`)

After adding a route: new `app/(dashboard)/<segment>/page.tsx` **and** matching **`href`** in `menuItems`.

---

## 8. Optional: barrel exports

```ts
// components/layout/DashboardLayout/index.ts
export { default } from "./DashboardLayout";
```

Then: `import DashboardLayout from "@/components/layout/DashboardLayout";`

---

## 9. What to avoid mixing

- **`components/ui/sidebar`** (shadcn) vs **custom** `components/layout/Sidebar` — pick one primary pattern.
- **`Sidebar2/`** in this repo is legacy; use **`Sidebar/`** for new work.

---

## 10. Checklist (copy to another repo)

1. [ ] Paste §4 files into `components/layout/` and `app/(dashboard)/`.
2. [ ] Wire `Providers` with `AuthProvider` (§5.4).
3. [ ] Add pages for each sidebar `href`.
4. [ ] Align `proxy.ts` `PUBLIC_PATHS` with public routes only.
5. [ ] Run `npm run dev` and test mobile menu, Escape closing overlay, desktop collapse.

---

## 11. Related docs

- [auth-setup.md](./auth-setup.md) — Auth flow, cookies, `proxy.ts`, API.
- [auth-portable-setup.md](./auth-portable-setup.md) — Copy-paste auth files for a greenfield app.
