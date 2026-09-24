"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Maximize2 } from "lucide-react";

export const AntigoHero: React.FC = () => {
  const [activeAngle, setActiveAngle] = useState<"12" | "24" | "30" | "45">("24");

  return (
    <section className="relative overflow-hidden bg-[#FAF8F3] border-b border-[#E8DFD1]">
      {/* Background Architectural Split & Perspective Geometry */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Sand Split Background */}
        <div className="absolute right-0 top-0 w-full lg:w-[46%] h-full bg-[#E8DFD1]/60" />
        
        {/* Cobalt Perspective Slash */}
        <div
          className="absolute right-0 top-0 w-[55%] lg:w-[38%] h-72 bg-[#0057FF] opacity-95 transition-all duration-700"
          style={{
            clipPath: "polygon(40% 0, 100% 0, 100% 70%, 0% 100%)",
          }}
        />

        {/* Orange Accent Geometric Wedge */}
        <div
          className="absolute right-12 bottom-12 w-48 h-36 bg-[#FF6A00] opacity-90 hidden sm:block"
          style={{
            clipPath: "polygon(20% 0%, 100% 30%, 80% 100%, 0% 80%)",
          }}
        />

        {/* Perspective Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url('/antigo/brand/graphics/patterns/pattern-grid.svg')",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Statement & Typography */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Perspective Coordinates Pill */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-[#E8DFD1] text-[#1F1F1F] text-xs font-mono font-bold tracking-wider mb-6 border-l-4 border-[#0057FF]">
              <Compass className="w-3.5 h-3.5 text-[#0057FF]" />
              <span>ANGULO DE ATAQUE: {activeAngle} DEG</span>
              <span className="text-[#888]">/</span>
              <span className="text-[#0057FF]">DROP 01 INITIALIZED</span>
            </div>

            {/* Core Manifesto Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#1F1F1F] leading-[1.05] tracking-tight uppercase">
              MAIS QUE ROUPAS,
              <br />
              <span className="text-[#0057FF] relative inline-block">
                NOVAS PERSPECTIVAS.
                {/* Decorative underline slash */}
                <span className="absolute -bottom-1 left-0 w-full h-1.5 bg-[#FF6A00]" />
              </span>
            </h1>

            {/* Narrative Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-[#333] max-w-xl font-normal leading-relaxed">
              Streetwear de alta gramatura construida a partir de geometria urbana,
              recortes angulares e visao direcional. O mesmo mundo se transforma quando voce
              muda o seu angulo de observacao.
            </p>

            {/* Micro-Values Strip */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-[#555] uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#0057FF]"></span>
                Algodao 260g/m2 a 450g/m2
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#FF6A00]"></span>
                Recortes 24 e 45 graus
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#1F1F1F]"></span>
                Tiragens Numeradas
              </span>
            </div>

            {/* Action CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                href="#catalogo"
                className="px-8 py-4 bg-[#0057FF] text-[#FAF8F3] text-sm font-bold tracking-widest uppercase text-center rounded-sm perspective-hover flex items-center justify-center gap-3 group border border-[#0057FF]"
              >
                <span>VER COLECAO</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link
                href="#lookbook"
                className="px-8 py-4 bg-transparent hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#FAF8F3] border-2 border-[#1F1F1F] text-sm font-bold tracking-widest uppercase text-center rounded-sm transition-all duration-200"
              >
                EXPLORAR ANGULOS
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Perspective Card */}
          <div className="lg:col-span-5 relative">
            {/* Framed Graphic Centerpiece */}
            <div className="relative bg-[#1F1F1F] text-[#FAF8F3] p-8 rounded-sm shadow-2xl border border-[#333] perspective-hover-cobalt">
              {/* Top Bar of the Card */}
              <div className="flex items-center justify-between pb-6 border-b border-[#333]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#FF6A00] rounded-full"></span>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#FAF8F3]">
                    THASPECT // SPEC 01
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#0057FF] bg-[#0057FF]/20 px-2 py-0.5 border border-[#0057FF]">
                  AUTHENTIC
                </span>
              </div>

              {/* Graphic Stage with Dynamic Perspective Tilt */}
              <div className="relative my-8 h-64 sm:h-72 w-full bg-[#141414] rounded overflow-hidden flex items-center justify-center border border-[#222]">
                {/* Background Grid Accent */}
                <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                  <Image
                    src="/antigo/brand/graphics/svg/perspective-grid.svg"
                    alt="Grid"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Perspective Monogram Graphic */}
                <div
                  className="relative w-48 h-48 transition-all duration-500 transform"
                  style={{
                    transform:
                      activeAngle === "12"
                        ? "rotate(12deg) scale(0.95)"
                        : activeAngle === "24"
                        ? "rotate(24deg) scale(1)"
                        : activeAngle === "30"
                        ? "rotate(30deg) scale(1.05)"
                        : "rotate(45deg) scale(1.1)",
                  }}
                >
                  <Image
                    src="/antigo/brand/logos/svg/thaspect-monogram.svg"
                    alt="ThAspect Perspective Monogram"
                    fill
                    className="object-contain drop-shadow-[0_15px_15px_rgba(0,87,255,0.3)]"
                  />
                </div>

                {/* Corner Coordinates */}
                <div className="absolute top-3 left-3 text-[10px] font-mono text-[#666]">
                  X: 24.890° // Y: 12.440°
                </div>
                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#0057FF]">
                  FOV: PERSPECTIVE_V1
                </div>
              </div>

              {/* Angle Selector Tabs */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#888] mb-2">
                  <span>CONTROLE DE ANGULO:</span>
                  <span className="text-[#FAF8F3] font-bold">{activeAngle}°</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {(["12", "24", "30", "45"] as const).map((angle) => (
                    <button
                      key={angle}
                      onClick={() => setActiveAngle(angle)}
                      className={`py-2 text-xs font-mono font-bold transition-all ${
                        activeAngle === angle
                          ? "bg-[#0057FF] text-[#FAF8F3] shadow-md border-b-2 border-[#FF6A00]"
                          : "bg-[#252525] text-[#888] hover:text-[#FAF8F3] hover:bg-[#303030]"
                      }`}
                    >
                      {angle}°
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-[#333] flex items-center justify-between text-xs font-mono text-[#888]">
                <span>CONCEITO: FIND ANOTHER SIDE</span>
                <span className="text-[#E8DFD1]">COBALT & CHARCOAL</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
