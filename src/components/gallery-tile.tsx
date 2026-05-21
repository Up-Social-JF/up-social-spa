import { Link } from 'react-router';
import { type GalleryTheme, getImageSrc, getImageSrcSet, getThemeCount } from '@/content/gallery';
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
  editorial: 'text-2xl sm:text-3xl lg:text-4xl',
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
            <source srcSet={getImageSrcSet(theme.cover, 'avif')} type='image/avif' />
            <source srcSet={getImageSrcSet(theme.cover, 'webp')} type='image/webp' />
            <img
              src={getImageSrc(theme.cover, size === 'editorial' ? 'lg' : 'md')}
              alt={theme.cover.alt}
              loading='lazy'
              decoding='async'
              className='h-full w-full object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-[1.04]'
            />
          </picture>
        </div>
        <span
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgb(10_10_10_/_60%)_100%)] opacity-90 transition-opacity duration-300 group-hover:opacity-100'
        />
        <span className='absolute right-3 top-3 inline-flex items-center bg-[var(--paper)]/92 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)] backdrop-blur sm:right-4 sm:top-4'>
          {getThemeCount(theme)} Bilder
        </span>
        <figcaption className='absolute inset-x-4 bottom-4 flex min-w-0 items-end justify-between gap-3 text-[var(--paper)] sm:inset-x-6 sm:bottom-6'>
          <span
            className={cn('min-w-0 font-display font-light tracking-[-0.025em]', titleClass[size])}
          >
            <span className='relative inline-block max-w-full'>
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
