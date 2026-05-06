import { useLayoutEffect, useState } from 'react';
import { Theme, ThemeProviderContext } from './theme-context';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = 'beige',
  storageKey = 'upsocial-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(storageKey);

    return stored === 'dark' || stored === 'beige' ? stored : defaultTheme;
  });

  useLayoutEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark', 'theme-beige', 'theme-dark');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
