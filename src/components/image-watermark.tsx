import { cn } from '@/utils/cn';

type ImageWatermarkProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const textSize = {
  sm: 'text-[clamp(1rem,3.5vw,2.2rem)] tracking-[0.44em]',
  md: 'text-[clamp(1.4rem,5vw,3.6rem)] tracking-[0.46em]',
  lg: 'text-[clamp(2rem,7vw,5.5rem)] tracking-[0.5em]',
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
          'select-none text-center font-display uppercase text-white/30',
          textSize[size]
        )}
      >
        UP SOCIAL
      </span>
    </div>
  );
}
