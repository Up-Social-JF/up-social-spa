import { Link, Navigate, useParams } from 'react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCapabilityBySlug } from '@/content/capabilities';
import { getGalleryThemeBySlug } from '@/content/gallery';
import { site } from '@/content/site';

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PlaceholderPage({ eyebrow, title, description }: PlaceholderPageProps) {
  return (
    <section className='px-5 py-24 sm:px-8 lg:px-10 lg:py-32'>
      <div className='mx-auto max-w-[var(--max-width-page)]'>
        <p className='mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
          {eyebrow}
        </p>
        <h1 className='max-w-4xl text-4xl font-light leading-tight tracking-tight sm:text-6xl lg:text-7xl'>
          {title}
        </h1>
        <p className='mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
          {description}
        </p>
        <Button asChild className='mt-10'>
          <Link to='/kontakt'>
            {site.primaryCta}
            <ArrowUpRight aria-hidden='true' />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export function CapabilityDetailPlaceholder() {
  const { slug } = useParams();

  const capability = getCapabilityBySlug(slug);

  if (!capability) {
    return <Navigate to='/404' replace />;
  }

  return (
    <PlaceholderPage
      eyebrow='Leistung'
      title={capability.name}
      description={capability.description}
    />
  );
}

export function GalleryThemePlaceholder() {
  const { theme } = useParams();

  const galleryTheme = getGalleryThemeBySlug(theme);

  if (!galleryTheme) {
    return <Navigate to='/404' replace />;
  }

  return (
    <PlaceholderPage
      eyebrow='Galerie Thema'
      title={galleryTheme.name}
      description={galleryTheme.description}
    />
  );
}

export function LegalPlaceholder({ type }: { type: 'Impressum' | 'Datenschutz' }) {
  return (
    <section className='px-5 py-24 sm:px-8 lg:px-10 lg:py-32'>
      <article className='mx-auto max-w-[var(--max-width-content)]'>
        <h1 className='text-4xl font-light tracking-tight sm:text-5xl'>{type}</h1>
        <p className='mt-8 leading-relaxed text-muted-foreground'>
          Platzhaltertext. Die finalen rechtlichen Angaben werden ergänzt, sobald Julian die
          Produktionsdaten liefert.
        </p>
      </article>
    </section>
  );
}

export function NotFoundPage() {
  return (
    <section className='px-5 py-24 sm:px-8 lg:px-10 lg:py-32'>
      <div className='mx-auto max-w-[var(--max-width-page)]'>
        <Link
          to='/'
          className='inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-[var(--accent-readable)]'
        >
          <ArrowLeft aria-hidden='true' className='size-4' />
          Zur Startseite
        </Link>
        <h1 className='mt-8 max-w-3xl text-5xl font-light leading-tight tracking-tight sm:text-7xl'>
          Diese Seite gibt es nicht — aber Bilder schon.
        </h1>
        <Button asChild className='mt-10'>
          <Link to='/galerie'>Zur Galerie</Link>
        </Button>
      </div>
    </section>
  );
}
