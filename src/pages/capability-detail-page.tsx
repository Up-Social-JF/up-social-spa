import { Navigate, useParams } from 'react-router';
import { CapabilityCard } from '@/components/capability-card';
import { CTABanner } from '@/components/layout/cta-banner';
import { MotionInView } from '@/components/motion/motion-in-view';
import { ProcessSection } from '@/components/process-section';
import { capabilities, getCapabilityBySlug } from '@/content/capabilities';

export function CapabilityDetailPage() {
  const { slug } = useParams();
  const capability = getCapabilityBySlug(slug);

  if (!capability) {
    return <Navigate to='/404' replace />;
  }

  const others = capabilities.filter((item) => item.slug !== capability.slug).slice(0, 3);

  return (
    <>
      <MotionInView
        as='header'
        amount={0.4}
        className='relative bg-[var(--color-bg-secondary)]/55 px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-40'
      >
        <div className='mx-auto grid max-w-[var(--max-width-page)] gap-6'>
          <div className='flex items-baseline gap-6'>
            <span
              aria-hidden='true'
              className='font-display text-[clamp(4rem,11vw,9rem)] font-light leading-none tracking-[-0.06em] text-[var(--accent-readable)]'
            >
              {capability.number}
            </span>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground'>
              Leistung
            </p>
          </div>
          <h1 className='max-w-5xl text-[clamp(3rem,9vw,7rem)] font-light leading-[0.94] tracking-[-0.05em] text-balance hyphens-auto break-words text-foreground'>
            {capability.name}
          </h1>
          <p className='max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
            {capability.subtitle}
          </p>
        </div>
      </MotionInView>

      <section
        aria-labelledby='capability-description'
        className='bg-background px-5 py-20 text-foreground sm:px-8 sm:py-24 lg:px-10 lg:py-28'
      >
        <MotionInView
          as='div'
          className='mx-auto grid max-w-[var(--max-width-page)] gap-14 lg:grid-cols-[1fr_2fr] lg:gap-20'
        >
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
              Was wir liefern
            </p>
            <h2
              id='capability-description'
              className='mt-4 font-display text-3xl font-light leading-tight tracking-[-0.025em] text-foreground sm:text-4xl'
            >
              Schwerpunkte
            </h2>
            <ul className='mt-6 grid gap-3 text-base text-foreground/85 sm:text-lg'>
              {capability.bullets.map((item) => (
                <li
                  key={item}
                  className='flex items-baseline gap-3 border-t border-border pt-3 first:border-t-0 first:pt-0'
                >
                  <span
                    aria-hidden='true'
                    className='size-1.5 shrink-0 rounded-full bg-[var(--accent-readable)]'
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className='max-w-[640px]'>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
              Worum es geht
            </p>
            <div className='mt-4 space-y-5 text-base leading-relaxed text-foreground/85 sm:text-lg'>
              <p>{capability.description}</p>
              <p>
                Wir starten mit deinem Bildmaterial und deinem Angebot. Daraus entsteht ein
                Auftritt, der ohne Lautstärke funktioniert — ruhig, editorial, wiedererkennbar.
              </p>
              <p>
                Du bekommst klar definierte Deliverables, einen verbindlichen Zeitplan und einen
                Festpreis. Kein Stundenzettel, kein Pitch-Theater.
              </p>
            </div>
          </div>
        </MotionInView>
      </section>

      <ProcessSection title='So arbeiten wir.' eyebrow='Ablauf' />

      <section
        aria-labelledby='other-capabilities'
        className='bg-background px-5 py-20 text-foreground sm:px-8 sm:py-24 lg:px-10 lg:py-28'
      >
        <MotionInView as='div' className='mx-auto grid max-w-[var(--max-width-page)] gap-10'>
          <header className='flex flex-col justify-between gap-3 sm:flex-row sm:items-end'>
            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
                Weiter im Spektrum
              </p>
              <h2
                id='other-capabilities'
                className='mt-3 font-display text-3xl font-light leading-tight tracking-[-0.025em] text-foreground sm:text-4xl'
              >
                Andere Leistungen
              </h2>
            </div>
          </header>
          <ul className='grid list-none grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3'>
            {others.map((item) => (
              <li key={item.slug} className='flex'>
                <CapabilityCard capability={item} className='flex-1' />
              </li>
            ))}
          </ul>
        </MotionInView>
      </section>

      <CTABanner
        subject={`Anfrage UpSocial — ${capability.name}`}
        headline={`Lass uns über ${capability.name} sprechen.`}
      />
    </>
  );
}
