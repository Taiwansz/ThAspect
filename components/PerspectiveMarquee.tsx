import React from "react";

export const PerspectiveMarquee: React.FC = () => {
  const statements = [
    "MODA TAMBÉM É PERSPECTIVA",
    "FIND ANOTHER SIDE OF YOU",
    "DIFERENTES ÂNGULOS. A MESMA ESSÊNCIA.",
    "DROP 01 // URBAN ARCHITECTURE",
    "VISTA O SEU PONTO DE VISTA",
  ];

  return (
    <div className="marquee-shell relative overflow-hidden border-y border-[#333] bg-[#1F1F1F] py-4">
      <div className="marquee-track flex w-max gap-8">
        {[...statements, ...statements].map((phrase, idx) => (
          <div key={idx} className="flex items-center gap-6 whitespace-nowrap text-[#FAF8F3]">
            <span className="font-heading text-sm font-extrabold uppercase tracking-[0.16em] sm:text-base">{phrase}</span>
            <span className="inline-block h-2.5 w-2.5 rotate-45 bg-[#0057FF]" />
            <span className="text-[11px] font-mono text-[#FF6A00]">///</span>
          </div>
        ))}
      </div>
    </div>
  );
};
