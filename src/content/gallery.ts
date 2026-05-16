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
  count: number;
};

function imageSet(folder: string, name: string, alt: string): ImageVariantSet {
  return {
    base: `/images/${folder}/${name}/${name}`,
    alt,
  };
}

export const galleryThemes: GalleryTheme[] = [
  {
    slug: 'food',
    name: 'Food',
    folder: 'Food',
    filePrefix: 'food',
    description: 'Food-Motive für Restaurants, Cafes und Produktkommunikation.',
    cover: imageSet('Food', 'food-23', 'Food-Fotografie mit ruhiger editorialer Stimmung'),
    count: 38,
  },
  {
    slug: 'events',
    name: 'Events',
    folder: 'Loaction',
    filePrefix: 'loaction',
    description: 'Atmosphäre, Räume und Begegnungen aus echten Situationen.',
    cover: imageSet('Loaction', 'loaction-10', 'Event- und Location-Fotografie'),
    count: 21,
  },
  {
    slug: 'people',
    name: 'People',
    folder: 'People',
    filePrefix: 'people',
    description: 'Portraits und Menschen als nahbarer Markenanker.',
    cover: imageSet('People', 'people-1', 'Editoriales Portrait einer Person'),
    count: 22,
  },
  {
    slug: 'nature',
    name: 'Nature',
    folder: 'Nature',
    filePrefix: 'nature',
    description: 'Natürliche Bildwelten mit Ruhe, Tiefe und Textur.',
    cover: imageSet('Nature', 'nature-23', 'Naturfotografie als ruhiger Markenraum'),
    count: 45,
  },
  {
    slug: 'industrial',
    name: 'Industrial',
    folder: 'Random',
    filePrefix: 'random',
    description: 'Strukturen, Materialität und Arbeitsumfelder.',
    cover: imageSet('Random', 'random-9', 'Strukturelle Industrie- und Detailfotografie'),
    count: 13,
  },
];

export function getThemeImages(theme: GalleryTheme): ImageVariantSet[] {
  return Array.from({ length: theme.count }, (_, index) => {
    const id = index + 1;
    return {
      base: `/images/${theme.folder}/${theme.filePrefix}-${id}/${theme.filePrefix}-${id}`,
      alt: `${theme.name} — Bild ${id}`,
    };
  });
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
