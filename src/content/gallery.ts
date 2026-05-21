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
  ids: number[];
};

function imageSet(folder: string, name: string, alt: string): ImageVariantSet {
  return {
    base: `/images/${folder}/${name}/${name}`,
    alt,
  };
}

const naturIds = [7, 2, 11, 4, 9, 1, 12, 6, 8, 3, 10, 5];

const peopleIds = [
  22, 3, 38, 13, 28, 9, 41, 17, 31, 4, 25, 44, 36, 1, 18, 42, 8, 33, 15, 21, 39, 2, 12, 37, 54, 16,
  32, 26, 43, 34, 40,
];

const zgkIds = [
  14, 3, 22, 8, 17, 25, 1, 11, 19, 5, 27, 13, 9, 21, 4, 16, 23, 7, 20, 12, 2, 18, 26, 10, 24, 6, 15,
];

export const heroImage: ImageVariantSet = imageSet(
  'Natur',
  'natur-5',
  'Naturfotografie als ruhiger Markenraum'
);

export const galleryThemes: GalleryTheme[] = [
  {
    slug: 'nature',
    name: 'Nature',
    folder: 'Natur',
    filePrefix: 'natur',
    description: 'Natürliche Bildwelten mit Ruhe, Tiefe und Textur.',
    cover: imageSet('Natur', 'natur-5', 'Naturfotografie als ruhiger Markenraum'),
    ids: naturIds,
  },
  {
    slug: 'people',
    name: 'People',
    folder: 'People',
    filePrefix: 'people',
    description: 'Portraits und Menschen als nahbarer Markenanker.',
    cover: imageSet('People', 'people-22', 'Editoriales Portrait einer Person'),
    ids: peopleIds,
  },
  {
    slug: 'zgk',
    name: 'Zum Goldenen Kalb',
    folder: 'ZGK',
    filePrefix: 'zgk',
    description: 'Atmosphäre, Räume und Begegnungen aus dem Zum Goldenen Kalb.',
    cover: imageSet('ZGK', 'zgk-1', 'Zum Goldenen Kalb — Atmosphäre und Räume'),
    ids: zgkIds,
  },
];

export function getThemeImages(theme: GalleryTheme): ImageVariantSet[] {
  return theme.ids.map((id) => ({
    base: `/images/${theme.folder}/${theme.filePrefix}-${id}/${theme.filePrefix}-${id}`,
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
