import { MotionInView } from '@/components/motion/motion-in-view';
import { cn } from '@/utils/cn';

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'start' | 'center';
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  align = 'start',
  className,
}: PageHeroProps) {
  return (
    <MotionInView
      as='header'
      amount={0.4}
      className={cn(
        'relative bg-background px-5 pb-12 pt-28 text-foreground sm:px-8 sm:pb-16 sm:pt-32 lg:px-10 lg:pb-20 lg:pt-40',
        className
      )}
    >
      <div
        className={cn(
          'mx-auto grid max-w-[var(--max-width-page)] gap-5',
          align === 'center' && 'place-items-center text-center'
        )}
      >
        {eyebrow ? (
          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
            {eyebrow}
          </p>
        ) : null}
        <h1 className='max-w-5xl text-[clamp(2.6rem,7vw,6rem)] font-light leading-[0.94] tracking-[-0.05em] text-balance text-foreground'>
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              'max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg',
              align === 'center' && 'mx-auto'
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </MotionInView>
  );
}
