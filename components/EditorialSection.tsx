import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const EditorialSection = () => (
  <section id="editorial" className="bg-[#111]">
    <div className="grid min-h-[390px] md:grid-cols-3">
      <article className="relative min-h-[370px] overflow-hidden md:col-span-1">
        <Image src="/products/hero-lifestyle.jpg" alt="Editorial ThAspect" fill sizes="(max-width: 768px) 100vw, 34vw" className="object-cover object-[68%_center]" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-x-0 bottom-0 p-7 text-white">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/60">Coleção</p>
          <h3 className="mt-2 text-2xl font-black uppercase leading-none">Perspective</h3>
          <p className="mt-3 max-w-[260px] text-xs leading-5 text-white/70">Explore peças que unem design, qualidade e atitude.</p>
          <Link href="#catalogo" className="mt-5 inline-flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.14em]">
            Ver coleção <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </article>

      <article className="relative min-h-[370px] overflow-hidden bg-[#F2EFE9] md:col-span-1">
        <Image src="/products/prod-03.jpg" alt="Camiseta ThAspect Perspective" fill sizes="(max-width: 768px) 100vw, 34vw" className="object-contain p-8" />
        <div className="absolute left-6 top-6">
          <p className="text-[9px] font-black uppercase tracking-[0.22em]">Camisetas</p>
          <h3 className="mt-2 max-w-[230px] text-2xl font-black uppercase leading-[1.02]">Expressão em cada detalhe.</h3>
        </div>
      </article>

      <article className="relative min-h-[370px] overflow-hidden bg-[#171717] md:col-span-1">
        <Image src="/products/prod-08.jpg" alt="Shoulder bag ThAspect" fill sizes="(max-width: 768px) 100vw, 34vw" className="object-contain p-10 opacity-95" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.75),transparent_55%)]" />
        <div className="absolute bottom-7 left-7 text-white">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/60">Acessórios</p>
          <h3 className="mt-2 max-w-[260px] text-2xl font-black uppercase leading-[1.02]">O detalhe que faz diferença.</h3>
        </div>
      </article>
    </div>

    <div className="relative min-h-[330px] overflow-hidden border-t border-white/10">
      <Image src="/products/prod-05.jpg" alt="Hoodie ThAspect" fill sizes="100vw" className="object-cover object-center opacity-45 blur-[1px] scale-110" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#111_0%,rgba(17,17,17,.85)_32%,rgba(17,17,17,.28)_72%,#111_100%)]" />
      <div className="relative z-10 mx-auto flex min-h-[330px] max-w-[1440px] items-center justify-between gap-8 px-6 py-12 md:px-10 lg:px-14">
        <div className="max-w-xl text-white">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/60">Nova coleção</p>
          <h2 className="mt-3 text-4xl font-black uppercase leading-[0.94] tracking-[-0.05em] sm:text-5xl">
            Find another
            <span className="block text-[#0057FF]">side of you.</span>
          </h2>
        </div>
        <Link href="#catalogo" className="hidden h-12 items-center gap-4 border border-white/50 px-6 text-[10px] font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-[#111] md:flex">
          Explorar coleção <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);
