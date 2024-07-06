'use client';

import React, { ReactNode } from 'react';
import RestokeSubscriptionProvider from '@/context/restoke-subscription';

interface ClientRestokeProviderProps {
  children: ReactNode;
}

export function ClientRestokeProvider({ children }: ClientRestokeProviderProps) {
  return (
    <RestokeSubscriptionProvider>
      {children}
    </RestokeSubscriptionProvider>
  );
}
