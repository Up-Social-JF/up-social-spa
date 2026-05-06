import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { getImageSrc, getImageSrcSet, galleryThemes } from '@/content/gallery';
import { site } from '@/content/site';
import { useAppDispatch } from '@/store/store';
import { actions as contactPanelActions } from '@/store/slices/contact-panel-slice';

const heroImage = galleryThemes.find((theme) => theme.slug === 'nature')!.cover;

export function Main() {
  const dispatch = useAppDispatch();

  return (
    <section className='relative min-h-svh overflow-hidden bg-[var(--ink)] text-[var(--paper)]'>
      <picture>
        <source srcSet={getImageSrcSet(heroImage, 'avif')} type='image/avif' />
        <source srcSet={getImageSrcSet(heroImage, 'webp')} type='image/webp' />
        <img
          src={getImageSrc(heroImage, 'xl')}
          alt={heroImage.alt}
          className='absolute inset-0 h-full w-full object-cover object-center opacity-88'
        />
      </picture>
      <div className='absolute inset-0 bg-[linear-gradient(180deg,rgb(10_10_10_/_68%)_0%,rgb(10_10_10_/_10%)_36%,rgb(10_10_10_/_82%)_100%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgb(100_114_95_/_34%),transparent_34rem)]' />

      <div className='relative z-10 flex min-h-svh flex-col justify-end px-4 pb-6 pt-28 sm:px-7 sm:pb-8 lg:px-10 lg:pb-10'>
        <div className='max-w-5xl'>
          <p className='mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--paper)]/75'>
            München / Photography-led Marketing
          </p>
          <h1 className='max-w-[9ch] text-[clamp(3.4rem,15vw,9.8rem)] font-light leading-[0.88] tracking-[-0.075em] text-balance'>
            Bilder, die Marken tragen.
          </h1>
          <p className='mt-5 max-w-md text-base leading-relaxed text-[var(--paper)]/82 sm:text-lg'>
            Fotografie, Social, Ads und Web aus einer Hand.
          </p>
          <div className='mt-7 flex flex-col gap-3 sm:flex-row'>
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
          </div>
        </div>
      </div>
    </section>
  );
}
