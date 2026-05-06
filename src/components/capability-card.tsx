import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import type { Capability } from '@/content/capabilities';
import { site } from '@/content/site';
import { cn } from '@/utils/cn';

type CapabilityCardProps = {
  capability: Capability;
  className?: string;
};

export function CapabilityCard({ capability, className }: CapabilityCardProps) {
  const detailHref = `/leistungen/${capability.slug}`;

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col gap-6 border border-border bg-[var(--color-bg-secondary)]/50 p-7 transition-colors duration-300 ease-editorial hover:border-[var(--accent-readable)] hover:bg-[var(--color-bg-secondary)] sm:p-8',
        className
      )}
    >
      <div className='flex items-baseline justify-between gap-4'>
        <span
          aria-hidden='true'
          className='font-display text-5xl font-light leading-none tracking-[-0.04em] text-[var(--accent-readable)] sm:text-6xl'
        >
          {capability.number}
        </span>
        <span className='inline-flex size-9 items-center justify-center border border-border text-[var(--accent-readable)] transition-all duration-300 ease-editorial group-hover:border-[var(--accent-readable)] group-hover:translate-x-1 group-hover:-translate-y-1'>
          <ArrowUpRight aria-hidden='true' className='size-4' />
        </span>
      </div>

      <header className='space-y-2'>
        <h3 className='font-display text-2xl font-light leading-tight tracking-[-0.025em] text-foreground sm:text-3xl'>
          {capability.name}
        </h3>
        <p className='text-sm leading-relaxed text-muted-foreground sm:text-base'>
          {capability.subtitle}
        </p>
      </header>

      <ul className='mt-auto grid gap-2 border-t border-border pt-5 text-sm text-foreground/85'>
        {capability.bullets.map((bullet) => (
          <li
            key={bullet}
            className='before:mr-3 before:inline-block before:size-1 before:translate-y-[-3px] before:rounded-full before:bg-[var(--accent-readable)]'
          >
            {bullet}
          </li>
        ))}
      </ul>

      <Link
        to={detailHref}
        aria-label={`${site.secondaryCta} über ${capability.name}`}
        className='absolute inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2'
      >
        <span className='sr-only'>
          {site.secondaryCta} über {capability.name}
        </span>
      </Link>

      <span
        aria-hidden='true'
        className='pointer-events-none absolute bottom-5 right-7 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-readable)] opacity-0 transition-opacity duration-300 ease-editorial group-hover:opacity-100 group-focus-within:opacity-100 sm:right-8'
      >
        {site.secondaryCta}
      </span>
    </article>
  );
}
