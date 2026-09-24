import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { PRODUCTS, getProductBySlug } from "@/data/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () => PRODUCTS.map((product) => ({ slug: product.slug }));

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} — ThAspect`,
    description: product.description,
    alternates: { canonical: `/produto/${product.slug}` },
    openGraph: {
      title: `${product.name} — ThAspect`,
      description: product.description,
      type: "website",
      images: [{ url: product.angleView.frontal, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [`https://thaspect.vercel.app${product.angleView.frontal}`],
    brand: { "@type": "Brand", name: "ThAspect" },
    sku: product.id,
    color: product.colorName,
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      url: `https://thaspect.vercel.app/produto/${product.slug}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <ProductDetailClient product={product} />
    </>
  );
}
