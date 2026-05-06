export type NavItem = {
  label: string;
  href: string;
};

export const primaryNavItems: NavItem[] = [
  { label: 'Leistungen', href: '/leistungen' },
  { label: 'Galerie', href: '/galerie' },
  { label: 'Über JF', href: '/ueber-jf' },
  { label: 'Kontakt', href: '/kontakt' },
];

export const legalNavItems: NavItem[] = [
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
];
