"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Plus, Check, Eye, SlidersHorizontal } from "lucide-react";

export const ProductCatalog: React.FC = () => {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedNotice, setAddedNotice] = useState<string | null>(null);
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const categories = [
    { id: "todas", label: "TODOS OS PRODUTOS" },
    { id: "camisetas", label: "CAMISETAS" },
    { id: "hoodies", label: "HOODIES" },
    { id: "calcas", label: "CALCAS" },
    { id: "acessorios", label: "ACESSORIOS" },
  ];

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    addItem(product, size, 1);
    setAddedNotice(product.id);
    setTimeout(() => setAddedNotice(null), 2000);
  };

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];
    if (selectedCategory !== "todas") {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [selectedCategory, sortBy]);

  return (
    <section id="catalogo" className="py-20 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Architectural Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b-2 border-[#1F1F1F]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#0057FF] uppercase mb-2">
              <span className="w-2 h-2 bg-[#FF6A00]"></span>
              <span>DROP 01 // CATÁLOGO OFICIAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1F1F1F] uppercase tracking-tight">
              COLECAO PERSPECTIVE
            </h2>
          </div>

          <div className="mt-4 md:mt-0 text-sm font-mono text-[#555] max-w-xs">
            Modelagem oversized, estruturas pesadas e recortes diagonais de 24 graus.
          </div>
        </div>

        {/* Filter & Controls Bar */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E8DFD1]">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-mono font-bold tracking-wider transition-all duration-150 ${
                  selectedCategory === cat.id
                    ? "bg-[#1F1F1F] text-[#FAF8F3] shadow-md"
                    : "bg-[#E8DFD1]/60 text-[#1F1F1F] hover:bg-[#E8DFD1]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-4 h-4 text-[#555]" />
            <span className="text-xs font-mono text-[#555] uppercase">ORDENAR:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FAF8F3] border border-[#1F1F1F] text-xs font-mono font-bold text-[#1F1F1F] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#0057FF]"
            >
              <option value="featured">DESTAQUES</option>
              <option value="price-asc">MENOR PREÇO</option>
              <option value="price-desc">MAIOR PREÇO</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const currentSize = selectedSizes[product.id] || product.sizes[0];
            const isAdded = addedNotice === product.id;

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-[#FAF8F3] border border-[#E8DFD1] hover:border-[#1F1F1F] transition-all duration-300 perspective-hover rounded-sm overflow-hidden"
              >
                {/* Visual Stage Container */}
                <div className="relative h-80 sm:h-96 w-full bg-[#E8DFD1] overflow-hidden p-6 flex items-center justify-center">
                  {/* Subtle Background Geometric Slash */}
                  <div
                    className="absolute inset-0 bg-[#0057FF] opacity-10 transform -rotate-12 scale-125 group-hover:scale-150 transition-transform duration-500"
                    style={{ clipPath: "polygon(0 40%, 100% 0, 100% 60%, 0 100%)" }}
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-2.5 py-1 bg-[#1F1F1F] text-[#FAF8F3] text-[10px] font-mono font-bold tracking-widest uppercase">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Collection Micro-Tag */}
                  <div className="absolute top-4 right-4 z-10 text-[10px] font-mono text-[#555] bg-[#FAF8F3]/80 px-2 py-0.5 backdrop-blur-xs">
                    {product.collection}
                  </div>

                  {/* Product Visual Illustration */}
                  <div className="relative w-56 h-56 transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={product.angleView.frontal}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Quick Detail View Overlay Button */}
                  <button
                    onClick={() => setActiveModalProduct(product)}
                    className="absolute bottom-4 right-4 p-2.5 bg-[#FAF8F3] text-[#1F1F1F] hover:bg-[#0057FF] hover:text-[#FAF8F3] transition-colors rounded-sm shadow-md"
                    aria-label={`Ver detalhes de ${product.name}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Information Body */}
                <div className="p-6 flex flex-col flex-1 justify-between bg-[#FAF8F3]">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#888] mb-1">
                      <span>{product.colorName.toUpperCase()}</span>
                      <span className="text-[#0057FF] font-semibold">{product.category.toUpperCase()}</span>
                    </div>

                    <h3 className="text-xl font-bold text-[#1F1F1F] tracking-tight group-hover:text-[#0057FF] transition-colors">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-xs text-[#555] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E8DFD1]">
                    {/* Size Selector */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono text-[#666]">TAMANHO:</span>
                      <div className="flex items-center gap-1.5">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSizeSelect(product.id, size)}
                            className={`w-7 h-7 text-xs font-mono font-bold transition-all ${
                              currentSize === size
                                ? "bg-[#1F1F1F] text-[#FAF8F3]"
                                : "bg-[#E8DFD1]/50 text-[#1F1F1F] hover:bg-[#E8DFD1]"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price & Add to Cart Button */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-black font-heading text-[#1F1F1F]">
                          R$ {product.price.toFixed(2).replace(".", ",")}
                        </div>
                        {product.originalPrice && (
                          <div className="text-xs text-[#888] line-through font-mono">
                            R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`px-4 py-2.5 text-xs font-bold font-mono tracking-wider transition-all duration-200 flex items-center gap-2 rounded-sm ${
                          isAdded
                            ? "bg-[#1F1F1F] text-[#FAF8F3]"
                            : "bg-[#0057FF] text-[#FAF8F3] hover:bg-[#1F1F1F] perspective-hover"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#FF6A00]" />
                            <span>ADICIONADO</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>COMPRAR</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F1F1F]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF8F3] max-w-2xl w-full p-8 shadow-2xl border-2 border-[#1F1F1F] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 p-2 text-[#1F1F1F] hover:text-[#0057FF] text-xl font-bold font-mono"
            >
              ✕
            </button>

            <div className="text-xs font-mono text-[#0057FF] uppercase tracking-wider mb-2">
              {activeModalProduct.collection} // DETALHES TÉCNICOS
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[#1F1F1F] uppercase mb-4">
              {activeModalProduct.name}
            </h3>

            <div className="text-3xl font-black font-heading text-[#0057FF] mb-6">
              R$ {activeModalProduct.price.toFixed(2).replace(".", ",")}
            </div>

            <p className="text-sm text-[#333] leading-relaxed mb-6">
              {activeModalProduct.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-mono font-bold text-[#1F1F1F] uppercase tracking-wider mb-3">
                ESPECIFICACOES E MATERIAIS:
              </h4>
              <ul className="space-y-2">
                {activeModalProduct.details.map((detail, idx) => (
                  <li key={idx} className="text-xs font-mono text-[#555] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#FF6A00]"></span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-[#E8DFD1]">
              <div className="text-xs font-mono text-[#666]">
                COR: <strong className="text-[#1F1F1F]">{activeModalProduct.colorName}</strong>
              </div>
              <button
                onClick={() => {
                  handleAddToCart(activeModalProduct);
                  setActiveModalProduct(null);
                }}
                className="px-6 py-3 bg-[#0057FF] text-[#FAF8F3] text-xs font-bold font-mono tracking-widest uppercase hover:bg-[#1F1F1F] transition-colors"
              >
                ADICIONAR À SACOLA
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
