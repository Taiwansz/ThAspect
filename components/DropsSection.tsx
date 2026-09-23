import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";

export const DropsSection: React.FC = () => {
  const drops = [
    {
      id: "drop-01",
      title: "DROP 01 // URBAN PERSPECTIVE",
      status: "DISPONIVEL AGORA",
      badgeColor: "bg-[#0057FF]",
      releaseDate: "SETEMBRO 2026",
      desc: "Primeira colecao da marca com camisetas de alta gramatura (260g/m2), cortes angulados de 24 graus e paleta oficial Charcoal, Off White, Sand, Cobalt e Orange.",
      image: "/brand/templates/website-hero-1440.svg",
      active: true,
    },
    {
      id: "drop-02",
      title: "DROP 02 // ANAMORPHIC CUTS",
      status: "EM PRODUCAO",
      badgeColor: "bg-[#FF6A00]",
      releaseDate: "NOVEMBRO 2026",
      desc: "Jaquetas tecnicas em tecidos impermeaveis com ziperes invertidos, capuzes triplos e estampas com distorcao anamorfica calculada para visualizacao sob angulos especificos.",
      image: "/brand/templates/social-story-1080x1920.svg",
      active: false,
    },
    {
      id: "drop-03",
      title: "DROP 03 // TECHNICAL RUNNER",
      status: "EM DESENVOLVIMENTO",
      badgeColor: "bg-[#1F1F1F]",
      releaseDate: "JANEIRO 2027",
      desc: "Linha de alfaiataria utilitaria combinando sarjas tecnologicas, calcadas estruturadas e bolsas modulares com engate rapido magnetico Fidlock.",
      image: "/brand/templates/social-post-1080.svg",
      active: false,
    },
  ];

  return (
    <section id="drops" className="py-24 bg-[#FAF8F3] border-b border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b-2 border-[#1F1F1F]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#FF6A00] uppercase mb-2">
              <Clock className="w-4 h-4 text-[#FF6A00]" />
              <span>CRONOGRAMA DE LANCAMENTOS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1F1F1F] uppercase tracking-tight">
              CALENDÁRIO DE DROPS
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-mono text-[#555] max-w-xs">
            Tiragens limitadas e numeradas. Nenhum drop e reemitido apos o encerramento do estoque.
          </div>
        </div>

        {/* Drops Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {drops.map((drop) => (
            <div
              key={drop.id}
              className={`flex flex-col justify-between p-6 border rounded-sm transition-all duration-300 ${
                drop.active
                  ? "bg-[#FAF8F3] border-[#1F1F1F] shadow-xl perspective-hover"
                  : "bg-[#E8DFD1]/30 border-[#E8DFD1] opacity-85"
              }`}
            >
              <div>
                {/* Visual Stage */}
                <div className="relative h-64 w-full bg-[#1F1F1F] rounded-sm overflow-hidden mb-6 flex items-center justify-center">
                  <Image
                    src={drop.image}
                    alt={drop.title}
                    fill
                    className="object-contain p-2"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2.5 py-1 text-[10px] font-mono font-bold tracking-widest text-[#FAF8F3] ${drop.badgeColor}`}
                    >
                      {drop.status}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-[#0057FF] font-bold mb-1">
                  PREVISAO: {drop.releaseDate}
                </div>

                <h3 className="text-xl font-bold text-[#1F1F1F] uppercase tracking-tight">
                  {drop.title}
                </h3>

                <p className="mt-3 text-xs text-[#555] leading-relaxed">
                  {drop.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E8DFD1] flex items-center justify-between">
                {drop.active ? (
                  <Link
                    href="#catalogo"
                    className="text-xs font-mono font-bold text-[#0057FF] hover:text-[#1F1F1F] flex items-center gap-1.5 transition-colors"
                  >
                    <span>EXPLORAR PEÇAS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="text-xs font-mono text-[#888] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    NOTIFICAÇÃO ATIVA
                  </span>
                )}
                <span className="text-[10px] font-mono text-[#888]">100% EXCLUSIVO</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
