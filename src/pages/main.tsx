import { CapabilityGrid } from '@/components/capability-grid';
import { FounderSection } from '@/components/founder-section';
import { GalleryTeaser } from '@/components/gallery-teaser';
import { HomeHero } from '@/components/home-hero';
import { ProcessSection } from '@/components/process-section';
import { CTABanner } from '@/components/layout/cta-banner';
import { pageIntros } from '@/content/site';

export function Main() {
  return (
    <>
      <HomeHero />
      <CapabilityGrid
        id='leistungen'
        eyebrow={pageIntros.leistungen.eyebrow}
        title={pageIntros.leistungen.title}
        description={pageIntros.leistungen.description}
      />
      <FounderSection id='ueber' />
      <ProcessSection />
      <GalleryTeaser id='galerie' />
      <CTABanner id='kontakt' />
    </>
  );
}
