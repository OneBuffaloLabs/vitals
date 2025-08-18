// --- Next ---
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
// --- Components ---
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnalyticsInitializer from '@/components/AnalyticsInitializer';
// --- Utils ---
import { generateMetadata } from '@/utils/metadata';
import { generateViewport } from '@/utils/viewport';
// --- Styles ---
import './globals.css';

// Font Awesome CSS fix
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = generateMetadata();
export const viewport: Viewport = generateViewport();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <head />
      <body
        className={`${inter.variable} font-sans antialiased bg-background-base flex flex-col min-h-screen`}>
        <Header />
        <main className='flex-grow flex items-center justify-center p-4 pt-24 sm:pt-28'>
          {children}
        </main>
        <Footer />
        <AnalyticsInitializer />
      </body>
    </html>
  );
}
