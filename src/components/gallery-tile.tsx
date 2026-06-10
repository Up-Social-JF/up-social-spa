import { Link } from 'react-router';
import { type GalleryTheme, getImageSrc, getImageSrcSet, getThemeCount } from '@/content/gallery';
import { ImageWatermark } from '@/components/image-watermark';
import { cn } from '@/utils/cn';

type GalleryTileProps = {
  theme: GalleryTheme;
  size?: 'compact' | 'editorial';
  className?: string;
};

const aspectClass = {
  compact: 'aspect-[4/5]',
  editorial: 'aspect-[3/4] md:aspect-[4/5]',
} as const;

const titleClass = {
  compact: 'text-lg sm:text-xl lg:text-2xl',
  editorial: 'text-[1.65rem] sm:text-[2.15rem] lg:text-[2.8rem]',
} as const;

export function GalleryTile({ theme, size = 'compact', className }: GalleryTileProps) {
  return (
    <Link
      to={`/galerie/${theme.slug}`}
      aria-label={`${theme.name} Galerie öffnen`}
      className={cn(
        'group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2',
        className
      )}
    >
      <figure className='relative overflow-hidden bg-[var(--color-bg-secondary)]'>
        <div className={aspectClass[size]}>
          <picture>
            <source
              srcSet={getImageSrcSet(theme.cover, 'avif')}
              sizes={
                size === 'editorial'
                  ? '(min-width: 1024px) 36vw, (min-width: 768px) 46vw, 94vw'
                  : '94vw'
              }
              type='image/avif'
            />
            <source
              srcSet={getImageSrcSet(theme.cover, 'webp')}
              sizes={
                size === 'editorial'
                  ? '(min-width: 1024px) 36vw, (min-width: 768px) 46vw, 94vw'
                  : '94vw'
              }
              type='image/webp'
            />
            <img
              src={getImageSrc(theme.cover, size === 'editorial' ? 'xl' : 'lg')}
              alt={theme.cover.alt}
              loading='lazy'
              decoding='async'
              className='h-full w-full object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-[1.1]'
            />
          </picture>
        </div>
        <ImageWatermark size={size === 'editorial' ? 'md' : 'sm'} />
        <span
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgb(10_10_10_/_60%)_100%)] opacity-90 transition-opacity duration-300 group-hover:opacity-100'
        />
        <span className='absolute right-3 top-3 inline-flex items-center bg-[var(--paper)]/92 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)] backdrop-blur sm:right-4 sm:top-4'>
          {getThemeCount(theme)} Bilder
        </span>
        <figcaption className='absolute inset-x-4 bottom-4 flex min-w-0 items-end justify-between gap-3 text-[var(--paper)] sm:inset-x-6 sm:bottom-6'>
          <span
            className={cn(
              'min-w-0 flex-1 pr-1 font-display font-light leading-[1.08] tracking-[-0.02em]',
              titleClass[size],
              theme.slug === 'zgk' && 'text-[1.22rem] sm:text-[1.48rem] lg:text-[1.9rem]'
            )}
          >
            <span className='relative inline-block max-w-full whitespace-normal break-words text-balance'>
              {theme.name}
              <span
                aria-hidden='true'
                className='absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[var(--paper)] transition-transform duration-500 ease-editorial group-hover:scale-x-100'
              />
            </span>
          </span>
        </figcaption>
      </figure>
      {size === 'editorial' ? (
        <p className='mt-3 max-w-md text-sm leading-relaxed text-muted-foreground'>
          {theme.description}
        </p>
      ) : null}
    </Link>
  );
}
