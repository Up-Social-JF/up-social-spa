import type { ImageVariantSet } from '@/content/gallery';

/** The "before" frame straight out of the camera. */
const before: ImageVariantSet = {
  base: '/Webpage-Images/Power-of-LR/lr-before/lr-before',
  alt: 'Naturaufnahme direkt aus der Kamera, vor der Bearbeitung',
};

/** The same frame after Julian's Lightroom edit. */
const after: ImageVariantSet = {
  base: '/Webpage-Images/Power-of-LR/lr-after/lr-after',
  alt: 'Dieselbe Naturaufnahme nach der Lightroom-Bearbeitung',
};

export const lightroom = {
  eyebrow: 'Bildbearbeitung',
  title: 'Die Kraft von Lightroom.',
  description:
    'Ein gutes Bild entsteht nicht nur im Moment des Auslösens. In Lightroom hole ich Licht, Farbe und Tiefe heraus, die im Rohbild schon angelegt sind — dasselbe Motiv, einmal direkt aus der Kamera und einmal nach meiner Bearbeitung.',
  before,
  after,
  beforeLabel: 'Original',
  afterLabel: 'Lightroom',
  hoverHint: 'Mit der Maus über das Bild fahren',
  touchHint: 'Tippen zum Vergleichen',
};
