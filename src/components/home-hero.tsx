import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { galleryThemes, getImageSrc, getImageSrcSet } from '@/content/gallery';
import { site } from '@/content/site';
import { actions as contactPanelActions } from '@/store/slices/contact-panel-slice';
import { useAppDispatch } from '@/store/store';

const heroImage = galleryThemes.find((theme) => theme.slug === 'nature')!.cover;

const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.12,
    },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] },
  },
};

export function HomeHero() {
  const dispatch = useAppDispatch();
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], shouldReduceMotion ? [0, 0] : [0, 90]);
  const imageScale = useTransform(scrollY, [0, 600], shouldReduceMotion ? [1, 1] : [1.05, 1.12]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [1, 0.78]);

  return (
    <section className='relative min-h-svh overflow-hidden bg-[var(--ink)] text-[var(--paper)]'>
      <motion.div
        aria-hidden='true'
        className='absolute inset-0'
        style={{ y: imageY, scale: imageScale }}
      >
        <picture>
          <source srcSet={getImageSrcSet(heroImage, 'avif')} type='image/avif' />
          <source srcSet={getImageSrcSet(heroImage, 'webp')} type='image/webp' />
          <img
            src={getImageSrc(heroImage, 'xl')}
            alt=''
            fetchPriority='high'
            decoding='async'
            className='absolute inset-0 h-full w-full object-cover object-center opacity-88'
          />
        </picture>
      </motion.div>

      <span className='sr-only'>{heroImage.alt}</span>

      <motion.div
        aria-hidden='true'
        style={{ opacity: overlayOpacity }}
        className='absolute inset-0 bg-[linear-gradient(180deg,rgb(10_10_10_/_68%)_0%,rgb(10_10_10_/_10%)_36%,rgb(10_10_10_/_82%)_100%)]'
      />
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgb(100_114_95_/_34%),transparent_34rem)]'
      />

      <motion.div
        initial='hidden'
        animate='visible'
        variants={heroStagger}
        className='relative z-10 flex min-h-svh flex-col justify-end px-4 pb-16 pt-28 sm:px-7 sm:pb-20 lg:px-10 lg:pb-24'
      >
        <div className='max-w-5xl'>
          <motion.p
            variants={heroItem}
            className='mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--paper)]/75'
          >
            München / Photography-led Marketing
          </motion.p>
          <motion.h1
            variants={heroItem}
            className='max-w-[9ch] text-[clamp(3.4rem,15vw,9.8rem)] font-light leading-[0.88] tracking-[-0.075em] text-balance'
          >
            Bilder, die Marken tragen.
          </motion.h1>
          <motion.p
            variants={heroItem}
            className='mt-5 max-w-md text-base leading-relaxed text-[var(--paper)]/82 sm:text-lg'
          >
            Fotografie, Social, Ads und Web aus einer Hand.
          </motion.p>
          <motion.div variants={heroItem} className='mt-7 flex flex-col gap-3 sm:flex-row'>
            <Button
              type='button'
              size='lg'
              onClick={() => dispatch(contactPanelActions.open())}
              aria-haspopup='dialog'
              className='border-[var(--paper)] bg-[var(--paper)] text-[var(--ink)]'
            >
              {site.primaryCta}
              <ArrowUpRight aria-hidden='true' />
            </Button>
            <Button
              asChild
              variant='outline'
              size='lg'
              className='border-[var(--paper)]/55 text-[var(--paper)] hover:border-[var(--paper)] hover:bg-[var(--paper)] hover:text-[var(--ink)]'
            >
              <Link to='/galerie'>Arbeiten sehen</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href='#leistungen'
        aria-label='Zum nächsten Abschnitt scrollen'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className='absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--paper)]/65 transition-colors hover:text-[var(--paper)] focus-visible:text-[var(--paper)] sm:flex'
      >
        <span>Scroll</span>
        <motion.span
          aria-hidden='true'
          animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
          className='inline-flex'
        >
          <ArrowDown className='size-4' />
        </motion.span>
      </motion.a>
    </section>
  );
}
