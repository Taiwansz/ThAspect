import { BadgeCheck, Gem, LockKeyhole, RefreshCcw } from "lucide-react";

const items = [
  { icon: Gem, title: "Design autoral", text: "Identidade única." },
  { icon: BadgeCheck, title: "Qualidade premium", text: "Conforto e durabilidade." },
  { icon: RefreshCcw, title: "Troca fácil", text: "Sem complicação." },
  { icon: LockKeyhole, title: "Pagamento seguro", text: "Seus dados protegidos." },
];

export const BenefitsStrip = () => (
  <section className="border-b border-black/10 bg-white">
    <div className="mx-auto grid max-w-[1440px] grid-cols-2 md:grid-cols-4">
      {items.map(({ icon: Icon, title, text }, index) => (
        <div
          key={title}
          className={`flex min-h-[86px] items-center gap-4 px-5 py-5 md:px-7 ${index > 0 ? "border-l border-black/10" : ""}`}
        >
          <Icon className="h-6 w-6 shrink-0" strokeWidth={1.6} />
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.13em]">{title}</p>
            <p className="mt-1 text-[11px] text-black/55">{text}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);
