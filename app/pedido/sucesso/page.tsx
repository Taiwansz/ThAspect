import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-[#FAF8F3] px-6 py-20">
      <div className="w-full max-w-xl border border-black/10 bg-white p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,.08)] sm:p-12">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#0057FF] text-white">
          <Check className="h-7 w-7" />
        </div>
        <p className="mt-6 text-[9px] font-black uppercase tracking-[0.22em] text-[#FF6A00]">Pagamento recebido</p>
        <h1 className="mt-3 text-4xl font-black uppercase leading-[.92] tracking-[-.05em]">Novo ângulo.<br />Pedido confirmado.</h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-black/55">
          Se o pagamento foi concluído no checkout seguro, você receberá os dados de confirmação pelo canal informado durante a compra.
        </p>
        <Link href="/#catalogo" className="mt-8 inline-flex h-12 items-center gap-3 bg-[#111] px-6 text-[10px] font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#0057FF]">
          Continuar explorando <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
