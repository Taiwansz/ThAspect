"use client";

import { CartProvider } from "@/components/antigo/AntigoCartContext";
import { AntigoHeader } from "@/components/antigo/AntigoHeader";
import { AntigoCartDrawer } from "@/components/antigo/AntigoCartDrawer";
import { AntigoHero } from "@/components/antigo/AntigoHero";
import { AntigoPerspectiveMarquee } from "@/components/antigo/AntigoPerspectiveMarquee";
import { AntigoProductCatalog } from "@/components/antigo/AntigoProductCatalog";
import { AntigoDropsSection } from "@/components/antigo/AntigoDropsSection";
import { AntigoPerspectiveViewer } from "@/components/antigo/AntigoPerspectiveViewer";
import { AntigoHeritageSection } from "@/components/antigo/AntigoHeritageSection";
import { AntigoFooter } from "@/components/antigo/AntigoFooter";

export default function AntigoPage() {
  return (
    <CartProvider>
      <div className="antigo-root flex min-h-screen w-full flex-col bg-[#FAF8F3] text-[#1F1F1F]">
        <AntigoHeader />
        <AntigoCartDrawer />
        <main className="flex w-full flex-col">
          <AntigoHero />
          <AntigoPerspectiveMarquee />
          <AntigoProductCatalog />
          <AntigoDropsSection />
          <AntigoPerspectiveViewer />
          <AntigoHeritageSection />
        </main>
        <AntigoFooter />
      </div>
    </CartProvider>
  );
}
