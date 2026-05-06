import { CapabilityGrid } from '@/components/capability-grid';
import { CTABanner } from '@/components/layout/cta-banner';
import { PageHero } from '@/components/page-hero';
import { pageIntros } from '@/content/site';

export function LeistungenPage() {
  return (
    <>
      <PageHero
        eyebrow={pageIntros.leistungen.eyebrow}
        title={pageIntros.leistungen.title}
        description={pageIntros.leistungen.description}
      />
      <CapabilityGrid />
      <CTABanner />
    </>
  );
}
