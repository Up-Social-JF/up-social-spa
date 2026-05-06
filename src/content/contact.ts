export type ContactChannel = {
  label: string;
  href: string;
  note: string;
  external?: boolean;
  disabled?: boolean;
};

export const contactChannels: ContactChannel[] = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/',
    note: 'Direkt schreiben',
    external: true,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/',
    note: 'DM senden',
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:hallo@upsocial.example',
    note: 'Projekt anfragen',
  },
  {
    label: 'Termin buchen',
    href: '#',
    note: 'In Kürze verfügbar',
    disabled: true,
  },
];
