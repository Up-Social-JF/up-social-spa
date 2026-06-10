export type ImageVariantSet = {
  base: string;
  alt: string;
};

/** A single entry in the film strip — one image or a swipeable carousel of images. */
export type GalleryPost = {
  images: ImageVariantSet[];
};

/** An external video link shown as the leading tile in a theme's film strip. */
export type GalleryVideo = {
  href: string;
  label: string;
  /** Optional poster still; falls back to a graphic tile when omitted. */
  poster?: ImageVariantSet;
};

export type GalleryTheme = {
  slug: string;
  name: string;
  description: string;
  cover: ImageVariantSet;
  posts: GalleryPost[];
  /** CSS aspect-ratio for film-strip tiles, e.g. '16/9'. Defaults to '3/4'. */
  tileAspect?: string;
  /** Optional leading video tile (e.g. a customer testimonial). */
  video?: GalleryVideo;
};

function img(folder: string, name: string, alt: string): ImageVariantSet {
  return { base: `/Webpage-Images/${folder}/${name}/${name}`, alt };
}

function single(folder: string, prefix: string, id: number | string): GalleryPost {
  return { images: [img(folder, `${prefix}-${id}`, `${prefix} — Bild ${id}`)] };
}

export const heroImage: ImageVariantSet = img(
  'Natur',
  'natur-5',
  'Naturfotografie als ruhiger Markenraum'
);

// ─── ZGK ────────────────────────────────────────────────────────────────────

const ZGK = 'ZGK';

function amb(n: number): GalleryPost {
  return { images: [img(ZGK, `amb-${n}`, 'Zum Goldenen Kalb — Ambiente')] };
}

// shuffled order, fixed at build time
const ambientePosts: GalleryPost[] = [
  amb(7),
  amb(3),
  amb(11),
  amb(1),
  amb(9),
  amb(5),
  amb(12),
  amb(2),
  amb(8),
  amb(4),
  amb(10),
  amb(6),
];

const janbullPost: GalleryPost = {
  images: [
    img(ZGK, 'janbull-1', 'Jan Bull — Wagyu Beef'),
    img(ZGK, 'janbull-2', 'Jan Bull — Wagyu Beef'),
    img(ZGK, 'janbull-3', 'Jan Bull — Wagyu Beef'),
    img(ZGK, 'janbull-4', 'Jan Bull — Wagyu Beef'),
  ],
};

const herefordPost: GalleryPost = {
  images: [
    img(ZGK, 'hereford-1', 'Hereford Steakhouse'),
    img(ZGK, 'hereford-2', 'Hereford Steakhouse'),
    img(ZGK, 'hereford-3', 'Hereford Steakhouse'),
    img(ZGK, 'hereford-4', 'Hereford Steakhouse'),
  ],
};

// ─── KFO-Praxis ───────────────────────────────────────────────────────────

const KFO = 'KFO-Praxis';

// ─── Galleries ──────────────────────────────────────────────────────────────

export const galleryThemes: GalleryTheme[] = [
  {
    slug: 'nature',
    name: 'Nature',
    description: 'Natürliche Bildwelten mit Ruhe, Tiefe und Textur.',
    cover: img('Natur', 'natur-5', 'Naturfotografie als ruhiger Markenraum'),
    posts: [9, 2, 6, '13N', 11, 4, 8, 12, 3, 7, 10, 5].map((id) => single('Natur', 'natur', id)),
    tileAspect: '16/9',
  },
  {
    slug: 'people',
    name: 'People',
    description: 'Portraits und Menschen als nahbarer Markenanker.',
    cover: img('People', 'people-1', 'People — Portraits und Begegnungen'),
    posts: [22, 3, 38, 13, 28, 9, 41, 17, 31, 4, 25, 44, 36, 1, 18, 42, 8, 33, 15, 21].map((id) =>
      single('People', 'people', id)
    ),
  },
  {
    slug: 'zgk',
    name: 'Zum Goldenen Kalb',
    description: 'Atmosphäre, Räume und Begegnungen aus dem Zum Goldenen Kalb.',
    cover: img(ZGK, 'amb-9', 'Zum Goldenen Kalb — Ambiente'),
    posts: [herefordPost, janbullPost, ...ambientePosts],
  },
  {
    slug: 'events',
    name: 'Events',
    description: 'Live-Momente, Stimmung und echte Begegnungen auf Events.',
    cover: img('EVENTS', 'events-6N', 'Events — Stimmung und Begegnungen'),
    posts: (['1N', '2N', '3N', '4N', '6N'] as const).map((id) => single('EVENTS', 'events', id)),
  },
  {
    slug: 'praxen',
    name: 'Praxen',
    description: 'Räume, Team und Atmosphäre aus der kieferorthopädischen Praxis.',
    cover: img(KFO, 'kfo-1', 'Praxen — kieferorthopädische Praxis'),
    posts: [3, 4, 5, 6].map((id) => single(KFO, 'kfo', id)),
    video: {
      href: 'https://www.youtube.com/@UpSocialProduction',
      label: 'Interview mit Dr. Udo Windsheimer',
      poster: img(KFO, 'kfo-2', 'Interview mit Dr. Udo Windsheimer'),
    },
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

export function getThemeImages(theme: GalleryTheme): ImageVariantSet[] {
  return theme.posts.flatMap((p) => p.images);
}

export function getThemeCount(theme: GalleryTheme): number {
  return getThemeImages(theme).length;
}

/** Returns the flat image index at which each post starts (for lightbox positioning). */
export function getPostStartIndices(theme: GalleryTheme): number[] {
  let idx = 0;
  return theme.posts.map((p) => {
    const start = idx;
    idx += p.images.length;
    return start;
  });
}

export const gallerySlugs = galleryThemes.map((t) => t.slug);

export function getGalleryThemeBySlug(slug: string | undefined) {
  return galleryThemes.find((t) => t.slug === slug);
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
