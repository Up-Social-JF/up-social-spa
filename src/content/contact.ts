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
    href: 'https://wa.me/4917621384822',
    note: 'Direkt schreiben',
    external: true,
  },
  {
    label: 'Telefon',
    href: 'tel:+4917621384822',
    note: 'Direkt anrufen',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/up_socialbyjf?igsh=MW5taTRud2loaWZybw==',
    note: 'DM senden',
    external: true,
  },
  {
    label: 'E-Mail',
    href: 'mailto:info@up-social.de',
    note: 'Projekt anfragen',
  },
  {
    label: 'Termin buchen',
    href: '#',
    note: 'In Kürze verfügbar',
    disabled: true,
  },
];
