'use client';

import React, { ReactNode } from 'react';
import FavouriteProvider from "@/context/favourite";

interface ClientFavouriteProviderProps {
  children: ReactNode;
}

export function ClientFavouriteProvider({ children }: ClientFavouriteProviderProps) {
  return (
    <FavouriteProvider>
      {children}
    </FavouriteProvider>
  );
}
