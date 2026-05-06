import { ArrowUpRight } from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import { Link } from 'react-router';
import { MotionInView } from '@/components/motion/motion-in-view';
import { galleryThemes, getImageSrc, getImageSrcSet } from '@/content/gallery';
import { cn } from '@/utils/cn';

type GalleryTeaserProps = {
  className?: string;
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.65, 0, 0.35, 1] },
  },
};

export function GalleryTeaser({
  className,
  id,
  eyebrow = 'Galerie',
  title = 'Letzte Arbeiten.',
  description = 'Fünf Bildwelten, die zeigen, wie Marken bei uns aussehen.',
}: GalleryTeaserProps) {
  return (
    <section
      id={id}
      aria-labelledby='gallery-teaser-headline'
      className={cn(
        'relative bg-background px-5 py-20 text-foreground sm:px-8 sm:py-24 lg:px-10 lg:py-28',
        className
      )}
    >
      <div className='mx-auto grid max-w-[var(--max-width-page)] gap-12'>
        <MotionInView
          as='header'
          className='flex flex-col justify-between gap-6 lg:flex-row lg:items-end'
        >
          <div className='max-w-2xl'>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
              {eyebrow}
            </p>
            <h2
              id='gallery-teaser-headline'
              className='mt-4 text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.02] tracking-[-0.04em] text-balance text-foreground'
            >
              {title}
            </h2>
            {description ? (
              <p className='mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
                {description}
              </p>
            ) : null}
          </div>
          <Link
            to='/galerie'
            className='group inline-flex items-center gap-2 self-start text-sm font-semibold uppercase tracking-[0.18em] text-foreground transition-colors duration-200 ease-editorial hover:text-[var(--accent-readable)] lg:self-end'
          >
            Galerie ansehen
            <ArrowUpRight
              aria-hidden='true'
              className='size-4 transition-transform duration-200 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
            />
          </Link>
        </MotionInView>

        <MotionInView
          as='ul'
          amount={0.15}
          staggerChildren={0.08}
          className='grid list-none grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5'
        >
          {galleryThemes.map((theme) => (
            <motion.li key={theme.slug} variants={tileVariants} className='group'>
              <Link
                to={`/galerie/${theme.slug}`}
                aria-label={`${theme.name} Galerie öffnen`}
                className='block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2'
              >
                <figure className='relative overflow-hidden bg-[var(--color-bg-secondary)]'>
                  <div className='aspect-[4/5]'>
                    <picture>
                      <source srcSet={getImageSrcSet(theme.cover, 'avif')} type='image/avif' />
                      <source srcSet={getImageSrcSet(theme.cover, 'webp')} type='image/webp' />
                      <img
                        src={getImageSrc(theme.cover, 'md')}
                        alt={theme.cover.alt}
                        loading='lazy'
                        decoding='async'
                        className='h-full w-full object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-[1.04]'
                      />
                    </picture>
                  </div>
                  <span
                    aria-hidden='true'
                    className='pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(10_10_10_/_55%)_100%)] opacity-90 transition-opacity duration-300 group-hover:opacity-100'
                  />
                  <figcaption className='absolute inset-x-3 bottom-3 flex items-baseline justify-between gap-2 text-[var(--paper)] sm:inset-x-4 sm:bottom-4'>
                    <span className='font-display text-base font-light tracking-[-0.02em] sm:text-lg'>
                      {theme.name}
                    </span>
                    <span className='text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--paper)]/75'>
                      {theme.count} Bilder
                    </span>
                  </figcaption>
                </figure>
              </Link>
            </motion.li>
          ))}
        </MotionInView>
      </div>
    </section>
  );
}
