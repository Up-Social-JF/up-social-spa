import { ArrowUpRight, Clock } from 'lucide-react';
import { MotionInView } from '@/components/motion/motion-in-view';
import { PageHero } from '@/components/page-hero';
import { contactChannels } from '@/content/contact';
import { pageIntros } from '@/content/site';
import { cn } from '@/utils/cn';

export function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow={pageIntros.kontakt.eyebrow}
        title={pageIntros.kontakt.title}
        description='WhatsApp, Instagram oder Mail — direkt. Buchungen über Calendly folgen in Kürze.'
      />

      <section
        aria-label='Kontaktkanäle'
        className='bg-background px-5 pb-20 text-foreground sm:px-8 sm:pb-24 lg:px-10 lg:pb-28'
      >
        <MotionInView
          as='ul'
          amount={0.15}
          staggerChildren={0.08}
          className='mx-auto grid max-w-[var(--max-width-page)] list-none grid-cols-1 gap-px border border-border bg-border md:grid-cols-2'
        >
          {contactChannels.map((channel) => (
            <li key={channel.label} className='bg-background'>
              <a
                href={channel.disabled ? undefined : channel.href}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noreferrer' : undefined}
                aria-disabled={channel.disabled || undefined}
                className={cn(
                  'group flex h-full items-end justify-between gap-6 px-6 py-10 transition-colors duration-300 ease-editorial sm:px-10 sm:py-14',
                  channel.disabled
                    ? 'pointer-events-none cursor-not-allowed text-muted-foreground'
                    : 'hover:bg-[var(--color-bg-secondary)]/55 hover:text-[var(--accent-readable)]'
                )}
              >
                <div>
                  <span className='block text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
                    Kanal
                  </span>
                  <span className='mt-3 block font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1] tracking-[-0.04em]'>
                    {channel.label}
                  </span>
                  <span className='mt-2 block text-sm text-muted-foreground sm:text-base'>
                    {channel.note}
                  </span>
                </div>
                <span
                  aria-hidden='true'
                  className='inline-flex size-12 shrink-0 items-center justify-center border border-border transition-all duration-300 ease-editorial group-hover:border-[var(--accent-readable)] group-hover:translate-x-1 group-hover:-translate-y-1'
                >
                  {channel.disabled ? (
                    <Clock className='size-5' aria-hidden='true' />
                  ) : (
                    <ArrowUpRight className='size-5' aria-hidden='true' />
                  )}
                </span>
              </a>
            </li>
          ))}
        </MotionInView>
      </section>

      <section
        aria-label='Standort'
        className='bg-[var(--color-bg-secondary)]/55 px-5 py-16 text-foreground sm:px-8 sm:py-20 lg:px-10 lg:py-24'
      >
        <MotionInView
          as='div'
          className='mx-auto flex max-w-[var(--max-width-page)] flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between'
        >
          <p className='font-display text-2xl font-light tracking-[-0.025em] text-foreground sm:text-3xl'>
            Aus München. Für ganz DACH.
          </p>
          <p className='text-sm uppercase tracking-[0.2em] text-muted-foreground'>
            Antwort meist innerhalb 24h
          </p>
        </MotionInView>
      </section>
    </>
  );
}
