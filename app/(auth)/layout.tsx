import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-white">
      <div className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:px-8">
        <section className="hidden rounded-3xl bg-slate-900 p-10 text-white shadow-2xl md:block">
          <p className="text-sm font-medium uppercase tracking-wider text-blue-200">
            sstewartii dashboard
          </p>
          <h2 className="mt-6 text-4xl font-semibold leading-tight">
            Welcome back to your workspace
          </h2>
          <p className="mt-4 max-w-md text-slate-300">
            Securely access your account, manage your teams, and stay on top of
            your dashboard activity.
          </p>
        </section>

        <section className="md:px-6">{children}</section>
      </div>
    </div>
  );
}
