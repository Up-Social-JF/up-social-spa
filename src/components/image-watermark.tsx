import { cn } from '@/utils/cn';

type ImageWatermarkProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const textClass = {
  sm: 'text-[clamp(0.55rem,1.6vw,0.95rem)] tracking-[0.4em] px-2 py-1',
  md: 'text-[clamp(0.7rem,2.2vw,1.4rem)] tracking-[0.42em] px-3 py-1.5',
  lg: 'text-[clamp(1.4rem,5vw,3.8rem)] tracking-[0.46em] px-5 py-3',
} as const;

export function ImageWatermark({ size = 'md', className }: ImageWatermarkProps) {
  return (
    <div
      aria-hidden='true'
      className={cn(
        'pointer-events-none absolute inset-0 flex items-center justify-center',
        className
      )}
    >
      <span
        className={cn(
          'rounded-md bg-black/22 text-center font-display uppercase text-white/55 shadow-[0_0_0_1px_rgba(255,255,255,0.18)]',
          textClass[size]
        )}
      >
        UP SOCIAL
      </span>
    </div>
  );
}
