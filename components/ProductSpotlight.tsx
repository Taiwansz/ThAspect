import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";

export const ProductSpotlight = () => {
  const product = PRODUCTS.find((item) => item.id === "prod-06") ?? PRODUCTS[0];

  return (
    <section className="relative overflow-hidden bg-[#111] text-white">
      <div aria-hidden="true" className="absolute inset-y-0 right-[-7%] w-[46%] rotate-[-12deg] bg-[#0057FF]/18" />
      <div aria-hidden="true" className="absolute bottom-[-18%] left-[44%] h-48 w-[42%] rotate-[10deg] bg-[#FF6A00]/16" />

      <div className="relative mx-auto grid min-h-[620px] max-w-[1440px] items-center gap-8 px-6 py-16 md:grid-cols-[.9fr_1.1fr] md:px-10 lg:px-14">
        <div data-reveal className="order-2 md:order-1">
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#0057FF]">Product focus / 006</p>
          <h2 className="mt-4 max-w-[650px] text-4xl font-black uppercase leading-[.91] tracking-[-.055em] sm:text-6xl lg:text-7xl">
            Vision
            <span className="block text-white/35">Charcoal.</span>
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-white/62">{product.description}</p>

          <div className="mt-8 grid max-w-xl grid-cols-2 border-y border-white/12 sm:grid-cols-4">
            {[
              ["450 GSM", "Malha pesada"],
              ["3 PANEL", "Capuz"],
              ["OVERSIZED", "Fit"],
              ["CHARCOAL", "Colorway"],
            ].map(([value, label], index) => (
              <div key={value} className={`py-5 pr-4 ${index > 0 ? "sm:border-l sm:border-white/12 sm:pl-4" : ""}`}>
                <p className="text-sm font-black tracking-[-0.02em]">{value}</p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.17em] text-white/35">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link href={`/produto/${product.slug}`} className="group inline-flex h-12 items-center gap-4 bg-white px-6 text-[10px] font-black uppercase tracking-[0.15em] text-[#111] transition-colors hover:bg-[#0057FF] hover:text-white">
              Ver produto <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/45">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>

        <div className="relative order-1 min-h-[440px] md:order-2 md:min-h-[560px]" data-reveal>
          <div className="absolute inset-8 rotate-[4deg] border border-white/12" />
          <div className="absolute left-0 top-[15%] h-[4px] w-[58%] rotate-[-12deg] bg-[#0057FF]" />
          <div className="absolute bottom-[15%] right-0 h-[4px] w-[44%] rotate-[9deg] bg-[#FF6A00]" />
          <Image
            src={product.angleView.frontal}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 56vw"
            className="spotlight-product object-contain p-6 md:p-10"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-[8px] font-black uppercase tracking-[0.32em] text-white/28">
            Find another side of you
          </span>
        </div>
      </div>
    </section>
  );
};
