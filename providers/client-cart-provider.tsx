'use client';

import React, { ReactNode } from 'react';
import CartProvider from "@/context/cart";

interface ClientCartProviderProps {
  children: ReactNode;
}

export function ClientCartProvider({ children }: ClientCartProviderProps) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
