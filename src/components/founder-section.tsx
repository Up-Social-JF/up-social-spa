import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { MotionInView } from '@/components/motion/motion-in-view';
import { founder } from '@/content/founder';
import { cn } from '@/utils/cn';

type FounderSectionProps = {
  className?: string;
  id?: string;
};

export function FounderSection({ className, id }: FounderSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby='founder-headline'
      className={cn(
        'relative bg-background px-5 py-20 text-foreground sm:px-8 sm:py-24 lg:px-10 lg:py-28',
        className
      )}
    >
      <MotionInView
        as='div'
        amount={0.2}
        staggerChildren={0.12}
        className='mx-auto grid max-w-[var(--max-width-page)] gap-10 lg:grid-cols-[5fr_6fr] lg:items-center lg:gap-16'
      >
        <figure className='relative isolate aspect-[4/5] w-full overflow-hidden bg-[var(--color-bg-secondary)] sm:aspect-[3/4] lg:aspect-[4/5]'>
          <img
            src={founder.portrait}
            alt={`Portrait von ${founder.name}, ${founder.role}`}
            loading='lazy'
            decoding='async'
            className='h-full w-full object-cover object-center'
          />
          <span
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 ring-1 ring-inset ring-[var(--ink)]/8'
          />
          <figcaption className='absolute bottom-4 left-4 inline-flex items-center gap-3 bg-[var(--paper)]/92 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--ink)] backdrop-blur sm:bottom-5 sm:left-5'>
            <span className='size-1.5 rounded-full bg-[var(--accent)]' />
            {founder.name} · München
          </figcaption>
        </figure>

        <div className='max-w-2xl'>
          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
            {founder.eyebrow}
          </p>
          <h2
            id='founder-headline'
            className='mt-4 text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.02] tracking-[-0.04em] text-balance text-foreground'
          >
            {founder.headline}
          </h2>

          <div className='mt-7 space-y-5 text-base leading-relaxed text-foreground/85 sm:text-lg'>
            {founder.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <p
            aria-hidden='true'
            className='mt-8 font-display text-3xl font-light italic leading-none text-[var(--accent-readable)] sm:text-4xl'
          >
            — {founder.signature}
          </p>

          <Link
            to={founder.ctaHref}
            className='group mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-foreground transition-colors duration-200 ease-editorial hover:text-[var(--accent-readable)]'
          >
            {founder.ctaLabel}
            <ArrowUpRight
              aria-hidden='true'
              className='size-4 transition-transform duration-200 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
            />
          </Link>
        </div>
      </MotionInView>
    </section>
  );
}
