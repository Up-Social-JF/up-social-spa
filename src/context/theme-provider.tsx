import { useLayoutEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { Theme, ThemeOrigin, ThemeProviderContext } from './theme-context';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type DocumentWithViewTransitions = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    setTheme: (next: Theme, origin?: ThemeOrigin) => {
      const root = window.document.documentElement;
      const doc = window.document as DocumentWithViewTransitions;

      const commit = () => {
        localStorage.setItem(storageKey, next);
        setTheme(next);
      };

      if (origin) {
        root.style.setProperty('--theme-wipe-x', `${origin.x}px`);
        root.style.setProperty('--theme-wipe-y', `${origin.y}px`);
      }

      if (origin && doc.startViewTransition && !prefersReducedMotion()) {
        doc.startViewTransition(() => flushSync(commit));
      } else {
        commit();
      }
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
