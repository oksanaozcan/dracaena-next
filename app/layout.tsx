import './globals.css';
import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import ModalProvider from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import { ClientCartProvider } from '@/providers/client-cart-provider';
import { ClientFavouriteProvider } from '@/providers/client-favourite-provider';
import AuthProvider from '@/context/auth-contex';
import getCategories from "@/actions/get-categories";
import { ClientRestokeProvider } from '@/providers/client-restoke-provider';
import CookieConsent from '@/components/cookie-consent';
import { cn } from '@/lib/utils';
import { ClientCookiesProvider } from '@/providers/client-cookies-provider';

const font = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dracaena Store',
  description: 'Your online shop for houseplant and more! | dracaena.com',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

   const categories = await getCategories();

  return (
    <AuthProvider>
      <html lang="en">
        <body className={cn(font.className)}>
          <ClientCartProvider>
          <ClientCookiesProvider>
          <ClientFavouriteProvider>
          <ClientRestokeProvider>
          <ModalProvider />
          <ToastProvider />
          <Navbar categories={categories}/>
          {children}
          <Footer />
          <CookieConsent/>
          </ClientRestokeProvider>
          </ClientFavouriteProvider>
          </ClientCookiesProvider>
          </ClientCartProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
