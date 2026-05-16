import { motion, type Variants } from 'motion/react';
import { MotionInView } from '@/components/motion/motion-in-view';
import { processSteps, type ProcessStep } from '@/content/process';
import { cn } from '@/utils/cn';

type ProcessSectionProps = {
  steps?: ProcessStep[];
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  id?: string;
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
  },
};

export function ProcessSection({
  steps = processSteps,
  eyebrow = 'Ablauf',
  title = 'In drei ruhigen Schritten zum Ergebnis.',
  description = 'Kein Pitch-Deck-Theater. Drei klare Stationen — vom Erstgespräch bis zum fertigen Material.',
  className,
  id,
}: ProcessSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby='process-headline'
      className={cn(
        'relative bg-[var(--color-bg-secondary)]/55 px-5 py-20 text-foreground sm:px-8 sm:py-24 lg:px-10 lg:py-28',
        className
      )}
    >
      <div className='mx-auto grid max-w-[var(--max-width-page)] gap-14'>
        <MotionInView as='header' className='max-w-3xl'>
          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
            {eyebrow}
          </p>
          <h2
            id='process-headline'
            className='mt-4 text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.02] tracking-[-0.04em] text-balance text-foreground'
          >
            {title}
          </h2>
          {description ? (
            <p className='mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
              {description}
            </p>
          ) : null}
        </MotionInView>

        <MotionInView
          as='ol'
          amount={0.2}
          staggerChildren={0.1}
          className='grid list-none grid-cols-1 gap-10 md:grid-cols-3 md:gap-8'
        >
          {steps.map((step) => (
            <motion.li
              key={step.number}
              variants={stepVariants}
              className='relative flex flex-col gap-4 border-t border-border pt-6'
            >
              <span
                aria-hidden='true'
                className='pointer-events-none absolute right-0 top-0 hidden h-px w-8 -translate-y-px bg-[var(--accent-readable)] md:block'
              />
              <span
                aria-hidden='true'
                className='font-display text-5xl font-light leading-none tracking-[-0.04em] text-[var(--accent-readable)] sm:text-6xl'
              >
                {step.number}
              </span>
              <h3 className='font-display text-2xl font-light leading-tight tracking-[-0.025em] text-foreground sm:text-3xl'>
                {step.title}
              </h3>
              <p className='text-sm leading-relaxed text-foreground/80 sm:text-base'>
                {step.description}
              </p>
            </motion.li>
          ))}
        </MotionInView>
      </div>
    </section>
  );
}
