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
  /**
   * Un-watermarked cover used only on the home landing page (hero + teaser).
   * Falls back to `cover` when omitted. The full galleries keep the baked
   * "UP SOCIAL" mark for download protection.
   */
  landingCover?: ImageVariantSet;
  posts: GalleryPost[];
  /** CSS object-position for the cover crop, e.g. '70% center'. Defaults to 'center'. */
  coverPosition?: string;
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

// The home hero is a landing-page surface, so it uses the clean (un-watermarked)
// copy of natur-5 living under Webpage-Images/Landing.
export const heroImage: ImageVariantSet = img(
  'Landing',
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

// ─── Gastro Events ────────────────────────────────────────────────────────────

const GASTRO = 'EVENTS-GASTRO';

// Source indices that are ALSO featured in the People gallery. Their files carry
// an "XX" suffix (gastro-1XX, …) so a multi-category image is recognizable in the
// repo; the on-site display order still follows the numeric prefix.
const gastroMultiUse = new Set([1, 2, 4]);

function gastroName(i: number): string {
  return `gastro-${i}${gastroMultiUse.has(i) ? 'XX' : ''}`;
}

function gastroPost(i: number): GalleryPost {
  return { images: [img(GASTRO, gastroName(i), 'Gastro Event im Zum Goldenen Kalb')] };
}

// Strip-Reihenfolge: erst Bilder ohne Personen (Szene / Produkt / Detail),
// danach die Aufnahmen mit Personen. Zusammen alle 32 Gastro-Bilder.
const gastroNoPeople = [7, 13, 14, 15, 16, 17, 18, 21, 24, 31, 32];
const gastroWithPeople = [
  1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 19, 20, 22, 23, 25, 26, 27, 28, 29, 30,
];
const gastroPosts: GalleryPost[] = [...gastroNoPeople, ...gastroWithPeople].map(gastroPost);

// ─── Galleries ──────────────────────────────────────────────────────────────

export const galleryThemes: GalleryTheme[] = [
  {
    slug: 'nature',
    name: 'Nature',
    description: 'Natürliche Bildwelten mit Ruhe, Tiefe und Textur.',
    cover: img('Natur', 'natur-2', 'Naturfotografie als ruhiger Markenraum'),
    landingCover: img('Landing', 'natur-2', 'Naturfotografie als ruhiger Markenraum'),
    posts: [9, 2, 6, '13N', 11, 4, 8, 12, 3, 7, 10, 5].map((id) => single('Natur', 'natur', id)),
    tileAspect: '16/9',
  },
  {
    slug: 'people',
    name: 'People',
    description: 'Portraits und Menschen als nahbarer Markenanker.',
    cover: img(GASTRO, 'gastro-1XX', 'People — Portraits und Begegnungen'),
    landingCover: img('Landing', 'gastro-1XX', 'People — Portraits und Begegnungen'),
    // 16 Bilder: 12 People-Aufnahmen + 4 Personen-Shots aus dem Gastro-Event,
    // verteilt im Filmstrip (gastro-1XX/2XX/4XX/27 — Event-Aufnahmen mit Personen).
    posts: [
      ...[1, 9].map((id) => single('People', 'people', id)),
      gastroPost(1),
      ...[3, 15].map((id) => single('People', 'people', id)),
      gastroPost(2),
      ...[4, 17].map((id) => single('People', 'people', id)),
      gastroPost(4),
      gastroPost(27),
      ...[12, 10, 20, 14, 7, 18].map((id) => single('People', 'people', id)),
    ],
  },
  {
    slug: 'zgk',
    name: 'Zum Goldenen Kalb',
    description: 'Atmosphäre, Räume und Begegnungen aus dem Zum Goldenen Kalb.',
    cover: img(ZGK, 'amb-9', 'Zum Goldenen Kalb — Ambiente'),
    landingCover: img('Landing', 'amb-9', 'Zum Goldenen Kalb — Ambiente'),
    posts: [herefordPost, janbullPost, ...ambientePosts],
  },
  {
    slug: 'sport-events',
    name: 'Sport Events',
    description: 'Live-Momente, Tempo und echte Begegnungen bei Sport-Events.',
    cover: img('EVENTS', 'events-6N', 'Sport Events — Stimmung und Begegnungen'),
    landingCover: img('Landing', 'events-6N', 'Sport Events — Stimmung und Begegnungen'),
    posts: (['1N', '2N', '3N', '4N', '6N'] as const).map((id) => single('EVENTS', 'events', id)),
  },
  {
    slug: 'gastro-events',
    name: 'Gastro Events',
    description: 'Genuss, Gäste und Atmosphäre bei Gastro-Events.',
    cover: img(GASTRO, 'gastro-13', 'Gastro Event im Zum Goldenen Kalb'),
    landingCover: img('Landing', 'gastro-13', 'Gastro Event im Zum Goldenen Kalb'),
    posts: gastroPosts,
  },
  {
    slug: 'praxen',
    name: 'Praxen',
    description: 'Räume, Team und Atmosphäre aus der kieferorthopädischen Praxis.',
    cover: img(KFO, 'kfo-1', 'Praxen — kieferorthopädische Praxis'),
    landingCover: img('Landing', 'kfo-1', 'Praxen — kieferorthopädische Praxis'),
    coverPosition: '70% center',
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
