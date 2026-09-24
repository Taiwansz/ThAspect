"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, Layers, Compass, Sparkles } from "lucide-react";

export const AntigoPerspectiveViewer: React.FC = () => {
  const [activeAngle, setActiveAngle] = useState<"frontal" | "angle24" | "angle45" | "macro">("angle24");

  const angleConfigs = {
    frontal: {
      label: "FRONTAL // 00°",
      deg: "0°",
      description: "Visao plana simetrica. A estrutura essencial do corte oversized sem distorcao.",
      transformStyle: "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)",
      coordinates: { x: "0.00°", y: "0.00°", z: "1.00", fov: "50mm" },
      image: "/brand/templates/product-card-1200.svg",
    },
    angle24: {
      label: "PERSPECTIVA CANONICA // 24°",
      deg: "24°",
      description: "O angulo oficial da marca. Revela o caimento lateral, as costuras inclinadas e a profundidade visual.",
      transformStyle: "perspective(1000px) rotateY(-24deg) rotateX(10deg) scale(1.05)",
      coordinates: { x: "-24.00°", y: "10.00°", z: "1.05", fov: "35mm" },
      image: "/brand/templates/website-hero-1440.svg",
    },
    angle45: {
      label: "ANAMORFICO // 45°",
      deg: "45°",
      description: "Ruptura geometrica máxima. A tipografia e a arte gráfica se expandem em fuga dimensional.",
      transformStyle: "perspective(1000px) rotateY(45deg) rotateX(15deg) scale(1.1)",
      coordinates: { x: "45.00°", y: "15.00°", z: "1.10", fov: "24mm" },
      image: "/brand/templates/social-post-1080.svg",
    },
    macro: {
      label: "DETALHE ESTRUTURAL // MACRO",
      deg: "90°",
      description: "Foco na densidade do algodao 260g/m2, nos acabamentos duplos e nas etiquetas emborrachadas.",
      transformStyle: "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.3)",
      coordinates: { x: "0.00°", y: "0.00°", z: "1.30", fov: "85mm" },
      image: "/brand/templates/hangtag-600x1000.svg",
    },
  };

  const current = angleConfigs[activeAngle];

  return (
    <section id="lookbook" className="py-24 bg-[#1F1F1F] text-[#FAF8F3] overflow-hidden relative border-y border-[#333]">
      {/* Background Architectural Grid Accent */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "url('/brand/graphics/patterns/pattern-grid.svg')",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-[#333]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#0057FF] uppercase mb-2">
              <Compass className="w-4 h-4 text-[#FF6A00]" />
              <span>LABORATÓRIO ÓPTICO // LOOKBOOK INTERATIVO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#FAF8F3]">
              O MESMO OBJETO. OUTRO ÂNGULO.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm font-mono text-[#AAA] max-w-sm">
            “Moda também é perspectiva.” Alterne os pontos de observação abaixo para
            experimentar a tridimensionalidade das peças.
          </p>
        </div>

        {/* Interactive Viewer Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls & Telemetry Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="text-xs font-mono text-[#888] uppercase tracking-widest">
              SELECIONE O PLANO DE OBSERVAÇÃO:
            </div>

            {/* Angle Selectors */}
            <div className="flex flex-col gap-3">
              {(Object.keys(angleConfigs) as (keyof typeof angleConfigs)[]).map((key) => {
                const conf = angleConfigs[key];
                const isActive = activeAngle === key;

                return (
                  <button
                    key={key}
                    onClick={() => setActiveAngle(key)}
                    className={`p-4 text-left transition-all duration-200 border rounded-sm flex flex-col gap-1 relative ${
                      isActive
                        ? "bg-[#2A2A2A] border-[#0057FF] text-[#FAF8F3] shadow-lg"
                        : "bg-[#161616] border-[#2A2A2A] text-[#888] hover:border-[#444] hover:text-[#FAF8F3]"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute right-4 top-4 w-2 h-2 bg-[#FF6A00]" />
                    )}
                    <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider">
                      <span>{conf.label}</span>
                      <span className="text-[#0057FF]">{conf.deg}</span>
                    </div>
                    <p className="text-xs text-[#AAA] mt-1 leading-relaxed">
                      {conf.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Telemetry Matrix Display */}
            <div className="p-4 bg-[#141414] border border-[#2A2A2A] text-xs font-mono text-[#888] rounded-sm">
              <div className="flex items-center justify-between pb-2 border-b border-[#222] text-[#FAF8F3] font-bold">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#0057FF]" />
                  TELEMETRIA PERSPECTIVA
                </span>
                <span className="text-[10px] text-[#0057FF]">ONLINE</span>
              </div>
              <div className="grid grid-cols-2 gap-y-2 pt-3 text-[11px]">
                <div>PITCH (X): <span className="text-[#FAF8F3] font-bold">{current.coordinates.x}</span></div>
                <div>YAW (Y): <span className="text-[#FAF8F3] font-bold">{current.coordinates.y}</span></div>
                <div>ESCALA (Z): <span className="text-[#FAF8F3] font-bold">{current.coordinates.z}</span></div>
                <div>LENTE (FOV): <span className="text-[#FAF8F3] font-bold">{current.coordinates.fov}</span></div>
              </div>
            </div>
          </div>

          {/* 3D Stage Column (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative h-[420px] sm:h-[500px] w-full bg-[#121212] rounded-sm border border-[#333] flex items-center justify-center p-8 overflow-hidden shadow-2xl">
              
              {/* Background Geometry and Perspective Rays */}
              <div
                className="absolute inset-0 bg-[#0057FF] opacity-15"
                style={{
                  clipPath: "polygon(0 0, 100% 20%, 80% 100%, 20% 80%)",
                }}
              />

              {/* Central Transform Object Container */}
              <div
                className="relative w-72 sm:w-96 h-72 sm:h-96 transition-all duration-700 ease-out shadow-2xl"
                style={{
                  transform: current.transformStyle,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="w-full h-full relative rounded border-2 border-[#0057FF]/40 bg-[#FAF8F3] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                  <Image
                    src={current.image}
                    alt={current.label}
                    fill
                    className="object-contain p-4"
                  />
                  {/* Perspective Crosshair Indicator */}
                  <div className="absolute top-2 left-2 text-[9px] font-mono text-[#1F1F1F] bg-[#FAF8F3]/90 px-1.5 py-0.5 border border-[#1F1F1F]">
                    {current.label}
                  </div>
                </div>
              </div>

              {/* Visual Legend Overlay */}
              <div className="absolute bottom-4 left-4 text-[11px] font-mono text-[#777] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0057FF]"></span>
                <span>RENDERIZACAO GEOMETRICA EM TEMPO REAL</span>
              </div>
              <div className="absolute bottom-4 right-4 text-[11px] font-mono text-[#FF6A00] font-bold">
                FIND ANOTHER SIDE OF YOU
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
