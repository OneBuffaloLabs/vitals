'use client';

import React from 'react';
import { useTheme } from './theme-provider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Avoid rendering the button on the server or before hydration.
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className='bg-card hover:bg-muted text-foreground font-semibold h-12 w-12 rounded-full flex items-center justify-center transition-colors duration-200 border'
      aria-label='Toggle theme'>
      <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} className='h-5 w-5' />
    </button>
  );
}
