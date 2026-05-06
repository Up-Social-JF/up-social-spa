import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const buttonVariants = cva(
  "inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-sm border border-transparent text-sm font-semibold tracking-[0.08em] uppercase transition-[background,color,border-color,transform] duration-200 ease-editorial outline-none disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/35 focus-visible:ring-[3px] aria-invalid:border-destructive aria-invalid:ring-destructive/20",
  {
    variants: {
      variant: {
        default:
          'border-primary bg-primary text-primary-foreground hover:translate-y-[-1px] hover:bg-[var(--color-text-secondary)]',
        destructive:
          'border-destructive bg-destructive text-primary-foreground hover:translate-y-[-1px] hover:opacity-90 focus-visible:ring-destructive/25',
        outline:
          'border-border bg-transparent text-foreground hover:translate-y-[-1px] hover:border-[var(--accent)] hover:text-[var(--accent-readable)]',
        secondary:
          'border-secondary bg-secondary text-secondary-foreground hover:translate-y-[-1px] hover:border-[var(--accent)]',
        ghost:
          'border-transparent bg-transparent text-foreground hover:bg-[var(--color-bg-secondary)] hover:text-[var(--accent-readable)]',
        link: 'min-h-0 border-0 px-0 py-0 normal-case tracking-normal text-[var(--accent-readable)] underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-5 py-2.5 has-[>svg]:px-4',
        sm: 'min-h-10 gap-1.5 px-4 py-2 text-xs has-[>svg]:px-3',
        lg: 'min-h-12 px-7 py-3 text-sm has-[>svg]:px-5',
        icon: 'size-11 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
