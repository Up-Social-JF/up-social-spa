import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const buttonVariants = cva(
  "inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[var(--border-radius-sm)] border border-transparent text-sm font-semibold uppercase tracking-[0.08em] outline-none transition-[background,color,border-color,box-shadow,transform] duration-200 ease-editorial disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-45 focus-visible:border-[var(--color-border-focus)] focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)]/35 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'border-[var(--color-text-primary)] bg-[var(--color-text-primary)] text-[var(--color-text-inverse)] hover:translate-y-[-1px] hover:border-[var(--accent-readable)] hover:bg-[var(--accent-readable)]',
        filled:
          'border-[var(--color-text-primary)] bg-[var(--color-text-primary)] text-[var(--color-text-inverse)] hover:translate-y-[-1px] hover:border-[var(--accent-readable)] hover:bg-[var(--accent-readable)]',
        destructive:
          'border-destructive bg-destructive text-[var(--paper)] hover:translate-y-[-1px] hover:bg-destructive/90 focus-visible:ring-destructive/25',
        outline:
          'border-[var(--color-border-primary)] bg-transparent text-[var(--color-text-primary)] hover:translate-y-[-1px] hover:border-[var(--accent-readable)] hover:text-[var(--accent-readable)]',
        secondary:
          'border-[var(--color-bg-tertiary)] bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] hover:translate-y-[-1px] hover:border-[var(--accent-readable)]',
        ghost:
          'border-transparent bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--accent-readable)]',
        link: 'border-0 bg-transparent px-0 normal-case tracking-normal text-[var(--accent-readable)] underline-offset-4 hover:underline',
        icon: 'border-[var(--color-border-primary)] bg-transparent text-[var(--color-text-primary)] hover:translate-y-[-1px] hover:border-[var(--accent-readable)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--accent-readable)]',
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
