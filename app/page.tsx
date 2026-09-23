import React from "react";
import { Hero } from "@/components/Hero";
import { PerspectiveMarquee } from "@/components/PerspectiveMarquee";
import { ProductCatalog } from "@/components/ProductCatalog";
import { DropsSection } from "@/components/DropsSection";
import { PerspectiveViewer } from "@/components/PerspectiveViewer";
import { HeritageSection } from "@/components/HeritageSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <PerspectiveMarquee />
      <ProductCatalog />
      <DropsSection />
      <PerspectiveViewer />
      <HeritageSection />
    </div>
  );
}
