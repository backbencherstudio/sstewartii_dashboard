import type { ReactNode } from "react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      <div
        className="relative flex flex-1 items-center justify-center"
        style={{
          backgroundImage: "url(/images/auth-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {children}
      </div>

      <div
        className="relative hidden h-screen shrink-0 lg:block"
        style={{ width: "min(50%)" }}
        // style={{ width: "min(50%, 667px)" }}
      >
        <Image
          src="/images/auth-side.png"
          alt="Brand illustration"
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}
