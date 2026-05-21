import { motion, type Variants } from 'motion/react';
import { CTABanner } from '@/components/layout/cta-banner';
import { GalleryTile } from '@/components/gallery-tile';
import { MotionInView } from '@/components/motion/motion-in-view';
import { PageHero } from '@/components/page-hero';
import { galleryThemes } from '@/content/gallery';
import { pageIntros } from '@/content/site';

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
  },
};

export function GaleriePage() {
  return (
    <>
      <PageHero
        eyebrow={pageIntros.galerie.eyebrow}
        title={pageIntros.galerie.title}
        description={pageIntros.galerie.description}
      />

      <section
        aria-label='Galerie Themen'
        className='relative bg-background px-5 pb-20 text-foreground sm:px-8 sm:pb-24 lg:px-10 lg:pb-28'
      >
        <MotionInView
          as='ul'
          amount={0.1}
          staggerChildren={0.1}
          className='mx-auto grid max-w-[var(--max-width-page)] list-none grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-12'
        >
          {galleryThemes.map((theme) => (
            <motion.li key={theme.slug} variants={tileVariants}>
              <GalleryTile theme={theme} size='editorial' />
            </motion.li>
          ))}
        </MotionInView>
      </section>

      <CTABanner />
    </>
  );
}
