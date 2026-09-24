"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Heart, Ruler } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Product, PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

const formatPrice = (value: number) => `R$ ${value.toFixed(2).replace(".", ",")}`;

export const ProductDetailClient = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("thaspect_favorites") || "[]") as string[];
      setFavorite(saved.includes(product.id));
    } catch {
      setFavorite(false);
    }
  }, [product.id]);

  const related = useMemo(
    () => PRODUCTS.filter((item) => item.id !== product.id && (item.category === product.category || item.collection === product.collection)).slice(0, 4),
    [product]
  );

  const toggleFavorite = () => {
    setFavorite((value) => {
      const nextValue = !value;
      try {
        const saved = new Set(JSON.parse(localStorage.getItem("thaspect_favorites") || "[]") as string[]);
        if (nextValue) saved.add(product.id);
        else saved.delete(product.id);
        localStorage.setItem("thaspect_favorites", JSON.stringify(Array.from(saved)));
      } catch {
        // Storage indisponível.
      }
      return nextValue;
    });
  };

  const add = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="bg-[#FAF8F3]">
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-7 md:px-8 lg:px-10">
        <div className="mb-7 flex items-center justify-between gap-4">
          <Link href="/#catalogo" className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.14em] text-black/50 transition-colors hover:text-[#0057FF]">
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar à coleção
          </Link>
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-black/30">ThAspect / {product.id.toUpperCase()}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-14">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="relative col-span-full aspect-[5/4] overflow-hidden bg-[#EFEBE4]" data-reveal>
              <div className="absolute left-[-8%] top-[11%] h-4 w-[45%] rotate-[-24deg] bg-[#0057FF]" />
              <div className="absolute bottom-[10%] right-[-5%] h-3 w-[38%] rotate-[12deg] bg-[#FF6A00]" />
              <Image src={product.angleView.frontal} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-contain p-8 sm:p-12 lg:p-16" />
              <span className="absolute bottom-5 left-5 text-[8px] font-black uppercase tracking-[0.22em] text-black/36">01 / Main perspective</span>
            </div>

            <div className="relative aspect-square overflow-hidden bg-[#111]" data-reveal>
              <Image src={product.angleView.angular} alt={`Detalhe de ${product.name}`} fill sizes="(max-width: 640px) 100vw, 28vw" className="scale-[1.35] object-contain p-8 opacity-90" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,.42)_100%)]" />
              <span className="absolute bottom-4 left-4 text-[8px] font-black uppercase tracking-[0.2em] text-white/45">02 / Detail crop</span>
            </div>

            <div className="relative aspect-square overflow-hidden bg-[#E8DFD1]" data-reveal>
              <Image src="/products/hero-lifestyle.jpg" alt="Universo visual ThAspect" fill sizes="(max-width: 640px) 100vw, 28vw" className="object-cover object-[68%_center]" />
              <div className="absolute inset-0 bg-[#0057FF]/10 mix-blend-multiply" />
              <span className="absolute bottom-4 left-4 text-[8px] font-black uppercase tracking-[0.2em] text-white">03 / Lifestyle context</span>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start" data-reveal>
            <div className="border-b border-black/10 pb-6">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0057FF]">{product.collection}</p>
                  <h1 className="mt-3 text-4xl font-black uppercase leading-[.92] tracking-[-.055em] sm:text-5xl">{product.name}</h1>
                </div>
                <button
                  type="button"
                  onClick={toggleFavorite}
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors ${favorite ? "border-[#FF6A00] bg-[#FF6A00] text-white" : "border-black/12 bg-white hover:border-black"}`}
                  aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                  <Heart className="h-4.5 w-4.5" fill={favorite ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="mt-6 flex items-end gap-3">
                <span className="text-2xl font-black">{formatPrice(product.price)}</span>
                {product.originalPrice ? <span className="pb-1 text-xs text-black/35 line-through">{formatPrice(product.originalPrice)}</span> : null}
              </div>
              <p className="mt-1 text-[10px] text-black/45">6x de {formatPrice(product.price / 6)} sem juros</p>
            </div>

            <p className="mt-6 text-sm leading-7 text-black/62">{product.description}</p>

            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.16em]">Tamanho</span>
                <button type="button" className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-black/45 hover:text-black">
                  <Ruler className="h-3.5 w-3.5" />
                  Guia de medidas
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 border text-[11px] font-black transition-all ${selectedSize === size ? "border-[#0057FF] bg-[#0057FF] text-white" : "border-black/14 bg-white hover:border-black"}`}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={add}
              disabled={!selectedSize}
              className={`mt-7 flex h-14 w-full items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.16em] text-white transition-all ${added ? "bg-[#0057FF]" : "bg-[#111] hover:bg-[#0057FF]"} disabled:cursor-not-allowed disabled:opacity-35`}
            >
              {added ? <><Check className="h-4 w-4" /> Adicionado</> : selectedSize ? <>Adicionar à sacola <ArrowRight className="h-4 w-4" /></> : "Selecione um tamanho"}
            </button>

            <div className="mt-8 border-t border-black/10 pt-6">
              <p className="text-[9px] font-black uppercase tracking-[0.17em]">Construção</p>
              <ul className="mt-4 grid gap-3">
                {product.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-3 text-xs text-black/58">
                    <span className="h-1.5 w-1.5 rotate-45 bg-[#FF6A00]" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 grid grid-cols-2 border-y border-black/10 py-5 text-[9px] uppercase tracking-[0.12em] text-black/45">
              <div>
                <span className="block font-black text-black">Cor</span>
                <span className="mt-1 block">{product.colorName}</span>
              </div>
              <div className="border-l border-black/10 pl-5">
                <span className="block font-black text-black">Drop</span>
                <span className="mt-1 block">{product.collection}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[#111] px-5 py-16 text-white md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 flex items-end justify-between gap-6" data-reveal>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FF6A00]">Another side</p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-[-.045em] sm:text-5xl">Veja por outro ângulo.</h2>
            </div>
            <Link href="/#catalogo" className="hidden items-center gap-2 text-[9px] font-black uppercase tracking-[0.13em] text-white/55 hover:text-white sm:flex">
              Coleção completa <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((item) => (
              <Link key={item.id} href={`/produto/${item.slug}`} className="group" data-reveal>
                <div className="relative aspect-[4/5] overflow-hidden bg-[#EFEAE3]">
                  <Image src={item.angleView.frontal} alt={item.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04] group-hover:rotate-[.6deg]" />
                </div>
                <p className="mt-3 text-[10px] font-black uppercase tracking-[0.06em]">{item.name}</p>
                <p className="mt-1 text-[10px] text-white/42">{formatPrice(item.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
