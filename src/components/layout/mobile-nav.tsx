import { useState } from 'react';
import { ArrowUpRight, Menu } from 'lucide-react';
import { NavLink, useLocation } from 'react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { contactChannels } from '@/content/contact';
import { primaryNavItems } from '@/content/navigation';
import { site } from '@/content/site';
import { actions as contactPanelActions } from '@/store/slices/contact-panel-slice';
import { useAppDispatch } from '@/store/store';
import { cn } from '@/utils/cn';

type MobileNavProps = {
  variant: 'home' | 'inner';
};

export function MobileNav({ variant }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const close = () => setOpen(false);

  const openContactPanel = () => {
    close();
    dispatch(contactPanelActions.open());
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type='button'
          aria-label='Menü öffnen'
          className={cn(
            'flex size-11 items-center justify-center rounded-xs border border-transparent transition-colors duration-200 ease-editorial lg:hidden',
            variant === 'home'
              ? 'text-[var(--paper)] hover:border-[var(--paper)]/40'
              : 'text-foreground hover:border-border'
          )}
        >
          <Menu className='size-6' aria-hidden='true' />
        </button>
      </SheetTrigger>

      <SheetContent
        side='right'
        className='flex h-dvh w-[88vw] max-w-md flex-col gap-0 overflow-y-auto overscroll-contain border-l border-border bg-background p-0 text-foreground sm:w-[480px]'
      >
        <SheetTitle className='sr-only'>Navigation und Kontakt</SheetTitle>

        <p className='border-b border-border px-7 pb-5 pt-9 text-2xs font-semibold uppercase tracking-[0.24em] text-muted-foreground sm:px-10'>
          {site.name}
        </p>

        <nav aria-label='Mobile Navigation' className='flex flex-col border-b border-border'>
          {primaryNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={close}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'group flex items-center justify-between gap-6 px-7 py-5 transition-colors duration-200 ease-editorial sm:px-10',
                  isActive ? 'bg-secondary text-foreground' : 'hover:bg-secondary'
                )}
              >
                <span className='font-display text-2xl font-light tracking-[-0.025em]'>
                  {item.label}
                </span>
                <ArrowUpRight
                  aria-hidden='true'
                  className={cn(
                    'size-5 shrink-0 transition-transform duration-200 ease-editorial',
                    isActive
                      ? 'text-[var(--accent-readable)]'
                      : 'opacity-50 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100'
                  )}
                />
              </NavLink>
            );
          })}
        </nav>

        <ul className='flex flex-col border-b border-border'>
          {contactChannels.map((channel) => {
            const baseClass =
              'group flex items-center justify-between gap-6 px-7 py-4 transition-colors duration-200 ease-editorial sm:px-10';
            const Inner = (
              <>
                <span className='flex flex-col gap-0.5'>
                  <span className='text-base font-medium'>{channel.label}</span>
                  <span className='text-xs text-muted-foreground'>{channel.note}</span>
                </span>
                <ArrowUpRight
                  aria-hidden='true'
                  className={cn(
                    'size-4 shrink-0 transition-transform duration-200 ease-editorial',
                    channel.disabled
                      ? 'opacity-30'
                      : 'opacity-50 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100'
                  )}
                />
              </>
            );

            return (
              <li key={channel.label}>
                {channel.disabled ? (
                  <span
                    aria-disabled='true'
                    className={cn(baseClass, 'cursor-not-allowed text-muted-foreground')}
                  >
                    {Inner}
                  </span>
                ) : (
                  <a
                    href={channel.href}
                    target={channel.external ? '_blank' : undefined}
                    rel={channel.external ? 'noreferrer noopener' : undefined}
                    onClick={close}
                    className={cn(baseClass, 'hover:bg-secondary')}
                  >
                    {Inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <div className='mt-auto flex flex-col gap-4 px-7 pb-9 pt-6 sm:px-10'>
          <Button
            type='button'
            size='lg'
            onClick={openContactPanel}
            className='w-full justify-between'
          >
            {site.primaryCta}
            <ArrowUpRight aria-hidden='true' />
          </Button>
          <p className='text-xs uppercase tracking-[0.2em] text-muted-foreground'>
            Aus München. Für ganz Bayern.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
