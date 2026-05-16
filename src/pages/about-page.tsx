import { CTABanner } from '@/components/layout/cta-banner';
import { MotionInView } from '@/components/motion/motion-in-view';
import { founder } from '@/content/founder';

const longParagraphs = [
  'Ich heiße Julian Frey und arbeite als Fotograf und Marken-Builder aus München. Die Kombination ist kein Zufall — mein Blick fürs Bild ist die Grundlage für alles, was wir bei UpSocial bauen.',
  'Vor UpSocial habe ich Marken aus Gastronomie, Design und Handwerk fotografiert. Dabei wurde mir klar: Bilder sind selten das Problem. Das Problem ist, dass sie selten zur Marke geführt werden — kein klarer Auftritt, kein Rhythmus, kein Plan, was mit dem Material passiert.',
  'Mit UpSocial schließe ich diese Lücke. Wir starten oft mit Fotografie, weil das mein Handwerk ist. Aber wir hören da nicht auf. Social, Ads, Website und kleine Shops gehören für mich zusammengedacht.',
  'Mein Anspruch: Auftritte, die ruhig wirken und trotzdem klar Conversion machen. Kein Hype, kein "Buzz" — sondern Bildwelten, die im Alltag der Marke funktionieren.',
  'Ich arbeite persönlich. Du sprichst direkt mit mir, nicht mit einem Account-Team. Und ich sage offen, wenn etwas keinen Sinn ergibt — bevor du Geld dafür ausgibst.',
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
            <img
              src={founder.portrait}
              alt={`${founder.name}, ${founder.role}`}
              fetchPriority='high'
              decoding='async'
              className='h-full w-full object-cover object-center'
            />
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

      <CTABanner headline='Lust, gemeinsam etwas zu bauen?' subject='Anfrage Über JF' />
    </>
  );
}
