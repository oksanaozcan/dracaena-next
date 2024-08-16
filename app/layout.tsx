import './globals.css';
import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/header/navbar';
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
import Container from '@/components/ui/container';
import { InfoLine } from '@/components/info-line';

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

  const initialDarkModeScript = `
    (function() {
      const darkMode = localStorage.getItem('dracaena_dark_mode');
      if (darkMode === 'true') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    })();
  `;

  return (
    <AuthProvider>
      <html 
        lang="en"
        className=''
      >
        <head>
          <script dangerouslySetInnerHTML={{ __html: initialDarkModeScript }} />
        </head>
        <body className={cn(font.className, 'dark:bg-slate-800 dark:text-white')}>
          <ClientCartProvider>
            <ClientCookiesProvider>
              <ClientFavouriteProvider>
                <ClientRestokeProvider>
                  <ModalProvider />
                  <ToastProvider />
                  <div>
                    <Navbar categories={categories}/>   
                    <div className='py-2 bg-beige-200 italic dark:bg-slate-800'>
                      <Container>
                        <InfoLine/>
                      </Container>
                    </div>             
                    {children}
                    <Footer />
                  </div>
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