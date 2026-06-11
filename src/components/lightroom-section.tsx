import { useState } from 'react';
import { MotionInView } from '@/components/motion/motion-in-view';
import { getImageSrc, getImageSrcSet } from '@/content/gallery';
import { lightroom } from '@/content/lightroom';
import { cn } from '@/utils/cn';

type LightroomSectionProps = {
  className?: string;
  id?: string;
};

const SIZES = '(min-width: 1024px) 60vw, 94vw';

export function LightroomSection({ className, id }: LightroomSectionProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <section
      id={id}
      aria-labelledby='lightroom-headline'
      className={cn(
        'relative bg-background px-5 py-20 text-foreground sm:px-8 sm:py-24 lg:px-10 lg:py-28',
        className
      )}
    >
      <MotionInView
        as='div'
        amount={0.2}
        staggerChildren={0.12}
        className='mx-auto grid max-w-[var(--max-width-page)] gap-10 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-16'
      >
        <div className='max-w-xl'>
          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
            {lightroom.eyebrow}
          </p>
          <h2
            id='lightroom-headline'
            className='mt-4 text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.02] tracking-[-0.04em] text-balance text-foreground'
          >
            {lightroom.title}
          </h2>
          <p className='mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg'>
            {lightroom.description}
          </p>
        </div>

        <button
          type='button'
          aria-pressed={revealed}
          aria-label={`Vergleich vor und nach der Lightroom-Bearbeitung. Aktuell: ${
            revealed ? lightroom.afterLabel : lightroom.beforeLabel
          }.`}
          onPointerEnter={(event) => {
            if (event.pointerType === 'mouse') setRevealed(true);
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === 'mouse') setRevealed(false);
          }}
          onPointerUp={(event) => {
            // Touch/pen have no hover — a tap toggles the comparison.
            if (event.pointerType !== 'mouse') setRevealed((value) => !value);
          }}
          onFocus={() => setRevealed(true)}
          onBlur={() => setRevealed(false)}
          className='group relative isolate block aspect-[3/2] w-full select-none overflow-hidden bg-[var(--color-bg-secondary)] shadow-[0_24px_60px_-32px_rgba(43,38,28,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2'
        >
          {/* Before — straight out of camera. */}
          <picture>
            <source
              srcSet={getImageSrcSet(lightroom.before, 'avif')}
              sizes={SIZES}
              type='image/avif'
            />
            <source
              srcSet={getImageSrcSet(lightroom.before, 'webp')}
              sizes={SIZES}
              type='image/webp'
            />
            <img
              src={getImageSrc(lightroom.before, 'lg')}
              alt={lightroom.before.alt}
              draggable={false}
              loading='lazy'
              decoding='async'
              className='pointer-events-none absolute inset-0 h-full w-full object-cover object-center'
            />
          </picture>

          {/* After — the Lightroom edit, revealed on hover/tap. */}
          <picture>
            <source
              srcSet={getImageSrcSet(lightroom.after, 'avif')}
              sizes={SIZES}
              type='image/avif'
            />
            <source
              srcSet={getImageSrcSet(lightroom.after, 'webp')}
              sizes={SIZES}
              type='image/webp'
            />
            <img
              src={getImageSrc(lightroom.after, 'lg')}
              alt={lightroom.after.alt}
              draggable={false}
              loading='lazy'
              decoding='async'
              className={cn(
                'pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-editorial motion-reduce:transition-none',
                revealed ? 'opacity-100' : 'opacity-0'
              )}
            />
          </picture>

          {/* State badge — flips between Original and Lightroom. */}
          <span
            aria-hidden='true'
            className='absolute left-3 top-3 inline-flex items-center gap-2 bg-[var(--paper)]/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--ink)] backdrop-blur sm:left-4 sm:top-4'
          >
            <span className='size-1.5 rounded-full bg-[var(--accent)]' />
            {revealed ? lightroom.afterLabel : lightroom.beforeLabel}
          </span>

          {/* Interaction hint — fades away once the edit is showing. */}
          <span
            aria-hidden='true'
            className={cn(
              'absolute inset-x-3 bottom-3 text-right text-[10px] font-semibold uppercase tracking-[0.24em] text-white/85 transition-opacity duration-300 motion-reduce:transition-none sm:inset-x-4 sm:bottom-4',
              revealed ? 'opacity-0' : 'opacity-100'
            )}
          >
            <span className='hidden sm:inline'>{lightroom.hoverHint}</span>
            <span className='sm:hidden'>{lightroom.touchHint}</span>
          </span>
        </button>
      </MotionInView>
    </section>
  );
}
