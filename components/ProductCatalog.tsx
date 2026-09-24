"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Heart, Plus, X } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  product: Product;
  onOpen: (product: Product) => void;
  onAdd: (product: Product) => void;
};

const ProductCard = ({ product, onOpen, onAdd }: ProductCardProps) => (
  <article className="group min-w-0">
    <div className="relative aspect-[4/5] overflow-hidden bg-[#F3F0EB]">
      {product.badge ? (
        <span className="absolute left-3 top-3 z-10 bg-[#0057FF] px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-white">
          {product.badge}
        </span>
      ) : null}
      <button
        type="button"
        aria-label={`Favoritar ${product.name}`}
        className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white"
      >
        <Heart className="h-4 w-4" strokeWidth={1.5} />
      </button>
      <button type="button" onClick={() => onOpen(product)} className="absolute inset-0 z-[1]" aria-label={`Ver detalhes de ${product.name}`} />
      <Image
        src={product.angleView.frontal}
        alt={product.name}
        fill
        sizes="(max-width: 640px) 82vw, (max-width: 1024px) 40vw, 20vw"
        className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.035]"
      />
      <button
        type="button"
        onClick={() => onAdd(product)}
        aria-label={`Adicionar ${product.name} à sacola`}
        className="absolute bottom-3 right-3 z-10 grid h-9 w-9 place-items-center bg-[#111] text-white transition-colors hover:bg-[#0057FF]"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
    <div className="pt-3">
      <p className="text-[12px] font-bold uppercase leading-5 tracking-[-0.01em]">{product.name}</p>
      <p className="text-[10px] text-black/45">{product.colorName} · {product.category === "hoodies" ? "Oversized" : product.category}</p>
      <div className="mt-1 flex items-end justify-between gap-3">
        <div>
          <p className="text-[13px] font-black">R$ {product.price.toFixed(2).replace(".", ",")}</p>
          {product.originalPrice ? <p className="text-[10px] text-black/35 line-through">R$ {product.originalPrice.toFixed(2).replace(".", ",")}</p> : null}
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full border border-black/20 bg-[#111]" />
          <span className="h-2.5 w-2.5 rounded-full border border-black/20 bg-[#FAF8F3]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#0057FF]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF6A00]" />
        </div>
      </div>
    </div>
  </article>
);

export const ProductCatalog: React.FC = () => {
  const { addItem } = useCart();
  const [showAll, setShowAll] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const featuredIds = new Set(["prod-01", "prod-02", "prod-06", "prod-07", "prod-09"]);
  const products = showAll ? PRODUCTS : PRODUCTS.filter((product) => featuredIds.has(product.id));

  const addDefault = (product: Product) => addItem(product, product.sizes[0], 1);

  return (
    <section id="catalogo" className="bg-white py-12 sm:py-14">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-10">
        <div className="mb-7 flex items-end justify-between gap-6">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="h-[3px] w-7 bg-[#FF6A00]" />
              <span className="text-[10px] font-black uppercase tracking-[0.24em]">Coleção</span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl">Em destaque</h2>
            <p className="mt-2 max-w-xl text-xs text-black/48">Peças que representam movimento, perspectiva e atitude.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="hidden items-center gap-3 border-b border-black pb-1 text-[10px] font-black uppercase tracking-[0.14em] sm:flex"
          >
            {showAll ? "Ver destaques" : "Ver todos"} <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className={showAll ? "grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : "grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-5"}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onOpen={setActiveProduct} onAdd={addDefault} />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          className="mt-9 inline-flex items-center gap-3 border-b border-black pb-1 text-[10px] font-black uppercase tracking-[0.14em] sm:hidden"
        >
          {showAll ? "Ver destaques" : "Ver todos"} <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {activeProduct ? (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative grid w-full max-w-4xl overflow-hidden bg-[#FAF8F3] shadow-2xl md:grid-cols-2">
            <button
              type="button"
              onClick={() => setActiveProduct(null)}
              aria-label="Fechar detalhes"
              className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-white shadow"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="relative min-h-[380px] bg-[#F0ECE5]">
              <Image src={activeProduct.angleView.frontal} alt={activeProduct.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-7" />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0057FF]">{activeProduct.collection}</p>
              <h3 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em]">{activeProduct.name}</h3>
              <p className="mt-4 text-sm leading-6 text-black/60">{activeProduct.description}</p>
              <ul className="mt-5 space-y-2 text-xs text-black/55">
                {activeProduct.details.slice(0, 3).map((detail) => <li key={detail}>— {detail}</li>)}
              </ul>
              <div className="mt-7 flex items-center justify-between gap-4 border-t border-black/10 pt-6">
                <span className="text-2xl font-black">R$ {activeProduct.price.toFixed(2).replace(".", ",")}</span>
                <button
                  type="button"
                  onClick={() => { addDefault(activeProduct); setActiveProduct(null); }}
                  className="bg-[#111] px-5 py-3 text-[10px] font-black uppercase tracking-[0.13em] text-white transition-colors hover:bg-[#0057FF]"
                >
                  Adicionar à sacola
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};
