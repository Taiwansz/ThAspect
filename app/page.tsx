import { Hero } from "@/components/Hero";
import { BenefitsStrip } from "@/components/BenefitsStrip";
import { ProductCatalog } from "@/components/ProductCatalog";
import { EditorialSection } from "@/components/EditorialSection";
import { ProductSpotlight } from "@/components/ProductSpotlight";
import { PerspectiveMarquee } from "@/components/PerspectiveMarquee";

export default function HomePage() {
  return (
    <div className="w-full">
      <Hero />
      <BenefitsStrip />
      <ProductCatalog />
      <PerspectiveMarquee />
      <ProductSpotlight />
      <EditorialSection />
    </div>
  );
}
