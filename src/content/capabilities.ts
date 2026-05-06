export type Capability = {
  slug: string;
  number: string;
  name: string;
  subtitle: string;
  bullets: string[];
  description: string;
};

export const capabilities: Capability[] = [
  {
    slug: 'fotografie',
    number: '01',
    name: 'Photography',
    subtitle: 'Bilder, die den Auftritt tragen.',
    bullets: ['Portraits', 'Food & Product', 'Events', 'Campaign Looks'],
    description: 'Fotografie als Ausgangspunkt für Website, Social Media und Kampagnenmaterial.',
  },
  {
    slug: 'social-media',
    number: '02',
    name: 'Social Media',
    subtitle: 'Ein klarer Rhythmus für Instagram & Co.',
    bullets: ['Content Planung', 'Reels', 'Captions', 'Posting System'],
    description: 'Visuelle Inhalte werden in ein wiederholbares Social-System übersetzt.',
  },
  {
    slug: 'paid-ads',
    number: '03',
    name: 'Paid Ads',
    subtitle: 'Kampagnen ohne laute Agentur-Rhetorik.',
    bullets: ['Creative Testing', 'Meta Ads', 'Landing Pages', 'Reporting'],
    description: 'Anzeigen, die auf starken Bildern und verständlichen Botschaften basieren.',
  },
  {
    slug: 'websites',
    number: '04',
    name: 'Websites',
    subtitle: 'Ruhige Seiten mit klarer Conversion.',
    bullets: ['Landing Pages', 'Portfolio Sites', 'Copy Struktur', 'Launch Setup'],
    description: 'Websites, die Bildsprache, Positionierung und Kontaktaufnahme verbinden.',
  },
  {
    slug: 'seo-analytics',
    number: '05',
    name: 'SEO & Analytics',
    subtitle: 'Gefunden werden, ohne lauter zu werden.',
    bullets: ['Local SEO', 'Technical Basics', 'Umami', 'Reporting'],
    description: 'Messbarkeit und Auffindbarkeit als ruhige Grundlage für Wachstum.',
  },
  {
    slug: 'ecommerce-crm',
    number: '06',
    name: 'E-Commerce & CRM',
    subtitle: 'Shop und Kundendaten sauber verbunden.',
    bullets: ['Shop Setup', 'Product Content', 'Email Flows', 'CRM Basics'],
    description: 'Produkt, Shop und Kontaktpflege werden als ein System gedacht.',
  },
];

export const capabilitySlugs = capabilities.map((capability) => capability.slug);

export function getCapabilityBySlug(slug: string | undefined) {
  return capabilities.find((capability) => capability.slug === slug);
}
