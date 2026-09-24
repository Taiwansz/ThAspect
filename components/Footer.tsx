"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Footer: React.FC = () => (
  <footer id="manifesto" className="bg-[#0E0E0E] text-white">
    <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-10 lg:px-14">
      <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_.7fr_.7fr_1fr]">
        <div>
          <div className="relative h-12 w-48">
            <Image src="/brand/logos/svg/thaspect-one-color-white.svg" alt="ThAspect" fill className="object-contain object-left" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/55">
            Streetwear autoral brasileiro construído a partir de perspectiva, ângulos, movimento e expressão individual.
          </p>
          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0057FF]">Find Another Side of You.</p>
        </div>

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em]">Shop</p>
          <div className="mt-5 flex flex-col gap-3 text-xs text-white/55">
            <Link href="#catalogo" className="hover:text-white">Camisetas</Link>
            <Link href="#catalogo" className="hover:text-white">Moletons</Link>
            <Link href="#catalogo" className="hover:text-white">Calças</Link>
            <Link href="#catalogo" className="hover:text-white">Acessórios</Link>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em]">Atendimento</p>
          <div className="mt-5 flex flex-col gap-3 text-xs text-white/55">
            <span>Trocas e devoluções</span>
            <span>Guia de medidas</span>
            <span>Rastrear pedido</span>
            <span>Contato</span>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em]">Insider access</p>
          <p className="mt-5 text-xs leading-5 text-white/50">Receba drops e lançamentos antes de todo mundo.</p>
          <form onSubmit={(event) => event.preventDefault()} className="mt-4 flex">
            <input aria-label="E-mail" type="email" placeholder="seu@email.com" className="h-11 min-w-0 flex-1 border border-white/20 bg-transparent px-3 text-xs outline-none focus:border-[#0057FF]" />
            <button className="h-11 bg-white px-4 text-[10px] font-black uppercase tracking-[0.12em] text-[#111]">Entrar</button>
          </form>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-7 text-[9px] uppercase tracking-[0.16em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} ThAspect. Todos os direitos reservados.</span>
        <span>São Paulo · Brasil · Worldwide</span>
      </div>
    </div>
  </footer>
);
