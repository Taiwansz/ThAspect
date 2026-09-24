import type { Metadata } from "next";
import "./antigo.css";

export const metadata: Metadata = {
  title: "ThAspect V1 — CS-Vault",
  description: "Preservação visual da versão acadêmica original da ThAspect documentada no CS-Vault.",
};

export default function AntigoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
