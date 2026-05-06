import { cn } from '@/utils/cn';

type LogoWideProps = {
  className?: string;
  label?: string;
};

export function LogoWide({ className, label = 'UpSocial' }: LogoWideProps) {
  return (
    <span
      role='img'
      aria-label={label}
      className={cn(
        'inline-block bg-current [mask-image:url("/logo-wide.svg")] [mask-position:left_center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:url("/logo-wide.svg")] [-webkit-mask-position:left_center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]',
        className
      )}
    />
  );
}
