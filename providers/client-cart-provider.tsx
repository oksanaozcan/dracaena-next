'use client';

import CartProvider from "@/context/cart";


export function ClientCartProvider({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}