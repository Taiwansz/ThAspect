"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const AntigoFooter: React.FC = () => {
  return (
    <footer id="manifesto" className="bg-[#1F1F1F] text-[#FAF8F3] border-t border-[#333]">
      {/* Top Graphic Statement */}
      <div className="border-b border-[#333] py-16 bg-[#181818]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono text-[#0057FF] uppercase tracking-widest block mb-2 font-bold">
                MANIFESTO THASPECT
              </span>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#FAF8F3] leading-tight">
                MODA TAMBÉM É PERSPECTIVA.
                <br />
                <span className="text-[#E8DFD1]">FIND ANOTHER SIDE OF YOU.</span>
              </h3>
              <p className="mt-4 text-sm text-[#AAA] max-w-2xl font-mono leading-relaxed">
                Nascida da convergencia entre arquitetura, geometria urbana e design de vestuario.
                Acreditamos que uma peca de roupa e um ponto de vista materializado. Quando o angulo
                muda, toda a sua presenca se ressignifica.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
              <div className="p-6 bg-[#242424] border border-[#333] rounded-sm w-full max-w-sm">
                <span className="text-xs font-mono font-bold text-[#FF6A00] block mb-2 uppercase">
                  INSIDER ACCESS // NEWSLETTER
                </span>
                <p className="text-xs text-[#AAA] mb-4">
                  Receba acesso antecipado a novos drops e tiragens limitadas 24 horas antes do lancamento geral.
                </p>
                <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full bg-[#181818] border border-[#444] px-3 py-2 text-xs text-[#FAF8F3] focus:outline-none focus:border-[#0057FF]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0057FF] text-[#FAF8F3] text-xs font-mono font-bold hover:bg-[#FAF8F3] hover:text-[#1F1F1F] transition-colors whitespace-nowrap"
                  >
                    ENTRAR
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Identity Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative h-10 w-48">
              <Image
                src="/brand/logos/svg/thaspect-one-color-white.svg"
                alt="ThAspect White Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-xs text-[#888] font-mono max-w-sm leading-relaxed">
              Streetwear contemporaneo brasileiro projetado sob diretrizes de corte angular,
              materiais pesados e identidade visual proprietaria.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-mono text-[#AAA]">
              <span className="w-2 h-2 bg-[#0057FF]" />
              <span>SAO PAULO / BRASIL</span>
            </div>
          </div>

          {/* Links Column 1: Navegacao */}
          <div>
            <h4 className="text-xs font-mono font-bold text-[#FAF8F3] tracking-widest uppercase mb-4">
              NAVEGAÇÃO
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-[#AAA]">
              <li>
                <Link href="#catalogo" className="hover:text-[#0057FF] transition-colors">
                  Colecao Drop 01
                </Link>
              </li>
              <li>
                <Link href="#drops" className="hover:text-[#0057FF] transition-colors">
                  Calendario de Drops
                </Link>
              </li>
              <li>
                <Link href="#lookbook" className="hover:text-[#0057FF] transition-colors">
                  Laboratorio de Angulos
                </Link>
              </li>
              <li>
                <Link href="#heritage" className="hover:text-[#0057FF] transition-colors">
                  Linhagem V1 / CS-Vault
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Atendimento */}
          <div>
            <h4 className="text-xs font-mono font-bold text-[#FAF8F3] tracking-widest uppercase mb-4">
              SUPORTE & GUIA
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-[#AAA]">
              <li>
                <span className="hover:text-[#0057FF] cursor-pointer">
                  Tabela de Medidas Oversized
                </span>
              </li>
              <li>
                <span className="hover:text-[#0057FF] cursor-pointer">
                  Politica de Trocas e Devolucoes
                </span>
              </li>
              <li>
                <span className="hover:text-[#0057FF] cursor-pointer">
                  Cuidados com a Lavagem
                </span>
              </li>
              <li>
                <span className="hover:text-[#0057FF] cursor-pointer">
                  Rastreamento de Encomendas
                </span>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Engenharia */}
          <div>
            <h4 className="text-xs font-mono font-bold text-[#FAF8F3] tracking-widest uppercase mb-4">
              ENGENHARIA
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-[#AAA]">
              <li className="flex items-center gap-1">
                <span>Next.js 15 App Router</span>
                <span className="text-[10px] text-[#0057FF] font-bold">Vercel Ready</span>
              </li>
              <li>
                <span>Tailwind CSS Engine v4</span>
              </li>
              <li>
                <span>MySQL ThAspectDB Schema</span>
              </li>
              <li>
                <a
                  href="https://github.com/Taiwansz/ThAspect"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#0057FF] flex items-center gap-1"
                >
                  <span>GitHub Repositório</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits Bar */}
        <div className="mt-16 pt-8 border-t border-[#333] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#777] gap-4">
          <div>
            © {new Date().getFullYear()} ThAspect. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>CHARCOAL · OFF WHITE · SAND · COBALT · ORANGE</span>
            <span>|</span>
            <span className="text-[#0057FF] font-bold">DEPLOYED ON VERCEL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
