"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/components/antigo/AntigoCartContext";
import { X, Plus, Minus, Trash2, Tag, Check, ShoppingBag, ArrowRight } from "lucide-react";

export const AntigoCartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    discountAmount,
    total,
    couponCode,
    couponMessage,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  // Form states matching Clientes schema
  const [customerForm, setCustomerForm] = useState({
    nome: "",
    email: "",
    endereco: "",
    telefone: "",
    pagamento: "pix",
  });

  const shippingCost = subtotal > 350 || subtotal === 0 ? 0 : 25.0;
  const finalTotal = total + shippingCost;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon);
      setInputCoupon("");
    }
  };

  const handleFinishOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `TH-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderConfirmed(orderId);
    clearCart();
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1F1F1F]/80 backdrop-blur-xs transition-opacity"
        onClick={() => {
          setIsCartOpen(false);
          setIsCheckingOut(false);
          setOrderConfirmed(null);
        }}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F3] shadow-2xl flex flex-col justify-between border-l border-[#1F1F1F]">
          
          {/* Header */}
          <div className="p-6 bg-[#1F1F1F] text-[#FAF8F3] flex items-center justify-between border-b border-[#333]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#0057FF]" />
              <span className="text-sm font-bold font-mono tracking-widest uppercase">
                SACOLA DE COMPRAS
              </span>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckingOut(false);
                setOrderConfirmed(null);
              }}
              className="p-1 text-[#AAA] hover:text-[#FAF8F3] transition-colors"
              aria-label="Fechar sacola"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderConfirmed ? (
              /* Order Confirmation State */
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-[#0057FF] text-[#FAF8F3] flex items-center justify-center rounded-full mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#1F1F1F] uppercase font-heading">
                  PEDIDO CONFIRMADO
                </h3>
                <p className="text-xs font-mono text-[#0057FF] font-bold mt-1">
                  ID: {orderConfirmed}
                </p>
                <p className="text-xs text-[#555] mt-4 max-w-xs leading-relaxed">
                  Os detalhes do pedido e o codigo de rastreamento serao enviados para o seu e-mail cadastrado.
                </p>
                <div className="mt-8 p-4 bg-[#E8DFD1]/50 border border-[#E8DFD1] text-xs font-mono text-[#1F1F1F] text-left w-full space-y-1">
                  <div>CLIENTE: {customerForm.nome || "Matheus"}</div>
                  <div>PAGAMENTO: {customerForm.pagamento.toUpperCase()}</div>
                  <div>STATUS: PROCESSANDO DISPATCH</div>
                </div>
                <button
                  onClick={() => {
                    setOrderConfirmed(null);
                    setIsCheckingOut(false);
                    setIsCartOpen(false);
                  }}
                  className="mt-8 w-full py-3 bg-[#1F1F1F] text-[#FAF8F3] text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#0057FF] transition-colors"
                >
                  VOLTAR À LOJA
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form (Grounded in Clientes schema) */
              <form onSubmit={handleFinishOrder} className="space-y-4">
                <div className="pb-3 border-b border-[#E8DFD1] flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#1F1F1F] uppercase">
                    DADOS PARA ENTREGA
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs font-mono text-[#0057FF] hover:underline"
                  >
                    Editar Itens
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#333] mb-1">
                    NOME COMPLETO:
                  </label>
                  <input
                    type="text"
                    required
                    value={customerForm.nome}
                    onChange={(e) => setCustomerForm({ ...customerForm, nome: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#1F1F1F] px-3 py-2 text-xs text-[#1F1F1F] focus:outline-none focus:ring-1 focus:ring-[#0057FF]"
                    placeholder="Ex: Matheus Sousa"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#333] mb-1">
                    E-MAIL:
                  </label>
                  <input
                    type="email"
                    required
                    value={customerForm.email}
                    onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#1F1F1F] px-3 py-2 text-xs text-[#1F1F1F] focus:outline-none focus:ring-1 focus:ring-[#0057FF]"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#333] mb-1">
                    ENDEREÇO DE ENTREGA:
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={customerForm.endereco}
                    onChange={(e) => setCustomerForm({ ...customerForm, endereco: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#1F1F1F] px-3 py-2 text-xs text-[#1F1F1F] focus:outline-none focus:ring-1 focus:ring-[#0057FF]"
                    placeholder="Rua, Numero, Bairro, Cidade, CEP"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#333] mb-1">
                    MÉTODO DE PAGAMENTO:
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                    {["pix", "cartao", "boleto"].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setCustomerForm({ ...customerForm, pagamento: method })}
                        className={`py-2 text-center uppercase font-bold border ${
                          customerForm.pagamento === method
                            ? "bg-[#0057FF] text-[#FAF8F3] border-[#0057FF]"
                            : "bg-[#E8DFD1]/50 text-[#1F1F1F] border-[#E8DFD1]"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8DFD1]">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#0057FF] text-[#FAF8F3] text-xs font-bold font-mono tracking-widest uppercase hover:bg-[#1F1F1F] transition-colors"
                  >
                    CONCLUIR PEDIDO (R$ {finalTotal.toFixed(2).replace(".", ",")})
                  </button>
                </div>
              </form>
            ) : items.length === 0 ? (
              /* Empty Cart */
              <div className="py-20 text-center flex flex-col items-center">
                <ShoppingBag className="w-12 h-12 text-[#E8DFD1] mb-4" />
                <p className="text-sm font-bold text-[#1F1F1F] uppercase font-heading">
                  SUA SACOLA ESTA VAZIA
                </p>
                <p className="text-xs text-[#666] mt-2 font-mono">
                  Explore os drops da colecao e adicione pecas com recortes de perspectiva.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 bg-[#1F1F1F] text-[#FAF8F3] text-xs font-mono font-bold uppercase hover:bg-[#0057FF] transition-colors"
                >
                  VER CATÁLOGO
                </button>
              </div>
            ) : (
              /* Item List */
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex gap-4 p-3 bg-[#FAF8F3] border border-[#E8DFD1] rounded-sm"
                  >
                    <div className="relative w-20 h-20 bg-[#E8DFD1] flex-shrink-0 flex items-center justify-center p-2">
                      <Image
                        src={item.product.angleView.frontal}
                        alt={item.product.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-[#1F1F1F] leading-tight">
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] font-mono text-[#0057FF]">
                            TAMANHO: {item.selectedSize}
                          </span>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.selectedSize)}
                          className="text-[#888] hover:text-[#FF6A00] p-1"
                          aria-label="Remover item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#1F1F1F]">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.quantity - 1
                              )
                            }
                            className="p-1 hover:bg-[#E8DFD1] text-[#1F1F1F]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.quantity + 1
                              )
                            }
                            className="p-1 hover:bg-[#E8DFD1] text-[#1F1F1F]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-xs font-bold font-mono text-[#1F1F1F]">
                          R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Coupon Box */}
                <div className="pt-4 border-t border-[#E8DFD1]">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="CUPOM (EX: THASPECT10, PERSPECTIVA)"
                      className="flex-1 bg-[#FAF8F3] border border-[#1F1F1F] px-3 py-2 text-xs font-mono text-[#1F1F1F] uppercase focus:outline-none focus:ring-1 focus:ring-[#0057FF]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1F1F1F] text-[#FAF8F3] text-xs font-mono font-bold hover:bg-[#0057FF] transition-colors"
                    >
                      APLICAR
                    </button>
                  </form>

                  {couponCode && (
                    <div className="mt-2 flex items-center justify-between text-xs font-mono text-[#0057FF] bg-[#0057FF]/10 px-2 py-1">
                      <span>CUPOM ATIVO: {couponCode}</span>
                      <button onClick={removeCoupon} className="text-[#FF6A00] font-bold">
                        Remover
                      </button>
                    </div>
                  )}

                  {couponMessage && !couponCode && (
                    <p className="mt-1 text-[11px] font-mono text-[#FF6A00]">{couponMessage}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Totals & Checkout Button */}
          {!orderConfirmed && items.length > 0 && !isCheckingOut && (
            <div className="p-6 bg-[#FAF8F3] border-t border-[#E8DFD1] space-y-3">
              <div className="flex justify-between text-xs font-mono text-[#666]">
                <span>SUBTOTAL:</span>
                <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-xs font-mono text-[#0057FF]">
                  <span>DESCONTO APLICADO:</span>
                  <span>- R$ {discountAmount.toFixed(2).replace(".", ",")}</span>
                </div>
              )}

              <div className="flex justify-between text-xs font-mono text-[#666]">
                <span>FRETE:</span>
                <span>
                  {shippingCost === 0 ? (
                    <strong className="text-[#0057FF]">GRÁTIS</strong>
                  ) : (
                    `R$ ${shippingCost.toFixed(2).replace(".", ",")}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-black font-heading text-[#1F1F1F] pt-2 border-t border-[#E8DFD1]">
                <span>TOTAL:</span>
                <span className="text-[#0057FF]">
                  R$ {finalTotal.toFixed(2).replace(".", ",")}
                </span>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full mt-2 py-3.5 bg-[#0057FF] text-[#FAF8F3] text-xs font-bold font-mono tracking-widest uppercase hover:bg-[#1F1F1F] transition-colors flex items-center justify-center gap-2 group"
              >
                <span>PROSSEGUIR PARA CHECKOUT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
