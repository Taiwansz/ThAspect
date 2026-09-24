"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/antigo/AntigoCartContext";
import { ShoppingBag, Search, Menu, X, ArrowUpRight } from "lucide-react";

export const AntigoHeader: React.FC = () => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const catalogEl = document.getElementById("catalogo");
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#1F1F1F] text-[#FAF8F3] text-xs font-mono uppercase tracking-widest py-2 px-4 border-b border-[#2C2C2C]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
            <span className="inline-block w-2 h-2 bg-[#0057FF]"></span>
            <span className="font-semibold text-[#FAF8F3]">DROP 01 // PERSPECTIVE</span>
            <span className="text-[#888] hidden sm:inline">|</span>
            <span className="hidden sm:inline text-[#E8DFD1]">MODA TAMBÉM É PERSPECTIVA</span>
            <span className="text-[#888] hidden md:inline">|</span>
            <span className="hidden md:inline text-[#FAF8F3]">FRETE GRATIS PARA TODO O BRASIL ACIMA DE R$ 350</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#FAF8F3] font-bold tracking-wider">
            <span className="w-1.5 h-1.5 bg-[#FF6A00]"></span>
            <span>FIND ANOTHER SIDE OF YOU</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header className="sticky top-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#E8DFD1]/80 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative h-10 w-44 sm:w-52 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/antigo/brand/logos/svg/thaspect-primary.svg"
                alt="ThAspect Logo"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="#catalogo"
              className="text-sm font-semibold tracking-wide text-[#1F1F1F] hover:text-[#0057FF] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0057FF] hover:after:w-full after:transition-all"
            >
              COLECAO
            </Link>
            <Link
              href="#drops"
              className="text-sm font-semibold tracking-wide text-[#1F1F1F] hover:text-[#0057FF] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0057FF] hover:after:w-full after:transition-all"
            >
              DROPS
            </Link>
            <Link
              href="#lookbook"
              className="text-sm font-semibold tracking-wide text-[#1F1F1F] hover:text-[#0057FF] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0057FF] hover:after:w-full after:transition-all"
            >
              PERSPECTIVAS
            </Link>
            <Link
              href="#heritage"
              className="text-sm font-semibold tracking-wide text-[#1F1F1F] hover:text-[#0057FF] transition-colors flex items-center gap-1 group/v1"
            >
              <span>V1 / ORIGENS</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#E8DFD1] text-[#1F1F1F] font-bold group-hover/v1:bg-[#0057FF] group-hover/v1:text-[#FAF8F3] transition-colors">
                CS-VAULT
              </span>
            </Link>
            <Link
              href="#manifesto"
              className="text-sm font-semibold tracking-wide text-[#1F1F1F] hover:text-[#0057FF] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0057FF] hover:after:w-full after:transition-all"
            >
              MANIFESTO
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Buscar produtos"
              className="p-2 text-[#1F1F1F] hover:text-[#0057FF] hover:bg-[#E8DFD1]/50 rounded transition-colors focus:outline-none"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Abrir carrinho de compras"
              className="relative p-2.5 bg-[#1F1F1F] text-[#FAF8F3] hover:bg-[#0057FF] transition-all duration-200 perspective-hover rounded-sm flex items-center gap-2 group focus:outline-none"
            >
              <ShoppingBag className="w-5 h-5 text-[#FAF8F3]" />
              <span className="hidden sm:inline text-xs font-bold font-mono tracking-wider">
                SACOLA
              </span>
              {totalItemsCount > 0 && (
                <span className="w-5 h-5 flex items-center justify-center bg-[#FF6A00] text-[#FAF8F3] text-[11px] font-mono font-bold rounded-full border-2 border-[#1F1F1F]">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu de navegacao mobile"
              className="p-2 text-[#1F1F1F] hover:text-[#0057FF] lg:hidden focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Collapsible Search Bar */}
        {isSearchOpen && (
          <div className="bg-[#E8DFD1]/40 border-b border-[#E8DFD1] px-4 py-3 animate-in fade-in duration-150">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busque por camiseta, hoodie, calca, drop ou codigo..."
                className="w-full bg-[#FAF8F3] border border-[#1F1F1F] px-4 py-2 text-sm text-[#1F1F1F] placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#0057FF]"
                autoFocus
              />
              <button
                type="submit"
                className="px-5 py-2 bg-[#0057FF] text-[#FAF8F3] text-xs font-bold tracking-wider hover:bg-[#1F1F1F] transition-colors"
              >
                BUSCAR
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#1F1F1F]/90 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#FAF8F3] p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8DFD1]">
                <div className="relative h-8 w-32">
                  <Image
                    src="/antigo/brand/logos/svg/thaspect-primary.svg"
                    alt="ThAspect Logo"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#1F1F1F] hover:text-[#0057FF]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-6">
                <Link
                  href="#catalogo"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold tracking-tight text-[#1F1F1F] hover:text-[#0057FF] flex items-center justify-between"
                >
                  <span>COLECAO COMPLETA</span>
                  <ArrowUpRight className="w-5 h-5 text-[#888]" />
                </Link>
                <Link
                  href="#drops"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold tracking-tight text-[#1F1F1F] hover:text-[#0057FF] flex items-center justify-between"
                >
                  <span>DROPS EXCLUSIVOS</span>
                  <ArrowUpRight className="w-5 h-5 text-[#888]" />
                </Link>
                <Link
                  href="#lookbook"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold tracking-tight text-[#1F1F1F] hover:text-[#0057FF] flex items-center justify-between"
                >
                  <span>VISUALIZADOR DE ANGULOS</span>
                  <ArrowUpRight className="w-5 h-5 text-[#888]" />
                </Link>
                <Link
                  href="#heritage"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold tracking-tight text-[#1F1F1F] hover:text-[#0057FF] flex items-center justify-between"
                >
                  <span>V1 / ORIGENS (CS-VAULT)</span>
                  <span className="text-xs bg-[#0057FF] text-[#FAF8F3] px-2 py-0.5 font-mono">
                    LEGACY
                  </span>
                </Link>
                <Link
                  href="#manifesto"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold tracking-tight text-[#1F1F1F] hover:text-[#0057FF] flex items-center justify-between"
                >
                  <span>MANIFESTO DA MARCA</span>
                  <ArrowUpRight className="w-5 h-5 text-[#888]" />
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8DFD1] text-xs font-mono text-[#666]">
              <p className="font-bold text-[#1F1F1F]">THASPECT STREETWEAR</p>
              <p>Find Another Side of You</p>
              <p className="mt-2 text-[11px] text-[#0057FF]">Sao Paulo, Brasil</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
