import type { Metadata } from "next";
import "./antigo.css";

export const metadata: Metadata = {
  title: "ThAspect — Versão Antiga",
  description: "Versão histórica original do storefront ThAspect.",
};

export default function AntigoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
