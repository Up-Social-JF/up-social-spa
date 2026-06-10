import { useCallback, useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import {
  type GalleryVideo,
  type ImageVariantSet,
  getImageSrc,
  getImageSrcSet,
} from '@/content/gallery';
import { ImageWatermark } from '@/components/image-watermark';

type GalleryFilmStripProps = {
  images: ImageVariantSet[];
  video?: GalleryVideo;
  onImageClick?: (index: number) => void;
  themeName: string;
  tileAspect?: string;
};

const DRAG_THRESHOLD_PX = 8;

function pad2(n: number) {
  return n.toString().padStart(2, '0');
}

export function GalleryFilmStrip({
  images,
  video,
  onImageClick,
  themeName,
  tileAspect = '3/4',
}: GalleryFilmStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    moved: number;
  } | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? el.scrollLeft / max : 0;
      setProgress(p);
      const items = el.querySelectorAll<HTMLElement>('[data-img-index]');
      if (items.length === 0) return;
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      items.forEach((node, i) => {
        const mid = node.offsetLeft + node.offsetWidth / 2;
        const d = Math.abs(mid - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setCurrentIndex(best + 1);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [images.length]);

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    if (event.button !== undefined && event.button !== 0) return;
    const el = scrollRef.current;
    if (!el) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: el.scrollLeft,
      moved: 0,
    };
    el.setPointerCapture?.(event.pointerId);
    el.dataset.dragging = 'true';
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    const el = scrollRef.current;
    if (!d || !el || d.pointerId !== event.pointerId) return;
    const dx = event.clientX - d.startX;
    el.scrollLeft = d.startScrollLeft - dx;
    d.moved = Math.abs(dx);
  }, []);

  const endDrag = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    const el = scrollRef.current;
    if (!d || !el || d.pointerId !== event.pointerId) return;
    el.releasePointerCapture?.(event.pointerId);
    delete el.dataset.dragging;
  }, []);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const d = dragRef.current;
      if (d && d.moved > DRAG_THRESHOLD_PX) {
        event.preventDefault();
        event.stopPropagation();
        dragRef.current = null;
        return;
      }
      const target = (event.target as HTMLElement).closest<HTMLElement>('[data-img-index]');
      if (!target) return;
      const idx = Number(target.dataset.imgIndex);
      if (Number.isFinite(idx)) onImageClick?.(idx);
      dragRef.current = null;
    },
    [onImageClick]
  );

  if (images.length === 0) return null;

  const isLandscape = tileAspect !== '3/4';
  const tileHeight = isLandscape ? 'h-[clamp(336px,62vh,744px)]' : 'h-[clamp(380px,68vh,760px)]';

  return (
    <div className='relative'>
      <div
        ref={scrollRef}
        role='region'
        aria-label={`${themeName} — Bilderstrecke. Ziehen oder wischen zum Blättern.`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClick={onClick}
        className='flex w-full select-none gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain px-5 pb-8 pt-1 sm:gap-6 sm:px-8 lg:gap-8 lg:px-10 [&::-webkit-scrollbar]:hidden data-[dragging=true]:cursor-grabbing cursor-grab [scrollbar-width:none]'
        style={{ scrollBehavior: 'auto' }}
      >
        {video && (
          <a
            href={video.href}
            target='_blank'
            rel='noreferrer noopener'
            aria-label={`${video.label} — auf YouTube ansehen`}
            className={`group relative shrink-0 overflow-hidden bg-[var(--color-bg-secondary)] shadow-[0_18px_44px_-28px_rgba(43,38,28,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2 ${tileHeight}`}
            style={{ aspectRatio: tileAspect }}
          >
            {video.poster && (
              <picture>
                <source srcSet={getImageSrcSet(video.poster, 'avif')} type='image/avif' />
                <source srcSet={getImageSrcSet(video.poster, 'webp')} type='image/webp' />
                <img
                  src={getImageSrc(video.poster, 'md')}
                  alt=''
                  draggable={false}
                  loading='eager'
                  decoding='async'
                  className='pointer-events-none h-full w-full object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-[1.1]'
                />
              </picture>
            )}
            <span
              aria-hidden='true'
              className='absolute inset-0 grid place-items-center bg-gradient-to-t from-black/70 via-black/25 to-black/40'
            >
              <span className='grid h-16 w-16 place-items-center rounded-full bg-white/90 text-black transition-colors duration-300 group-hover:bg-white sm:h-20 sm:w-20'>
                <Play className='h-7 w-7 translate-x-0.5 fill-current sm:h-8 sm:w-8' />
              </span>
            </span>
            <span
              aria-hidden='true'
              className='pointer-events-none absolute left-3 top-3 font-display text-xs uppercase tracking-[0.32em] text-white/85 sm:left-4 sm:top-4'
            >
              Video
            </span>
            <span className='pointer-events-none absolute inset-x-3 bottom-3 font-display text-lg font-normal leading-tight tracking-[-0.01em] text-white text-balance sm:inset-x-4 sm:bottom-4 sm:text-2xl'>
              {video.label}
            </span>
          </a>
        )}
        {images.map((image, i) => (
          <button
            key={image.base}
            type='button'
            data-img-index={i}
            aria-label={`${image.alt} — vergrößern`}
            className={`group relative shrink-0 overflow-hidden bg-[var(--color-bg-secondary)] shadow-[0_18px_44px_-28px_rgba(43,38,28,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2 ${tileHeight}`}
            style={{ aspectRatio: tileAspect }}
          >
            <picture>
              <source
                srcSet={getImageSrcSet(image, 'avif')}
                sizes='(min-width: 1280px) 720px, (min-width: 768px) 55vw, 85vw'
                type='image/avif'
              />
              <source
                srcSet={getImageSrcSet(image, 'webp')}
                sizes='(min-width: 1280px) 720px, (min-width: 768px) 55vw, 85vw'
                type='image/webp'
              />
              <img
                src={getImageSrc(image, 'md')}
                alt={image.alt}
                draggable={false}
                loading={i < 3 ? 'eager' : 'lazy'}
                fetchPriority={i < 3 ? 'high' : 'auto'}
                decoding='async'
                className='pointer-events-none h-full w-full object-contain object-center transition-transform duration-700 ease-editorial group-hover:scale-[1.1]'
              />
            </picture>
            <span
              aria-hidden='true'
              className='pointer-events-none absolute left-3 top-3 font-display text-xs uppercase tracking-[0.32em] text-white/85 mix-blend-difference sm:left-4 sm:top-4'
            >
              {pad2(i + 1)}
            </span>
            <ImageWatermark size='md' />
          </button>
        ))}
      </div>

      <div className='mx-auto flex max-w-[var(--max-width-page)] items-center gap-4 px-5 pt-2 sm:px-8 lg:px-10'>
        <span className='font-display text-xs uppercase tracking-[0.32em] text-muted-foreground tabular-nums'>
          {pad2(currentIndex)}{' '}
          <span className='text-[var(--accent-readable)]/40'>/ {pad2(images.length)}</span>
        </span>
        <div className='relative h-px flex-1 bg-border'>
          <div
            className='absolute inset-y-0 left-0 bg-[var(--accent)] transition-[width] duration-150 ease-out'
            style={{ width: `${Math.max(2, progress * 100)}%` }}
          />
        </div>
        <span className='hidden font-display text-[0.7rem] uppercase tracking-[0.32em] text-muted-foreground sm:inline'>
          Ziehen · Wischen
        </span>
      </div>
    </div>
  );
}
