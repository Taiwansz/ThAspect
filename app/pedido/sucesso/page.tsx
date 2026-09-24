import Link from "next/link";
import { Check, ArrowRight, Clock3 } from "lucide-react";

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;
  const secret = process.env.STRIPE_SECRET_KEY;
  let paid = false;

  if (secret && sessionId?.startsWith("cs_")) {
    try {
      const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
        headers: { Authorization: `Bearer ${secret}` },
        cache: "no-store",
      });
      if (response.ok) {
        const session = (await response.json()) as { payment_status?: string };
        paid = session.payment_status === "paid";
      }
    } catch {
      paid = false;
    }
  }

  return (
    <section className="grid min-h-[70vh] place-items-center bg-[#FAF8F3] px-6 py-20">
      <div className="w-full max-w-xl border border-black/10 bg-white p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,.08)] sm:p-12">
        <div className={`mx-auto grid h-16 w-16 place-items-center rounded-full text-white ${paid ? "bg-[#0057FF]" : "bg-[#111]"}`}>
          {paid ? <Check className="h-7 w-7" /> : <Clock3 className="h-7 w-7" />}
        </div>
        <p className="mt-6 text-[9px] font-black uppercase tracking-[0.22em] text-[#FF6A00]">
          {paid ? "Pagamento confirmado" : "Checkout finalizado"}
        </p>
        <h1 className="mt-3 text-4xl font-black uppercase leading-[.92] tracking-[-.05em]">
          {paid ? <>Novo ângulo.<br />Pedido confirmado.</> : <>Estamos validando<br />seu pagamento.</>}
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-black/55">
          {paid
            ? "Seu pagamento foi confirmado pelo provedor seguro. Os dados de atendimento e acompanhamento serão enviados pelo canal informado no checkout."
            : "Quando o provedor de pagamentos confirmar a transação, o pedido passa para processamento."}
        </p>
        <Link href="/#catalogo" className="mt-8 inline-flex h-12 items-center gap-3 bg-[#111] px-6 text-[10px] font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#0057FF]">
          Continuar explorando <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
