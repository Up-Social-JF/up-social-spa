import { ArrowUpRight } from 'lucide-react';
import { CTABanner } from '@/components/layout/cta-banner';
import { MotionInView } from '@/components/motion/motion-in-view';
import { contactChannels } from '@/content/contact';
import { founder } from '@/content/founder';
import { galleryThemes, getImageSrc, getImageSrcSet } from '@/content/gallery';
import { cn } from '@/utils/cn';

const longParagraphs = [
  'Ich heiße Julian Frey und arbeite als Fotograf und Marken-Builder aus München. Die Kombination ist kein Zufall — mein Blick fürs Bild ist die Grundlage für alles, was wir bei UpSocial bauen.',
  'Vor UpSocial habe ich Marken aus Gastronomie, Design und Handwerk fotografiert. Dabei wurde mir klar: Bilder sind selten das Problem. Das Problem ist, dass sie selten zur Marke geführt werden — kein klarer Auftritt, kein Rhythmus, kein Plan, was mit dem Material passiert.',
  'Mit UpSocial schließe ich diese Lücke. Wir starten oft mit Fotografie, weil das mein Handwerk ist. Aber wir hören da nicht auf. Social, Ads, Website und kleine Shops gehören für mich zusammengedacht.',
  'Mein Anspruch: Auftritte, die ruhig wirken und trotzdem klar Conversion machen. Kein Hype, kein "Buzz" — sondern Bildwelten, die im Alltag der Marke funktionieren.',
  'Ich arbeite persönlich. Du sprichst direkt mit mir, nicht mit einem Account-Team. Und ich sage offen, wenn etwas keinen Sinn ergibt — bevor du Geld dafür ausgibst.',
];

const behindTheScenes = [
  galleryThemes.find((theme) => theme.slug === 'food')!.cover,
  galleryThemes.find((theme) => theme.slug === 'events')!.cover,
  galleryThemes.find((theme) => theme.slug === 'industrial')!.cover,
  galleryThemes.find((theme) => theme.slug === 'nature')!.cover,
];

export function AboutPage() {
  return (
    <>
      <section className='relative overflow-hidden bg-[var(--color-bg-secondary)]/55 px-5 pb-16 pt-28 text-foreground sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-40'>
        <MotionInView
          as='div'
          amount={0.25}
          staggerChildren={0.1}
          className='mx-auto grid max-w-[var(--max-width-page)] gap-10 lg:grid-cols-[5fr_6fr] lg:items-center lg:gap-16'
        >
          <figure className='relative isolate aspect-[4/5] overflow-hidden bg-[var(--color-bg-tertiary)]'>
            <picture>
              <source srcSet={getImageSrcSet(founder.portrait, 'avif')} type='image/avif' />
              <source srcSet={getImageSrcSet(founder.portrait, 'webp')} type='image/webp' />
              <img
                src={getImageSrc(founder.portrait, 'lg')}
                alt={`${founder.name}, ${founder.role}`}
                fetchPriority='high'
                decoding='async'
                className='h-full w-full object-cover object-center'
              />
            </picture>
            <span
              aria-hidden='true'
              className='pointer-events-none absolute inset-0 ring-1 ring-inset ring-[var(--ink)]/10'
            />
          </figure>
          <div className='max-w-2xl'>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
              Über JF
            </p>
            <h1 className='mt-4 text-[clamp(2.6rem,6.5vw,5.25rem)] font-light leading-[0.96] tracking-[-0.045em] text-balance text-foreground'>
              {founder.name}.
            </h1>
            <p className='mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg'>
              {founder.role}
            </p>
            <p className='mt-2 text-sm uppercase tracking-[0.2em] text-muted-foreground'>
              München · DACH
            </p>
          </div>
        </MotionInView>
      </section>

      <section
        aria-labelledby='about-story'
        className='bg-background px-5 py-20 text-foreground sm:px-8 sm:py-24 lg:px-10 lg:py-28'
      >
        <MotionInView as='div' className='mx-auto max-w-[var(--max-width-content)]'>
          <h2
            id='about-story'
            className='font-display text-3xl font-light leading-tight tracking-[-0.025em] text-foreground sm:text-4xl'
          >
            Wie ich arbeite.
          </h2>
          <div className='mt-7 space-y-5 text-base leading-relaxed text-foreground/85 sm:text-lg'>
            {longParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <p
            aria-hidden='true'
            className='mt-10 font-display text-3xl font-light italic leading-none text-[var(--accent-readable)] sm:text-4xl'
          >
            — {founder.signature}
          </p>
        </MotionInView>
      </section>

      <section
        aria-label='Behind the scenes'
        className='bg-[var(--color-bg-secondary)]/40 px-5 py-20 text-foreground sm:px-8 sm:py-24 lg:px-10 lg:py-28'
      >
        <MotionInView
          as='div'
          amount={0.15}
          staggerChildren={0.08}
          className='mx-auto grid max-w-[var(--max-width-page)] gap-10'
        >
          <header className='max-w-2xl'>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
              Hinter der Kamera
            </p>
            <h2 className='mt-3 font-display text-3xl font-light leading-tight tracking-[-0.025em] text-foreground sm:text-4xl'>
              Eindrücke aus dem Alltag.
            </h2>
          </header>
          <ul className='grid list-none grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4'>
            {behindTheScenes.map((image, index) => (
              <li
                key={image.base}
                className={cn(
                  'overflow-hidden bg-[var(--color-bg-tertiary)]',
                  index % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[1/1] sm:aspect-[4/5]'
                )}
              >
                <picture>
                  <source srcSet={getImageSrcSet(image, 'avif')} type='image/avif' />
                  <source srcSet={getImageSrcSet(image, 'webp')} type='image/webp' />
                  <img
                    src={getImageSrc(image, 'md')}
                    alt={image.alt}
                    loading='lazy'
                    decoding='async'
                    className='h-full w-full object-cover object-center'
                  />
                </picture>
              </li>
            ))}
          </ul>
        </MotionInView>
      </section>

      <section
        aria-labelledby='about-direct-contact'
        className='bg-background px-5 py-20 text-foreground sm:px-8 sm:py-24 lg:px-10 lg:py-28'
      >
        <MotionInView
          as='div'
          className='mx-auto grid max-w-[var(--max-width-page)] gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16'
        >
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
              Direkter Kontakt
            </p>
            <h2
              id='about-direct-contact'
              className='mt-4 font-display text-3xl font-light leading-tight tracking-[-0.025em] text-foreground sm:text-4xl'
            >
              Schreib mir direkt.
            </h2>
            <p className='mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg'>
              WhatsApp, Instagram oder Mail — antwortet bei mir persönlich, kein Posteingang-Team.
            </p>
          </div>
          <ul className='grid list-none gap-px border border-border bg-border'>
            {contactChannels.map((channel) => (
              <li key={channel.label} className='bg-background'>
                <a
                  href={channel.disabled ? undefined : channel.href}
                  target={channel.external ? '_blank' : undefined}
                  rel={channel.external ? 'noreferrer' : undefined}
                  aria-disabled={channel.disabled || undefined}
                  className={cn(
                    'flex items-center justify-between gap-6 px-6 py-6 transition-colors duration-200 ease-editorial sm:px-8 sm:py-7',
                    channel.disabled
                      ? 'pointer-events-none cursor-not-allowed text-muted-foreground'
                      : 'hover:bg-[var(--color-bg-secondary)]/60 hover:text-[var(--accent-readable)]'
                  )}
                >
                  <div>
                    <span className='block font-display text-2xl font-light tracking-[-0.025em] sm:text-3xl'>
                      {channel.label}
                    </span>
                    <span className='mt-1 block text-sm text-muted-foreground'>{channel.note}</span>
                  </div>
                  <ArrowUpRight aria-hidden='true' className='size-5 shrink-0' />
                </a>
              </li>
            ))}
          </ul>
        </MotionInView>
      </section>

      <CTABanner headline='Lust, gemeinsam etwas zu bauen?' subject='Anfrage Über JF' />
    </>
  );
}
