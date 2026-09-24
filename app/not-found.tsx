import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="grid min-h-[65vh] place-items-center bg-[#111] px-6 text-center text-white">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF6A00]">404 / Perspective lost</p>
        <h1 className="mt-4 text-5xl font-black uppercase leading-[.9] tracking-[-.06em] sm:text-7xl">Esse ângulo<br />não existe.</h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-white/55">A rota mudou de perspectiva. Volte para a coleção e encontre outro lado.</p>
        <Link href="/#catalogo" className="mt-8 inline-flex h-12 items-center gap-3 bg-white px-6 text-[10px] font-black uppercase tracking-[0.15em] text-[#111] hover:bg-[#0057FF] hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Voltar à coleção
        </Link>
      </div>
    </section>
  );
}
