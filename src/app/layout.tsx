import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Font Awesome CSS fix
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  // SEO and Core Metadata
  title: 'Free SEO Analysis Tool | Vitals by One Buffalo Labs',
  description:
    "Instantly analyze your website's on-page and technical SEO with Vitals. Our free, client-side tool checks titles, headers, alt text, and more—all without storing your data.",
  keywords: [
    'SEO analysis tool',
    'free SEO tool',
    'website analyzer',
    'SEO checker',
    'on-page SEO',
    'technical SEO',
    'SEO audit',
    'meta tag analyzer',
    'header tag checker',
    'alt text checker',
    'client-side SEO',
  ],
  creator: 'One Buffalo Labs',
  publisher: 'One Buffalo Labs',
  manifest: '/manifest.json',

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },

  appleWebApp: {
    title: 'Vitals',
    capable: true,
    statusBarStyle: 'default',
  },

  // Open Graph and Twitter card metadata for rich social sharing
  openGraph: {
    title: 'Vitals | Free Client-Side SEO Analysis Tool',
    description: "Instantly analyze your website's core SEO vitals without sharing your data.",
    url: 'https://vitals.onebuffalolabs.com',
    siteName: 'Vitals',
    images: [
      {
        url: 'https://vitals.onebuffalolabs.com/icons/og/og-image-1200-630.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vitals | Free Client-Side SEO Analysis Tool',
    description: "Instantly analyze your website's core SEO vitals without sharing your data.",
    images: ['https://vitals.onebuffalolabs.com/icons/og/og-image-1200-630.png'],
  },
};

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
      </body>
    </html>
  );
}
