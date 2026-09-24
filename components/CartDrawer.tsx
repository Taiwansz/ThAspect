"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    subtotal,
    discountAmount,
    total,
    couponCode,
    couponMessage,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const shippingCost = subtotal > 350 || subtotal === 0 ? 0 : 25;
  const finalTotal = total + shippingCost;

  useEffect(() => {
    if (!isCartOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isCartOpen, setIsCartOpen]);

  const handleApplyCoupon = (event: React.FormEvent) => {
    event.preventDefault();
    if (!inputCoupon.trim()) return;
    applyCoupon(inputCoupon);
    setInputCoupon("");
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setCheckoutError("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          couponCode,
          items: items.map((item) => ({
            productId: item.product.id,
            selectedSize: item.selectedSize,
            quantity: item.quantity,
          })),
        }),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        setCheckoutError(data.error || "Não foi possível iniciar o checkout.");
        return;
      }
      window.location.assign(data.url);
    } catch {
      setCheckoutError("Falha de conexão ao iniciar o pagamento.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] overflow-hidden" role="dialog" aria-modal="true" aria-label="Sacola de compras">
      <button
        type="button"
        aria-label="Fechar sacola"
        className="absolute inset-0 bg-[#1F1F1F]/75 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      <aside className="mobile-panel fixed inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-black/10 bg-[#FAF8F3] shadow-2xl">
        <div className="flex items-center justify-between bg-[#111] px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-[#0057FF]" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em]">Sacola</p>
              <p className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-white/45">{items.length} {items.length === 1 ? "item" : "itens"}</p>
            </div>
          </div>
          <button type="button" onClick={() => setIsCartOpen(false)} aria-label="Fechar sacola" className="grid h-9 w-9 place-items-center rounded-full text-white/65 transition-colors hover:bg-white/10 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="grid min-h-[55vh] place-items-center text-center">
              <div>
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-black/10 bg-white">
                  <ShoppingBag className="h-6 w-6 text-black/30" />
                </div>
                <h3 className="mt-5 text-xl font-black uppercase tracking-[-0.03em]">Sua sacola está vazia.</h3>
                <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-black/45">Explore o drop e escolha o seu próximo ponto de vista.</p>
                <button onClick={() => setIsCartOpen(false)} className="mt-6 bg-[#111] px-6 py-3 text-[9px] font-black uppercase tracking-[0.14em] text-white hover:bg-[#0057FF]">
                  Ver catálogo
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="grid grid-cols-[82px_1fr] gap-4 border border-black/10 bg-white p-3">
                    <div className="relative aspect-square overflow-hidden bg-[#EFEAE3]">
                      <Image src={item.product.angleView.frontal} alt={item.product.name} fill sizes="82px" className="object-contain p-1.5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h4 className="truncate text-[11px] font-black uppercase tracking-[-0.01em]">{item.product.name}</h4>
                          <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-black/40">Tamanho {item.selectedSize}</p>
                        </div>
                        <button onClick={() => removeItem(item.product.id, item.selectedSize)} aria-label="Remover item" className="text-black/30 transition-colors hover:text-[#FF6A00]">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <div className="flex items-center border border-black/12">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                            className="grid h-8 w-8 place-items-center hover:bg-[#E8DFD1]"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-[10px] font-black">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                            className="grid h-8 w-8 place-items-center hover:bg-[#E8DFD1]"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <span className="text-[11px] font-black">
                          R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleApplyCoupon} className="mt-6 border-t border-black/10 pt-5">
                <p className="mb-3 text-[9px] font-black uppercase tracking-[0.16em] text-black/45">Cupom</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(event) => setInputCoupon(event.target.value)}
                    placeholder="THASPECT10"
                    className="h-10 min-w-0 flex-1 border border-black/15 bg-white px-3 text-[10px] uppercase outline-none focus:border-[#0057FF]"
                  />
                  <button type="submit" className="h-10 bg-[#111] px-4 text-[9px] font-black uppercase tracking-[0.12em] text-white hover:bg-[#0057FF]">Aplicar</button>
                </div>

                {couponCode ? (
                  <div className="mt-3 flex items-center justify-between bg-[#0057FF]/8 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.1em] text-[#0057FF]">
                    <span>{couponCode} aplicado</span>
                    <button type="button" onClick={removeCoupon} className="text-[#FF6A00]">Remover</button>
                  </div>
                ) : couponMessage ? (
                  <p className="mt-2 text-[9px] text-[#FF6A00]">{couponMessage}</p>
                ) : null}
              </form>

              <div className="mt-6 border-t border-black/10 pt-5 text-[10px]">
                <div className="flex justify-between py-1.5 text-black/50"><span>Subtotal</span><span>R$ {subtotal.toFixed(2).replace(".", ",")}</span></div>
                {discountAmount > 0 ? <div className="flex justify-between py-1.5 text-[#0057FF]"><span>Desconto</span><span>- R$ {discountAmount.toFixed(2).replace(".", ",")}</span></div> : null}
                <div className="flex justify-between py-1.5 text-black/50"><span>Frete</span><span>{shippingCost === 0 ? "GRÁTIS" : `R$ ${shippingCost.toFixed(2).replace(".", ",")}`}</span></div>
                <div className="mt-3 flex justify-between border-t border-black/10 pt-4 text-base font-black"><span>Total</span><span>R$ {finalTotal.toFixed(2).replace(".", ",")}</span></div>
              </div>
            </>
          )}
        </div>

        {items.length > 0 ? (
          <div className="border-t border-black/10 bg-white p-5">
            {checkoutError ? (
              <div className="mb-3 border-l-2 border-[#FF6A00] bg-[#FF6A00]/6 px-3 py-2 text-[9px] leading-4 text-black/65">
                {checkoutError}
              </div>
            ) : null}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="group flex h-13 w-full items-center justify-center gap-3 bg-[#0057FF] px-5 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#111] disabled:cursor-wait disabled:opacity-60"
            >
              {checkoutLoading ? "Abrindo checkout..." : "Ir para pagamento seguro"}
              {!checkoutLoading ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /> : null}
            </button>
            <p className="mt-3 text-center text-[8px] uppercase tracking-[0.12em] text-black/35">Pagamento processado pelo provedor seguro quando conectado.</p>
          </div>
        ) : null}
      </aside>
    </div>
  );
};
