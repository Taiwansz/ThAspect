import { BadgeCheck, Gem, LockKeyhole, RefreshCcw } from "lucide-react";

const items = [
  { icon: Gem, title: "Design autoral", text: "Identidade única." },
  { icon: BadgeCheck, title: "Qualidade premium", text: "Conforto e durabilidade." },
  { icon: RefreshCcw, title: "Troca fácil", text: "Sem complicação." },
  { icon: LockKeyhole, title: "Pagamento seguro", text: "Checkout protegido." },
];

export const BenefitsStrip = () => (
  <section className="border-b border-black/10 bg-white">
    <div className="mx-auto grid max-w-[1440px] grid-cols-2 md:grid-cols-4">
      {items.map(({ icon: Icon, title, text }, index) => (
        <div
          key={title}
          data-reveal
          className={`group flex min-h-[92px] items-center gap-4 px-5 py-5 transition-colors hover:bg-[#FAF8F3] md:px-7 ${index > 0 ? "border-l border-black/10" : ""}`}
        >
          <div className="grid h-10 w-10 shrink-0 place-items-center border border-black/10 transition-all duration-300 group-hover:-rotate-3 group-hover:border-[#0057FF] group-hover:text-[#0057FF]">
            <Icon className="h-5 w-5" strokeWidth={1.55} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.13em]">{title}</p>
            <p className="mt-1 text-[11px] text-black/50">{text}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);
