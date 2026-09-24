import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Footer: React.FC = () => (
  <footer id="manifesto" className="relative overflow-hidden bg-[#0E0E0E] text-white">
    <div aria-hidden="true" className="absolute right-[-8%] top-[-22%] h-64 w-[42%] rotate-[-18deg] bg-[#0057FF]/10" />
    <div className="relative mx-auto max-w-[1440px] px-6 py-14 md:px-10 lg:px-14">
      <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_.7fr_.7fr_1fr]">
        <div data-reveal>
          <Image src="/brand/logos/svg/thaspect-primary-dark.svg" alt="ThAspect Streetwear" width={670} height={240} className="h-auto w-[220px]" />
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/55">
            Streetwear autoral brasileiro construído a partir de perspectiva, ângulos, movimento e expressão individual.
          </p>
          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0057FF]">Find Another Side of You.</p>
        </div>

        <div data-reveal>
          <p className="text-[10px] font-black uppercase tracking-[0.18em]">Shop</p>
          <div className="mt-5 flex flex-col gap-3 text-xs text-white/55">
            <Link href="/?categoria=camisetas#catalogo" className="hover:text-white">Camisetas</Link>
            <Link href="/?categoria=hoodies#catalogo" className="hover:text-white">Moletons</Link>
            <Link href="/?categoria=calcas#catalogo" className="hover:text-white">Calças</Link>
            <Link href="/?categoria=acessorios#catalogo" className="hover:text-white">Acessórios</Link>
          </div>
        </div>

        <div data-reveal>
          <p className="text-[10px] font-black uppercase tracking-[0.18em]">Atendimento</p>
          <div className="mt-5 flex flex-col gap-3 text-xs text-white/55">
            <span>Trocas e devoluções</span>
            <span>Guia de medidas</span>
            <span>Rastrear pedido</span>
            <span>Contato</span>
          </div>
        </div>

        <div data-reveal>
          <p className="text-[10px] font-black uppercase tracking-[0.18em]">Insider access</p>
          <p className="mt-5 text-xs leading-5 text-white/50">Drops, editoriais e novos ângulos antes do lançamento público.</p>
          <div className="mt-5 border-l-2 border-[#FF6A00] bg-white/[.04] px-4 py-3">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-white/75">Canal insider em preparação</p>
            <p className="mt-1 text-[9px] leading-4 text-white/35">A captura de e-mail será ativada junto ao backend de marketing.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-7 text-[9px] uppercase tracking-[0.16em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} ThAspect. Todos os direitos reservados.</span>
        <span>São Paulo · Brasil · Worldwide</span>
      </div>
    </div>
  </footer>
);
