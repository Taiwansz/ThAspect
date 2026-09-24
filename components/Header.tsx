"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { usePathname, useRouter } from "next/navigation";

export const Header: React.FC = () => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 96);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const goToCatalog = (event: React.FormEvent) => {
    event.preventDefault();
    const clean = query.trim();
    if (!clean) return;
    setSearchOpen(false);
    setMobileOpen(false);
    if (pathname === "/") {
      const url = new URL(window.location.href);
      url.searchParams.set("q", clean);
      window.history.replaceState({}, "", `${url.pathname}?${url.searchParams.toString()}#catalogo`);
      window.dispatchEvent(new CustomEvent("thaspect:search", { detail: clean }));
      document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/?q=${encodeURIComponent(clean)}#catalogo`);
    }
  };

  const links = [
    ["INÍCIO", "/#top"],
    ["COLEÇÕES", "/#editorial"],
    ["CAMISETAS", "/?categoria=camisetas#catalogo"],
    ["MOLETONS", "/?categoria=hoodies#catalogo"],
    ["ACESSÓRIOS", "/?categoria=acessorios#catalogo"],
    ["SOBRE", "/#manifesto"],
  ] as const;

  return (
    <>
      <div className="h-8 bg-[#111] text-white text-[10px] uppercase tracking-[0.16em] sm:text-[11px]">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-center px-4 sm:justify-between">
          <span>Frete grátis em compras acima de R$ 350 <span className="mx-2 text-white/40">//</span> Parcele em até 6x sem juros</span>
          <div className="hidden items-center gap-5 md:flex">
            <span>Ajuda</span>
            <span>Acompanhar pedido</span>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 border-b border-black/10 bg-[#FAF8F3]/94 backdrop-blur-xl transition-all duration-300 ${compact ? "shadow-[0_10px_30px_rgba(0,0,0,.05)]" : ""}`}>
        <div className={`mx-auto flex max-w-[1440px] items-center justify-between px-5 transition-[height] duration-300 md:px-8 lg:px-12 ${compact ? "h-[62px]" : "h-[76px]"}`}>
          <Link href="/" aria-label="Página inicial ThAspect" className="relative flex h-11 shrink-0 items-center overflow-visible">
            <Image
              src="/brand/logos/svg/thaspect-primary.svg"
              alt="ThAspect Streetwear"
              width={670}
              height={240}
              priority
              className={`h-auto transition-all duration-300 ${compact ? "w-0 -translate-x-3 opacity-0" : "w-[176px] opacity-100 sm:w-[194px]"}`}
            />
            <Image
              src="/brand/logos/svg/thaspect-monogram.svg"
              alt=""
              aria-hidden="true"
              width={95}
              height={96}
              className={`absolute left-0 h-9 w-9 transition-all duration-300 ${compact ? "translate-x-0 scale-100 opacity-100" : "-translate-x-2 scale-75 opacity-0"}`}
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="relative py-2 text-[11px] font-bold tracking-[0.12em] text-[#161616] transition-colors hover:text-[#0057FF] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#FF6A00] after:transition-all hover:after:w-full"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button type="button" onClick={() => setSearchOpen((value) => !value)} aria-label="Buscar produtos" className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-black/5">
              <Search className="h-5 w-5" strokeWidth={1.7} />
            </button>
            <button type="button" aria-label="Minha conta" className="hidden h-10 w-10 place-items-center rounded-full transition-colors hover:bg-black/5 sm:grid">
              <UserRound className="h-5 w-5" strokeWidth={1.7} />
            </button>
            <button type="button" onClick={() => setIsCartOpen(true)} aria-label="Abrir sacola" className="relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-black/5">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.7} />
              {totalItemsCount > 0 ? (
                <span className="cart-badge absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-[#FF6A00] px-1 text-[9px] font-bold text-white">
                  {totalItemsCount}
                </span>
              ) : null}
            </button>
            <button type="button" onClick={() => setMobileOpen((value) => !value)} aria-label="Abrir menu" className="grid h-10 w-10 place-items-center rounded-full lg:hidden">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className={`grid transition-[grid-template-rows] duration-300 ${searchOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden">
            <form onSubmit={goToCatalog} className="border-t border-black/10 bg-white px-5 py-4">
              <div className="mx-auto flex max-w-2xl gap-2">
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar peça, coleção ou cor..."
                  className="h-11 flex-1 border border-black/20 bg-[#FAF8F3] px-4 text-sm outline-none transition-colors focus:border-[#0057FF]"
                  aria-label="Buscar no catálogo"
                />
                <button className="bg-[#111] px-5 text-xs font-bold tracking-[0.12em] text-white transition-colors hover:bg-[#0057FF]">BUSCAR</button>
              </div>
            </form>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] bg-[#111]/70 backdrop-blur-sm lg:hidden" onMouseDown={() => setMobileOpen(false)}>
          <aside className="mobile-panel ml-auto flex h-full w-[86%] max-w-sm flex-col bg-[#FAF8F3] p-6 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-black/10 pb-5">
              <Image src="/brand/logos/svg/thaspect-primary.svg" alt="ThAspect Streetwear" width={670} height={240} className="h-auto w-[164px]" />
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Fechar menu"><X className="h-6 w-6" /></button>
            </div>
            <nav className="mt-8 flex flex-col">
              {links.map(([label, href], index) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="group flex items-center justify-between border-b border-black/10 py-4 text-lg font-black tracking-tight"
                >
                  <span>{label}</span><span className="text-[9px] font-mono text-black/35">0{index + 1}</span>
                </Link>
              ))}
            </nav>
            <p className="mt-auto text-xs uppercase tracking-[0.18em] text-black/50">Find Another Side of You.</p>
          </aside>
        </div>
      ) : null}
    </>
  );
};
