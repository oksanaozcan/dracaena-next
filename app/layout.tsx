import './globals.css'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { ClientCartProvider } from '@/providers/client-cart-provider'
import { ClientFavouriteProvider } from '@/providers/client-favourite-provider'

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dracaena Store',
  description: 'Your online shop for houseplant and more! | dracaena.com',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={font.className}>
        <ClientCartProvider>
          <ClientFavouriteProvider>
            <ModalProvider/>
            <ToastProvider/>
            <Navbar/>        
            {children}
            <Footer/>
          </ClientFavouriteProvider>
        </ClientCartProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}
