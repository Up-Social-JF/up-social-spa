import { useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { CTABanner } from '@/components/layout/cta-banner';
import { GalleryTile } from '@/components/gallery-tile';
import { GalleryFilmStrip } from '@/components/gallery-film-strip';
import { Lightbox } from '@/components/lightbox';
import { MotionInView } from '@/components/motion/motion-in-view';
import {
  galleryThemes,
  getGalleryThemeBySlug,
  getThemeCount,
  getThemeImages,
} from '@/content/gallery';

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
            Galerie · {getThemeCount(theme)} Bilder
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
        className='bg-background pb-20 sm:pb-24 lg:pb-28'
      >
        <GalleryFilmStrip images={images} themeName={theme.name} onImageClick={setLightboxIndex} />
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
          <ul className='grid list-none grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4'>
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
