import { createContext } from 'react';

export type Theme = 'beige' | 'dark';

export type ThemeOrigin = { x: number; y: number };

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme, origin?: ThemeOrigin) => void;
};

const initialState: ThemeProviderState = {
  theme: 'beige',
  setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
