"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, VALID_COUPONS } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, selectedSize: string, quantity?: number) => void;
  removeItem: (productId: string, selectedSize: string) => void;
  updateQuantity: (productId: string, selectedSize: string, quantity: number) => void;
  clearCart: () => void;
  couponCode: string;
  couponDiscount: number;
  couponMessage: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  total: number;
  totalItemsCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string>("");
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
    try {
      const savedCart = localStorage.getItem("thaspect_cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem("thaspect_coupon");
      if (savedCoupon && VALID_COUPONS[savedCoupon.toUpperCase()]) {
        setCouponCode(savedCoupon.toUpperCase());
        setCouponDiscount(VALID_COUPONS[savedCoupon.toUpperCase()].discountPercent);
        setCouponMessage(VALID_COUPONS[savedCoupon.toUpperCase()].description);
      }
    } catch {
      // Ignorar erros de storage
    }
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    try {
      localStorage.setItem("thaspect_cart", JSON.stringify(items));
      if (couponCode) {
        localStorage.setItem("thaspect_coupon", couponCode);
      } else {
        localStorage.removeItem("thaspect_coupon");
      }
    } catch {
      // Ignorar erros de storage
    }
  }, [items, couponCode, hasMounted]);

  const addItem = (product: Product, selectedSize: string, quantity: number = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, selectedSize, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string, selectedSize: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  const updateQuantity = (productId: string, selectedSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, selectedSize);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedSize === selectedSize) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode("");
    setCouponDiscount(0);
    setCouponMessage("");
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (VALID_COUPONS[clean]) {
      setCouponCode(clean);
      setCouponDiscount(VALID_COUPONS[clean].discountPercent);
      setCouponMessage(VALID_COUPONS[clean].description);
      return true;
    }
    setCouponMessage("Cupom invalido ou expirado.");
    return false;
  };

  const removeCoupon = () => {
    setCouponCode("");
    setCouponDiscount(0);
    setCouponMessage("");
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * couponDiscount) / 100;
  const total = Math.max(0, subtotal - discountAmount);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        couponCode,
        couponDiscount,
        couponMessage,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        total,
        totalItemsCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
