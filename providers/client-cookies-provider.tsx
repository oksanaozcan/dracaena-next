'use client';

import React, { ReactNode } from 'react';
import { CookieConsentProvider } from '@/context/cookies';

interface ClientCookiesProviderProps {
  children: ReactNode;
}

export function ClientCookiesProvider({ children }: ClientCookiesProviderProps) {
  return (
    <CookieConsentProvider>
      {children}
    </CookieConsentProvider>
  );
}
