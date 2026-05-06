import { useMemo, useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { Navigate, useParams } from 'react-router';
import { CTABanner } from '@/components/layout/cta-banner';
import { GalleryTile } from '@/components/gallery-tile';
import { Lightbox } from '@/components/lightbox';
import { MotionInView } from '@/components/motion/motion-in-view';
import {
  galleryThemes,
  getGalleryThemeBySlug,
  getImageSrc,
  getImageSrcSet,
  getThemeImages,
} from '@/content/gallery';

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1] },
  },
};

const masonrySpan = (index: number) => {
  // Editorial masonry feel: cycle aspect ratios so the grid breaks into a varied rhythm.
  const cycle = index % 7;
  if (cycle === 0) return 'aspect-[3/4] sm:row-span-2 sm:aspect-[3/5]';
  if (cycle === 1) return 'aspect-[4/3]';
  if (cycle === 3) return 'aspect-[1/1]';
  if (cycle === 5) return 'aspect-[4/5] sm:row-span-2 sm:aspect-[4/6]';
  return 'aspect-[4/5]';
};

export function GalerieThemePage() {
  const { theme: themeSlug } = useParams();
  const theme = getGalleryThemeBySlug(themeSlug);
  const images = useMemo(() => (theme ? getThemeImages(theme) : []), [theme]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!theme) {
    return <Navigate to='/404' replace />;
  }

  const otherThemes = galleryThemes.filter((item) => item.slug !== theme.slug);

  return (
    <>
      <MotionInView
        as='header'
        amount={0.4}
        className='relative bg-background px-5 pb-10 pt-28 sm:px-8 sm:pb-14 sm:pt-32 lg:px-10 lg:pb-20 lg:pt-40'
      >
        <div className='mx-auto grid max-w-[var(--max-width-page)] gap-5'>
          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground'>
            Galerie · {theme.count} Bilder
          </p>
          <h1 className='max-w-5xl text-[clamp(3rem,9vw,7rem)] font-light leading-[0.94] tracking-[-0.05em] text-balance text-[var(--accent-readable)]'>
            {theme.name}
          </h1>
          <p className='max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
            {theme.description}
          </p>
        </div>
      </MotionInView>

      <section
        aria-label={`${theme.name} Bilder`}
        className='bg-background px-5 pb-20 sm:px-8 sm:pb-24 lg:px-10 lg:pb-28'
      >
        <MotionInView
          as='ul'
          amount={0.05}
          staggerChildren={0.04}
          className='mx-auto grid max-w-[var(--max-width-page)] list-none auto-rows-[14rem] grid-cols-1 gap-3 sm:auto-rows-[16rem] sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5'
        >
          {images.map((image, index) => (
            <motion.li key={image.base} variants={tileVariants} className={masonrySpan(index)}>
              <button
                type='button'
                onClick={() => setLightboxIndex(index)}
                aria-label={`${image.alt} — vergrößern`}
                className='group block h-full w-full overflow-hidden bg-[var(--color-bg-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2'
              >
                <picture>
                  <source srcSet={getImageSrcSet(image, 'avif')} type='image/avif' />
                  <source srcSet={getImageSrcSet(image, 'webp')} type='image/webp' />
                  <img
                    src={getImageSrc(image, 'md')}
                    alt={image.alt}
                    loading='lazy'
                    decoding='async'
                    className='h-full w-full object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-[1.04]'
                  />
                </picture>
              </button>
            </motion.li>
          ))}
        </MotionInView>
      </section>

      <section
        aria-labelledby='other-themes'
        className='bg-[var(--color-bg-secondary)]/55 px-5 py-20 text-foreground sm:px-8 sm:py-24 lg:px-10 lg:py-28'
      >
        <MotionInView as='div' className='mx-auto grid max-w-[var(--max-width-page)] gap-10'>
          <header className='max-w-2xl'>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
              Andere Themen
            </p>
            <h2
              id='other-themes'
              className='mt-3 font-display text-3xl font-light leading-tight tracking-[-0.025em] text-foreground sm:text-4xl'
            >
              Mehr aus der Galerie.
            </h2>
          </header>
          <ul className='grid list-none grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4'>
            {otherThemes.map((other) => (
              <li key={other.slug}>
                <GalleryTile theme={other} size='compact' />
              </li>
            ))}
          </ul>
        </MotionInView>
      </section>

      <CTABanner
        subject={`Anfrage UpSocial — Galerie ${theme.name}`}
        headline={`${theme.name} für deine Marke?`}
      />

      <Lightbox
        images={images}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
        themeName={theme.name}
      />
    </>
  );
}
