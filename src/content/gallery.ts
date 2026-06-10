export type ImageVariantSet = {
  base: string;
  alt: string;
};

export type GalleryTheme = {
  slug: string;
  name: string;
  folder: string;
  filePrefix: string;
  description: string;
  cover: ImageVariantSet;
  ids: Array<number | string>;
};

function imageSet(folder: string, name: string, alt: string): ImageVariantSet {
  return {
    base: `/${folder}/${name}/${name}`,
    alt,
  };
}

const eventsIds: Array<number | string> = ['1N', '2N', '3N', '4N', '5N', '6N'];
const peopleIds = [22, 3, 38, 13, 28, 9, 41, 17, 31, 4, 25, 44, 36, 1, 18, 42, 8, 33, 15, 21];
const zgkIds: Array<number | string> = [
  1,
  2,
  3,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  18,
  19,
  21,
  23,
  24,
  25,
  26,
  27,
  '28N',
  '29N',
  '30N',
  '31N',
  '32N',
  '33N',
  '34N',
];

export const heroImage: ImageVariantSet = imageSet(
  'Webpage-Images/Natur',
  'natur-5',
  'Naturfotografie als ruhiger Markenraum'
);

export const galleryThemes: GalleryTheme[] = [
  {
    slug: 'nature',
    name: 'Nature',
    folder: 'Webpage-Images/Natur',
    filePrefix: 'natur',
    description: 'Natürliche Bildwelten mit Ruhe, Tiefe und Textur.',
    cover: imageSet('Webpage-Images/Natur', 'natur-5', 'Naturfotografie als ruhiger Markenraum'),
    ids: [9, 2, 6, '13N', 11, 4, 8, 12, 3, 7, 10, 5],
  },
  {
    slug: 'people',
    name: 'People',
    folder: 'Webpage-Images/People',
    filePrefix: 'people',
    description: 'Portraits und Menschen als nahbarer Markenanker.',
    cover: imageSet('Webpage-Images/People', 'people-1', 'People — Portraits und Begegnungen'),
    ids: peopleIds,
  },
  {
    slug: 'zgk',
    name: 'Zum Goldenen Kalb',
    folder: 'Webpage-Images/ZGK',
    filePrefix: 'zgk',
    description: 'Atmosphäre, Räume und Begegnungen aus dem Zum Goldenen Kalb.',
    cover: imageSet('Webpage-Images/ZGK', 'zgk-1', 'Zum Goldenen Kalb — Atmosphäre und Räume'),
    ids: zgkIds,
  },
  {
    slug: 'events',
    name: 'Events',
    folder: 'Webpage-Images/EVENTS',
    filePrefix: 'events',
    description: 'Live-Momente, Stimmung und echte Begegnungen auf Events.',
    cover: imageSet('Webpage-Images/EVENTS', 'events-1N', 'Events — Stimmung und Begegnungen'),
    ids: eventsIds,
  },
];

export function getThemeImages(theme: GalleryTheme): ImageVariantSet[] {
  return theme.ids.map((id) => ({
    base: `/${theme.folder}/${theme.filePrefix}-${id}/${theme.filePrefix}-${id}`,
    alt: `${theme.name} — Bild ${id}`,
  }));
}

export function getThemeCount(theme: GalleryTheme): number {
  return theme.ids.length;
}

export const gallerySlugs = galleryThemes.map((theme) => theme.slug);

export function getGalleryThemeBySlug(slug: string | undefined) {
  return galleryThemes.find((theme) => theme.slug === slug);
}

export function getImageSrc(image: ImageVariantSet, size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '4k') {
  return `${image.base}-${size}.jpg`;
}

export function getImageSrcSet(image: ImageVariantSet, format: 'avif' | 'webp') {
  return [
    `${image.base}-sm.${format} 640w`,
    `${image.base}-md.${format} 960w`,
    `${image.base}-xl.${format} 1600w`,
    `${image.base}-4k.${format} 2400w`,
  ].join(', ');
}
