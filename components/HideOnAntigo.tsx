"use client";

import { usePathname } from "next/navigation";

export const HideOnAntigo = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  if (pathname === "/antigo" || pathname.startsWith("/antigo/")) return null;
  return <>{children}</>;
};
