"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Ruler,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Product, PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

const formatPrice = (value: number) => `R$ ${value.toFixed(2).replace(".", ",")}`;

const GALLERY_FRAMES = [
  { label: "Frente", position: "0% 0%" },
  { label: "Costas", position: "100% 0%" },
  { label: "3/4", position: "0% 100%" },
  { label: "Lifestyle", position: "100% 100%" },
] as const;

const GalleryFrame = ({
  product,
  index,
  className = "",
}: {
  product: Product;
  index: number;
  className?: string;
}) => (
  <div
    role="img"
    aria-label={`${product.name} — ${GALLERY_FRAMES[index].label}`}
    className={`bg-[#F2EFE9] bg-no-repeat ${className}`}
    style={{
      backgroundImage: `url("${product.gallerySheet}")`,
      backgroundSize: "200% 200%",
      backgroundPosition: GALLERY_FRAMES[index].position,
    }}
  />
);

export const ProductDetailClient = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("thaspect_favorites") || "[]") as string[];
      setFavorite(saved.includes(product.id));
    } catch {
      setFavorite(false);
    }
  }, [product.id]);

  useEffect(() => {
    setActiveImage(0);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setActiveImage((current) => (current - 1 + GALLERY_FRAMES.length) % GALLERY_FRAMES.length);
      }
      if (event.key === "ArrowRight") {
        setActiveImage((current) => (current + 1) % GALLERY_FRAMES.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product.id]);

  const related = useMemo(
    () =>
      PRODUCTS.filter(
        (item) =>
          item.id !== product.id &&
          (item.category === product.category || item.collection === product.collection)
      ).slice(0, 4),
    [product]
  );

  const toggleFavorite = () => {
    setFavorite((value) => {
      const nextValue = !value;
      try {
        const saved = new Set(
          JSON.parse(localStorage.getItem("thaspect_favorites") || "[]") as string[]
        );
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

  const previousImage = () =>
    setActiveImage((current) => (current - 1 + GALLERY_FRAMES.length) % GALLERY_FRAMES.length);

  const nextImage = () =>
    setActiveImage((current) => (current + 1) % GALLERY_FRAMES.length);

  const handleTouchEnd = (x: number) => {
    if (touchStart.current === null) return;
    const delta = x - touchStart.current;
    touchStart.current = null;
    if (Math.abs(delta) < 42) return;
    if (delta < 0) nextImage();
    else previousImage();
  };

  return (
    <div className="bg-[#FAF8F3]">
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-7 md:px-8 lg:px-10">
        <div className="mb-7 flex items-center justify-between gap-4">
          <Link
            href="/#catalogo"
            className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.14em] text-black/50 transition-colors hover:text-[#0057FF]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar à coleção
          </Link>
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-black/30">
            ThAspect / {product.id.toUpperCase()}
          </span>
        </div>

        <div className="grid gap-9 lg:grid-cols-[1.12fr_.88fr] lg:gap-14">
          <div data-reveal>
            <div
              className="group relative aspect-square overflow-hidden bg-[#EFEAE3]"
              onTouchStart={(event) => {
                touchStart.current = event.touches[0]?.clientX ?? null;
              }}
              onTouchEnd={(event) => {
                handleTouchEnd(event.changedTouches[0]?.clientX ?? 0);
              }}
            >
              <GalleryFrame
                key={activeImage}
                product={product}
                index={activeImage}
                className="absolute inset-0 animate-[quick-view-in_360ms_cubic-bezier(.2,.8,.2,1)_both]"
              />

              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-5">
                <span className="bg-white/88 px-3 py-2 text-[8px] font-black uppercase tracking-[0.18em] text-[#111] backdrop-blur-md">
                  {String(activeImage + 1).padStart(2, "0")} / 04
                </span>
                <span className="bg-[#111]/82 px-3 py-2 text-[8px] font-black uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  {GALLERY_FRAMES[activeImage].label}
                </span>
              </div>

              <button
                type="button"
                onClick={previousImage}
                aria-label="Imagem anterior"
                className="absolute left-4 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/92 text-[#111] shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-[#0057FF] hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={nextImage}
                aria-label="Próxima imagem"
                className="absolute right-4 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/92 text-[#111] shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-[#0057FF] hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[5px] bg-[#0057FF] transition-[width] duration-300"
                style={{ width: `${((activeImage + 1) / GALLERY_FRAMES.length) * 100}%` }}
              />
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
              {GALLERY_FRAMES.map((frame, index) => (
                <button
                  key={frame.label}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Abrir foto: ${frame.label}`}
                  aria-pressed={activeImage === index}
                  className={`group relative overflow-hidden border-2 bg-[#EFEAE3] transition-all ${activeImage === index ? "border-[#0057FF]" : "border-transparent hover:border-black/25"}`}
                >
                  <GalleryFrame product={product} index={index} className="aspect-square transition-transform duration-300 group-hover:scale-[1.035]" />
                  <span className={`absolute inset-x-0 bottom-0 bg-black/72 px-2 py-1.5 text-[7px] font-black uppercase tracking-[0.14em] text-white transition-opacity ${activeImage === index ? "opacity-100" : "opacity-0 sm:group-hover:opacity-100"}`}>
                    {frame.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-[8px] font-bold uppercase tracking-[0.17em] text-black/38">
              <span>← → no teclado</span>
              <span>Deslize no celular</span>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start" data-reveal>
            <div className="border-b border-black/10 pb-6">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0057FF]">
                    {product.collection}
                  </p>
                  <h1 className="mt-3 text-4xl font-black uppercase leading-[.92] tracking-[-.055em] sm:text-5xl">
                    {product.name}
                  </h1>
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
                {product.originalPrice ? (
                  <span className="pb-1 text-xs text-black/35 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-[10px] text-black/45">
                6x de {formatPrice(product.price / 6)} sem juros
              </p>
            </div>

            <p className="mt-6 text-sm leading-7 text-black/62">{product.description}</p>

            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.16em]">Tamanho</span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-black/45 hover:text-black"
                >
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
              {added ? (
                <>
                  <Check className="h-4 w-4" /> Adicionado
                </>
              ) : selectedSize ? (
                <>
                  Adicionar à sacola <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                "Selecione um tamanho"
              )}
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
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FF6A00]">
                Another side
              </p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-[-.045em] sm:text-5xl">
                Continue mudando o ângulo.
              </h2>
            </div>
            <Link
              href="/#catalogo"
              className="hidden items-center gap-2 text-[9px] font-black uppercase tracking-[0.13em] text-white/55 hover:text-white sm:flex"
            >
              Coleção completa <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/produto/${item.slug}`}
                className="group"
                data-reveal
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#EFEAE3]">
                  <Image
                    src={item.angleView.frontal}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04] group-hover:rotate-[.6deg]"
                  />
                </div>
                <p className="mt-3 text-[10px] font-black uppercase tracking-[0.06em]">
                  {item.name}
                </p>
                <p className="mt-1 text-[10px] text-white/42">
                  {formatPrice(item.price)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
