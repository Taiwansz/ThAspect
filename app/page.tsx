import { Hero } from "@/components/Hero";
import { BenefitsStrip } from "@/components/BenefitsStrip";
import { ProductCatalog } from "@/components/ProductCatalog";
import { EditorialSection } from "@/components/EditorialSection";

export default function HomePage() {
  return (
    <div className="w-full">
      <Hero />
      <BenefitsStrip />
      <ProductCatalog />
      <EditorialSection />
    </div>
  );
}
