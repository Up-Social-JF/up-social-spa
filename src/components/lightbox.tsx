import * as React from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { type ImageVariantSet, getImageSrc, getImageSrcSet } from '@/content/gallery';
import { cn } from '@/utils/cn';

type LightboxProps = {
  images: ImageVariantSet[];
  index: number | null;
  onIndexChange: (next: number | null) => void;
  themeName: string;
};

const SWIPE_THRESHOLD = 60;

export function Lightbox({ images, index, onIndexChange, themeName }: LightboxProps) {
  const isOpen = index !== null;
  const safeIndex = index ?? 0;
  const current = images[safeIndex];
  const total = images.length;
  const touchStartX = React.useRef<number | null>(null);

  const goPrev = React.useCallback(() => {
    if (index === null || total === 0) return;
    onIndexChange((index - 1 + total) % total);
  }, [index, total, onIndexChange]);

  const goNext = React.useCallback(() => {
    if (index === null || total === 0) return;
    onIndexChange((index + 1) % total);
  }, [index, total, onIndexChange]);

  React.useEffect(() => {
    if (!isOpen) return;
    function handler(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, goPrev, goNext]);

  function handleTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  }

  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onIndexChange(null);
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-[var(--ink)]/95 backdrop-blur-sm',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0'
          )}
        />
        <DialogPrimitive.Content
          aria-label={`${themeName} Galerie Lightbox`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={cn(
            'fixed inset-0 z-50 flex flex-col text-[var(--paper)]',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0'
          )}
        >
          <DialogPrimitive.Title className='sr-only'>
            {themeName} — Bild {safeIndex + 1} von {total}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className='sr-only'>
            {current?.alt ?? ''}
          </DialogPrimitive.Description>

          <header className='flex items-center justify-between gap-4 px-5 py-5 sm:px-8'>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[var(--paper)]/75'>
              {themeName} — {safeIndex + 1} / {total}
            </p>
            <DialogPrimitive.Close
              aria-label='Schließen'
              className='inline-flex size-11 items-center justify-center border border-[var(--paper)]/30 text-[var(--paper)] transition-colors hover:border-[var(--paper)] hover:bg-[var(--paper)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--paper)]'
            >
              <X aria-hidden='true' className='size-5' />
            </DialogPrimitive.Close>
          </header>

          <div className='relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-12'>
            <button
              type='button'
              onClick={goPrev}
              aria-label='Vorheriges Bild'
              className='absolute left-2 top-1/2 z-10 inline-flex size-12 -translate-y-1/2 items-center justify-center border border-[var(--paper)]/25 bg-[var(--ink)]/40 text-[var(--paper)] backdrop-blur transition-colors hover:border-[var(--paper)] hover:bg-[var(--ink)]/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--paper)] sm:left-6 sm:size-14'
            >
              <ChevronLeft aria-hidden='true' className='size-6' />
            </button>

            {current ? (
              <div className='relative flex h-[min(78vh,820px)] w-[min(92vw,1200px)] items-center justify-center overflow-hidden'>
                <picture className='flex h-full w-full items-center justify-center'>
                  <source
                    srcSet={getImageSrcSet(current, 'avif')}
                    sizes='100vw'
                    type='image/avif'
                  />
                  <source
                    srcSet={getImageSrcSet(current, 'webp')}
                    sizes='100vw'
                    type='image/webp'
                  />
                  <img
                    key={current.base}
                    src={getImageSrc(current, '4k')}
                    alt={current.alt}
                    loading='eager'
                    fetchPriority='high'
                    decoding='async'
                    className='h-full w-full object-contain'
                  />
                </picture>
                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute inset-0 flex items-center justify-center'
                >
                  <span className='rounded-md bg-black/28 px-5 py-3 text-center font-display text-[clamp(1.4rem,5vw,3.8rem)] uppercase tracking-[0.46em] text-white/55 shadow-[0_0_0_1px_rgba(255,255,255,0.22)]'>
                    UP SOCIAL
                  </span>
                </div>
              </div>
            ) : null}

            <button
              type='button'
              onClick={goNext}
              aria-label='Nächstes Bild'
              className='absolute right-2 top-1/2 z-10 inline-flex size-12 -translate-y-1/2 items-center justify-center border border-[var(--paper)]/25 bg-[var(--ink)]/40 text-[var(--paper)] backdrop-blur transition-colors hover:border-[var(--paper)] hover:bg-[var(--ink)]/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--paper)] sm:right-6 sm:size-14'
            >
              <ChevronRight aria-hidden='true' className='size-6' />
            </button>
          </div>

          {current?.alt ? (
            <footer className='px-5 pb-5 pt-2 text-center text-xs text-[var(--paper)]/70 sm:px-8'>
              {current.alt}
            </footer>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
