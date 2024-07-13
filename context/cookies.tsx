"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './auth-contex';

interface CookieConsentContextProps {
  hasConsented: boolean;
  setHasConsented: (consent: boolean) => void;
}

const CookieConsentContext = createContext<CookieConsentContextProps | undefined>(undefined);

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
};

export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
  const {isAuthenticated} = useAuth();
  const [hasConsented, setHasConsented] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated) {
      setHasConsented(true);
    } else {
      setHasConsented(false);
    }
  }, [isAuthenticated])

  useEffect(() => {
    const consent = localStorage.getItem('dracaena_cookie_consent');
    if (consent === 'true') {
      setHasConsented(true);
    }
  }, []);

  return (
    <CookieConsentContext.Provider value={{ hasConsented, setHasConsented }}>
      {children}
    </CookieConsentContext.Provider>
  );
};