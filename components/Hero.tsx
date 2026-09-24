import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section id="top" className="relative min-h-[560px] overflow-hidden bg-[#111] md:min-h-[610px]">
      <Image
        src="/products/hero-lifestyle.jpg"
        alt="Campanha ThAspect em arquitetura brutalista"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[64%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,7,.97)_0%,rgba(7,7,7,.88)_28%,rgba(7,7,7,.42)_53%,rgba(7,7,7,.05)_78%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.30)_0%,transparent_42%)]" />

      <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1440px] items-center px-6 py-16 md:min-h-[610px] md:px-10 lg:px-14">
        <div className="max-w-[590px] text-white">
          <div className="mb-7 flex items-center gap-4">
            <span className="h-[3px] w-8 bg-[#FF6A00]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/90">ThAspect Streetwear · Drop 01</p>
          </div>

          <p className="mb-4 max-w-[250px] text-sm font-bold uppercase leading-[1.45] tracking-[0.22em] text-white/90">
            Novas perspectivas sempre.
          </p>

          <h1 className="font-heading text-[45px] font-black uppercase leading-[0.94] tracking-[-0.055em] sm:text-[62px] lg:text-[74px]">
            Moda também é
            <span className="mt-1 block text-[#FF6A00]">perspectiva.</span>
          </h1>

          <p className="mt-6 max-w-[500px] text-[15px] leading-7 text-white/78 sm:text-base">
            Mais que roupas, um ponto de vista. Streetwear autoral construído entre arquitetura, movimento e identidade.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#catalogo"
              className="group inline-flex h-12 items-center gap-4 bg-white px-6 text-[11px] font-black uppercase tracking-[0.15em] text-[#111] transition-colors hover:bg-[#0057FF] hover:text-white"
            >
              Ver coleção
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#manifesto"
              className="inline-flex h-12 items-center border border-white/50 px-6 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:border-white hover:bg-white hover:text-[#111]"
            >
              Conhecer a marca
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 gap-2 md:flex">
        <span className="h-[3px] w-8 bg-[#FF6A00]" />
        <span className="h-[3px] w-8 bg-white/40" />
        <span className="h-[3px] w-8 bg-white/40" />
      </div>
    </section>
  );
};
