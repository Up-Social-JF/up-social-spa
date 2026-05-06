import { vi } from 'vitest';

export function mockWindowMatchMedia() {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

export function mockIntersectionObserver() {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '';
    readonly scrollMargin = '';
    readonly thresholds = [];

    disconnect = vi.fn();
    observe = vi.fn();
    takeRecords = vi.fn(() => []);
    unobserve = vi.fn();
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: MockIntersectionObserver,
  });

  Object.defineProperty(globalThis, 'IntersectionObserver', {
    writable: true,
    value: MockIntersectionObserver,
  });
}
