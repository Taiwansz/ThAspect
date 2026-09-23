import React from "react";

export const PerspectiveMarquee: React.FC = () => {
  const statements = [
    "MODA TAMBEM E PERSPECTIVA",
    "FIND ANOTHER SIDE OF YOU",
    "DIFERENTES ANGULOS. A MESMA ESSENCIA.",
    "DROP 01 // URBAN ARCHITECTURE",
    "VISTA O SEU PONTO DE VISTA",
    "STREETWEAR SEM CLICHE",
    "ESTRUTURA CHARCOAL & VISÃO COBALT",
  ];

  return (
    <div className="relative overflow-hidden bg-[#1F1F1F] py-4 border-y border-[#333] transform -skew-y-1 my-4">
      <div className="flex w-max animate-marquee space-x-8">
        {[...statements, ...statements].map((phrase, idx) => (
          <div key={idx} className="flex items-center space-x-6 text-[#FAF8F3] whitespace-nowrap">
            <span className="font-heading font-extrabold text-sm sm:text-base tracking-widest uppercase">
              {phrase}
            </span>
            <span className="inline-block w-2.5 h-2.5 bg-[#0057FF] transform rotate-45" />
            <span className="text-[11px] font-mono text-[#FF6A00]">///</span>
          </div>
        ))}
      </div>
    </div>
  );
};
