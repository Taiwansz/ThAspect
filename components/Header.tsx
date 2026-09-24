"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Header: React.FC = () => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const goToCatalog = (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
    setSearchOpen(false);
  };

  const links = [
    ["INÍCIO", "#top"],
    ["COLEÇÕES", "#editorial"],
    ["CAMISETAS", "#catalogo"],
    ["MOLETONS", "#catalogo"],
    ["ACESSÓRIOS", "#catalogo"],
    ["SOBRE", "#manifesto"],
  ] as const;

  return (
    <>
      <div className="h-8 bg-[#111] text-white text-[10px] sm:text-[11px] tracking-[0.16em] uppercase">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-center px-4 sm:justify-between">
          <span>Frete grátis em compras acima de R$ 350 <span className="mx-2 text-white/40">//</span> Parcele em até 6x sem juros</span>
          <div className="hidden items-center gap-5 md:flex">
            <span>Ajuda</span>
            <span>Acompanhar pedido</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#FAF8F3]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-5 md:px-8 lg:px-12">
          <Link href="/" aria-label="Página inicial ThAspect" className="relative h-11 w-40 shrink-0 sm:w-44">
            <Image
              src="/brand/logos/svg/thaspect-primary.svg"
              alt="ThAspect"
              fill
              priority
              className="object-contain object-left"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="relative py-2 text-[12px] font-bold tracking-[0.12em] text-[#161616] transition-colors hover:text-[#0057FF] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#FF6A00] after:transition-all hover:after:w-full"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen((value) => !value)}
              aria-label="Buscar produtos"
              className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-black/5"
            >
              <Search className="h-5 w-5" strokeWidth={1.7} />
            </button>
            <button
              type="button"
              aria-label="Minha conta"
              className="hidden h-10 w-10 place-items-center rounded-full transition-colors hover:bg-black/5 sm:grid"
            >
              <UserRound className="h-5 w-5" strokeWidth={1.7} />
            </button>
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="Abrir sacola"
              className="relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-black/5"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.7} />
              {totalItemsCount > 0 ? (
                <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-[#FF6A00] px-1 text-[9px] font-bold text-white">
                  {totalItemsCount}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label="Abrir menu"
              className="grid h-10 w-10 place-items-center rounded-full lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {searchOpen ? (
          <form onSubmit={goToCatalog} className="border-t border-black/10 bg-white px-5 py-4">
            <div className="mx-auto flex max-w-2xl gap-2">
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="O que você procura?"
                className="h-11 flex-1 border border-black/20 bg-[#FAF8F3] px-4 text-sm outline-none focus:border-[#0057FF]"
              />
              <button className="bg-[#111] px-5 text-xs font-bold tracking-[0.12em] text-white hover:bg-[#0057FF]">
                BUSCAR
              </button>
            </div>
          </form>
        ) : null}
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] bg-[#111]/70 backdrop-blur-sm lg:hidden">
          <aside className="ml-auto flex h-full w-[86%] max-w-sm flex-col bg-[#FAF8F3] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 pb-5">
              <div className="relative h-9 w-36">
                <Image src="/brand/logos/svg/thaspect-primary.svg" alt="ThAspect" fill className="object-contain object-left" />
              </div>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Fechar menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col">
              {links.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-black/10 py-4 text-lg font-black tracking-tight"
                >
                  {label}
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
