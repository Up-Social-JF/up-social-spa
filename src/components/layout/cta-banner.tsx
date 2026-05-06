import { ArrowUpRight } from 'lucide-react';
import { MotionInView } from '@/components/motion/motion-in-view';
import { Button } from '@/components/ui/button';
import { site } from '@/content/site';
import { actions as contactPanelActions } from '@/store/slices/contact-panel-slice';
import { useAppDispatch } from '@/store/store';
import { cn } from '@/utils/cn';

type CTABannerProps = {
  headline?: string;
  eyebrow?: string;
  ctaLabel?: string;
  subject?: string;
  className?: string;
  id?: string;
};

export function CTABanner({
  headline = 'Lass uns über dein Projekt sprechen.',
  eyebrow = 'Kontakt',
  ctaLabel = site.primaryCta,
  subject,
  className,
  id,
}: CTABannerProps) {
  const dispatch = useAppDispatch();

  return (
    <MotionInView
      as='section'
      id={id}
      aria-labelledby='cta-banner-headline'
      className={cn(
        'relative overflow-hidden border-y border-border bg-[var(--color-bg-secondary)] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28',
        className
      )}
      staggerChildren={0.08}
    >
      <span
        aria-hidden='true'
        className='pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-[radial-gradient(circle,rgb(100_114_95_/_18%),transparent_70%)]'
      />
      <span
        aria-hidden='true'
        className='pointer-events-none absolute -bottom-40 -left-24 size-[26rem] rounded-full bg-[radial-gradient(circle,rgb(100_114_95_/_10%),transparent_70%)]'
      />

      <div className='relative mx-auto grid max-w-[var(--max-width-page)] gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16'>
        <div className='max-w-3xl'>
          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
            {eyebrow}
          </p>
          <h2
            id='cta-banner-headline'
            className='mt-4 text-[clamp(2.4rem,6vw,4.75rem)] font-light leading-[0.96] tracking-[-0.045em] text-balance text-foreground'
          >
            {headline}
          </h2>
        </div>

        <div className='flex flex-wrap items-center gap-3'>
          <span aria-hidden='true' className='hidden h-px w-12 bg-border lg:block' />
          <Button
            type='button'
            size='lg'
            onClick={() => dispatch(contactPanelActions.open(subject ? { subject } : undefined))}
            aria-haspopup='dialog'
          >
            {ctaLabel}
            <ArrowUpRight aria-hidden='true' />
          </Button>
        </div>
      </div>
    </MotionInView>
  );
}
