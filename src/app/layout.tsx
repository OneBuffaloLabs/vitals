import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

// Font Awesome CSS fix
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Vitals by One Buffalo Labs',
  description: 'A client-side SEO analysis tool.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <head />
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
