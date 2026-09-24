"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Eye, Heart, Search, SlidersHorizontal, X } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

type Category = "todos" | Product["category"];
type SortMode = "destaques" | "menor-preco" | "maior-preco" | "nome";

const CATEGORY_LABELS: Record<Category, string> = {
  todos: "Todos",
  camisetas: "Camisetas",
  hoodies: "Moletons",
  calcas: "Calças",
  acessorios: "Acessórios",
};

const formatPrice = (value: number) => `R$ ${value.toFixed(2).replace(".", ",")}`;

const ProductCard = ({
  product,
  favorite,
  onFavorite,
  onQuickView,
}: {
  product: Product;
  favorite: boolean;
  onFavorite: (product: Product) => void;
  onQuickView: (product: Product) => void;
}) => (
  <article className="product-card group min-w-0" data-reveal>
    <div className="relative aspect-[4/5] overflow-hidden bg-[#F3F0EB]">
      <div aria-hidden="true" className="product-angle-plane" />
      {product.badge ? (
        <span className="absolute left-3 top-3 z-20 bg-[#0057FF] px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-white">
          {product.badge}
        </span>
      ) : null}

      <button
        type="button"
        aria-label={favorite ? `Remover ${product.name} dos favoritos` : `Favoritar ${product.name}`}
        onClick={() => onFavorite(product)}
        className={`absolute right-3 top-3 z-30 grid h-8 w-8 place-items-center rounded-full backdrop-blur-sm transition-all ${favorite ? "bg-[#FF6A00] text-white" : "bg-white/85 text-[#111] hover:bg-white"}`}
      >
        <Heart className="h-4 w-4" strokeWidth={1.6} fill={favorite ? "currentColor" : "none"} />
      </button>

      <Link href={`/produto/${product.slug}`} className="absolute inset-0 z-10" aria-label={`Abrir ${product.name}`}>
        <span className="sr-only">Abrir produto</span>
      </Link>

      <Image
        src={product.angleView.frontal}
        alt={product.name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        className="product-image object-contain p-3"
      />

      <div className="absolute inset-x-3 bottom-3 z-30 flex translate-y-3 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="flex h-10 flex-1 items-center justify-center gap-2 bg-white/95 px-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#111] backdrop-blur-md transition-colors hover:bg-[#0057FF] hover:text-white"
        >
          <Eye className="h-3.5 w-3.5" />
          Quick view
        </button>
        <Link
          href={`/produto/${product.slug}`}
          className="grid h-10 w-10 place-items-center bg-[#111] text-white transition-colors hover:bg-[#FF6A00]"
          aria-label={`Ver ${product.name}`}
        >
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="pointer-events-none absolute bottom-3 left-3 z-20 hidden text-[8px] font-black uppercase tracking-[0.2em] text-black/45 group-hover:block sm:block">
        Outro ângulo →
      </div>
    </div>

    <div className="pt-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link href={`/produto/${product.slug}`} className="block truncate text-[12px] font-bold uppercase leading-5 tracking-[-0.01em] hover:text-[#0057FF]">
            {product.name}
          </Link>
          <p className="truncate text-[10px] text-black/45">{product.colorName} · {product.collection}</p>
        </div>
        <span className="h-3 w-3 shrink-0 rounded-full border border-black/15" style={{ backgroundColor: product.colorHex }} aria-label={product.colorName} />
      </div>

      <div className="mt-2 flex items-end justify-between gap-3">
        <div>
          <p className="text-[13px] font-black">{formatPrice(product.price)}</p>
          {product.originalPrice ? <p className="text-[10px] text-black/35 line-through">{formatPrice(product.originalPrice)}</p> : null}
        </div>
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="text-[9px] font-black uppercase tracking-[0.12em] text-black/45 transition-colors hover:text-[#0057FF]"
        >
          Escolher tamanho
        </button>
      </div>
    </div>
  </article>
);

const QuickView = ({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const add = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, 1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <div className="quick-view-panel relative grid w-full max-w-5xl overflow-hidden bg-[#FAF8F3] shadow-2xl md:grid-cols-[1.05fr_.95fr]" onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="Fechar detalhes" className="absolute right-4 top-4 z-30 grid h-9 w-9 place-items-center rounded-full bg-white shadow transition-transform hover:rotate-90">
          <X className="h-4 w-4" />
        </button>

        <div className="relative min-h-[420px] overflow-hidden bg-[#EFEAE3]">
          <div className="absolute left-0 top-0 h-28 w-44 -translate-x-12 -translate-y-10 rotate-[-24deg] bg-[#0057FF]" />
          <Image src={product.angleView.frontal} alt={product.name} fill sizes="(max-width: 768px) 100vw, 55vw" className="object-contain p-8 md:p-12" />
          <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.18em] text-black/45">
            <span className="h-[2px] w-6 bg-[#FF6A00]" />
            Perspective view
          </div>
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0057FF]">{product.collection}</p>
          <h3 className="mt-3 text-3xl font-black uppercase leading-[0.95] tracking-[-0.045em]">{product.name}</h3>
          <p className="mt-4 text-sm leading-6 text-black/60">{product.description}</p>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-[0.15em]">Escolha o tamanho</span>
              <span className="text-[9px] uppercase tracking-[0.12em] text-black/40">Obrigatório</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`h-11 border text-[11px] font-black transition-all ${selectedSize === size ? "border-[#0057FF] bg-[#0057FF] text-white" : "border-black/15 bg-white hover:border-black"}`}
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-end justify-between gap-4 border-t border-black/10 pt-6">
            <div>
              <span className="text-2xl font-black">{formatPrice(product.price)}</span>
              <p className="mt-1 text-[10px] text-black/45">ou 6x de {formatPrice(product.price / 6)}</p>
            </div>
            <button
              type="button"
              onClick={add}
              disabled={!selectedSize}
              className="bg-[#111] px-5 py-3 text-[10px] font-black uppercase tracking-[0.13em] text-white transition-all hover:bg-[#0057FF] disabled:cursor-not-allowed disabled:opacity-35"
            >
              {selectedSize ? "Adicionar à sacola" : "Selecione um tamanho"}
            </button>
          </div>

          <Link href={`/produto/${product.slug}`} onClick={onClose} className="mt-5 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.14em] text-black/50 hover:text-[#0057FF]">
            Ver página completa <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ProductCatalog: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category>("todos");
  const [sort, setSort] = useState<SortMode>("destaques");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q") || "";
    const cat = params.get("categoria") as Category | null;
    if (q) {
      setQuery(q);
      setShowAll(true);
    }
    if (cat && CATEGORY_LABELS[cat]) {
      setCategory(cat);
      setShowAll(true);
    }

    try {
      const saved = JSON.parse(localStorage.getItem("thaspect_favorites") || "[]") as string[];
      setFavorites(new Set(saved));
    } catch {
      setFavorites(new Set());
    }

    const onSearch = (event: Event) => {
      const custom = event as CustomEvent<string>;
      setQuery(custom.detail || "");
      setShowAll(true);
    };
    window.addEventListener("thaspect:search", onSearch);
    return () => window.removeEventListener("thaspect:search", onSearch);
  }, []);

  const toggleFavorite = (product: Product) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(product.id)) next.delete(product.id);
      else next.add(product.id);
      localStorage.setItem("thaspect_favorites", JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    let list = PRODUCTS.filter((product) => {
      const categoryMatch = category === "todos" || product.category === category;
      const queryMatch =
        !normalized ||
        [product.name, product.colorName, product.collection, product.description, product.category]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      return categoryMatch && queryMatch;
    });

    list = [...list].sort((a, b) => {
      if (sort === "menor-preco") return a.price - b.price;
      if (sort === "maior-preco") return b.price - a.price;
      if (sort === "nome") return a.name.localeCompare(b.name);
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });

    if (!showAll && category === "todos" && !normalized) {
      const featuredIds = new Set(["prod-01", "prod-02", "prod-06", "prod-07", "prod-09"]);
      return list.filter((product) => featuredIds.has(product.id));
    }
    return list;
  }, [category, query, showAll, sort]);

  const clearFilters = () => {
    setCategory("todos");
    setQuery("");
    setSort("destaques");
    setShowAll(false);
    window.history.replaceState({}, "", "/#catalogo");
  };

  return (
    <section id="catalogo" className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-6 border-b border-black/10 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div data-reveal>
            <div className="mb-2 flex items-center gap-3">
              <span className="h-[3px] w-7 bg-[#FF6A00]" />
              <span className="text-[10px] font-black uppercase tracking-[0.24em]">Coleção / Shop</span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-[-0.04em] sm:text-5xl">Mude o ângulo.</h2>
            <p className="mt-2 max-w-xl text-xs leading-5 text-black/48">
              Filtre, explore e encontre outra perspectiva da coleção.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2" data-reveal>
            <div className="relative min-w-[220px] flex-1 lg:w-[260px] lg:flex-none">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35" />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setShowAll(true);
                }}
                placeholder="Buscar no drop..."
                className="h-11 w-full border border-black/15 bg-[#FAF8F3] pl-10 pr-10 text-xs outline-none transition-colors focus:border-[#0057FF]"
              />
              {query ? (
                <button type="button" onClick={() => setQuery("")} aria-label="Limpar busca" className="absolute right-3 top-1/2 -translate-y-1/2 text-black/35 hover:text-black">
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => setFilterOpen((value) => !value)}
              className={`inline-flex h-11 items-center gap-2 border px-4 text-[9px] font-black uppercase tracking-[0.12em] transition-colors ${filterOpen ? "border-[#0057FF] bg-[#0057FF] text-white" : "border-black/15 bg-white hover:border-black"}`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filtros
            </button>
          </div>
        </div>

        <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${filterOpen ? "mb-8 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <div className="flex flex-col gap-5 bg-[#FAF8F3] p-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-[9px] font-black uppercase tracking-[0.16em] text-black/45">Categoria</p>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(CATEGORY_LABELS) as Category[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setCategory(key);
                        setShowAll(true);
                      }}
                      className={`h-9 border px-3 text-[9px] font-black uppercase tracking-[0.12em] transition-colors ${category === key ? "border-[#111] bg-[#111] text-white" : "border-black/15 bg-white hover:border-black"}`}
                    >
                      {CATEGORY_LABELS[key]}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block min-w-[220px]">
                <span className="mb-3 block text-[9px] font-black uppercase tracking-[0.16em] text-black/45">Ordenar</span>
                <span className="relative block">
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value as SortMode)}
                    className="h-10 w-full appearance-none border border-black/15 bg-white px-3 pr-9 text-[10px] font-bold uppercase tracking-[0.08em] outline-none focus:border-[#0057FF]"
                  >
                    <option value="destaques">Destaques</option>
                    <option value="menor-preco">Menor preço</option>
                    <option value="maior-preco">Maior preço</option>
                    <option value="nome">Nome A–Z</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                </span>
              </label>
            </div>
          </div>
        </div>

        {(query || category !== "todos") ? (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[10px] uppercase tracking-[0.12em] text-black/50">
              {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"}
              {query ? <> para <strong className="text-black">“{query}”</strong></> : null}
            </p>
            <button type="button" onClick={clearFilters} className="text-[9px] font-black uppercase tracking-[0.14em] text-[#0057FF] hover:underline">Limpar filtros</button>
          </div>
        ) : null}

        {filtered.length > 0 ? (
          <div className={showAll || query || category !== "todos" ? "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-5"}>
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                favorite={favorites.has(product.id)}
                onFavorite={toggleFavorite}
                onQuickView={setActiveProduct}
              />
            ))}
          </div>
        ) : (
          <div className="grid min-h-[260px] place-items-center border border-dashed border-black/15 bg-[#FAF8F3] p-8 text-center">
            <div>
              <p className="text-2xl font-black uppercase tracking-[-0.03em]">Nenhuma perspectiva encontrada.</p>
              <p className="mt-2 text-xs text-black/45">Tente outro termo ou limpe os filtros.</p>
              <button type="button" onClick={clearFilters} className="mt-5 bg-[#111] px-5 py-3 text-[9px] font-black uppercase tracking-[0.14em] text-white">Ver coleção completa</button>
            </div>
          </div>
        )}

        {!showAll && !query && category === "todos" ? (
          <div className="mt-11 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="group inline-flex items-center gap-4 border-b border-black pb-1 text-[10px] font-black uppercase tracking-[0.14em]"
            >
              Ver todos os produtos
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        ) : null}

        {favorites.size > 0 ? (
          <div className="mt-12 border-t border-black/10 pt-7">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.16em] text-black/45">
              <Heart className="h-3.5 w-3.5 fill-[#FF6A00] text-[#FF6A00]" />
              {favorites.size} {favorites.size === 1 ? "favorito salvo neste dispositivo" : "favoritos salvos neste dispositivo"}
            </div>
          </div>
        ) : null}
      </div>

      {activeProduct ? <QuickView product={activeProduct} onClose={() => setActiveProduct(null)} /> : null}
    </section>
  );
};
