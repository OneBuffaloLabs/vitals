import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

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

// This component contains the script to prevent the theme flicker.
// It runs before the page is rendered to set the correct theme class.
const ThemeInitScript = () => {
  const script = `
  (function() {
    function getInitialTheme() {
      try {
        const persistedColorPreference = window.localStorage.getItem('theme');
        if (typeof persistedColorPreference === 'string') {
          return persistedColorPreference;
        }
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        if (typeof mql.matches === 'boolean') {
          return mql.matches ? 'dark' : 'light';
        }
      } catch (e) {
        // Fallback for environments where localStorage or matchMedia is not available
      }
      return 'light';
    }
    const theme = getInitialTheme();
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  })();
`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <ThemeInitScript />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
