import { motion, type Variants } from 'motion/react';
import { CapabilityCard } from '@/components/capability-card';
import { MotionInView } from '@/components/motion/motion-in-view';
import { capabilities, type Capability } from '@/content/capabilities';
import { cn } from '@/utils/cn';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
  },
};

type CapabilityGridProps = {
  items?: Capability[];
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  id?: string;
};

export function CapabilityGrid({
  items = capabilities,
  eyebrow = 'Leistungen',
  title,
  description,
  className,
  id,
}: CapabilityGridProps) {
  const hasIntro = Boolean(title || description);

  return (
    <section
      id={id}
      aria-labelledby={hasIntro ? 'capability-grid-title' : undefined}
      className={cn(
        'relative bg-background px-5 py-20 text-foreground sm:px-8 sm:py-24 lg:px-10 lg:py-28',
        className
      )}
    >
      <div className='mx-auto grid max-w-[var(--max-width-page)] gap-14'>
        {hasIntro ? (
          <MotionInView as='header' className='max-w-3xl'>
            {eyebrow ? (
              <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2
                id='capability-grid-title'
                className='mt-4 text-[clamp(2.2rem,5vw,4rem)] font-light leading-[0.96] tracking-[-0.04em] text-balance text-foreground'
              >
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className='mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
                {description}
              </p>
            ) : null}
          </MotionInView>
        ) : null}

        <MotionInView
          as='ul'
          amount={0.15}
          staggerChildren={0.08}
          className='grid list-none grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3'
        >
          {items.map((capability) => (
            <motion.li key={capability.slug} variants={itemVariants} className='flex'>
              <CapabilityCard capability={capability} className='flex-1' />
            </motion.li>
          ))}
        </MotionInView>
      </div>
    </section>
  );
}
