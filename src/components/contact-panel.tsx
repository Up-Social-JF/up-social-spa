import { ArrowUpRight } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { contactChannels } from '@/content/contact';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  actions as contactPanelActions,
  selectors as contactPanelSelectors,
} from '@/store/slices/contact-panel-slice';
import { cn } from '@/utils/cn';

export function ContactPanel() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(contactPanelSelectors.selectIsOpen);
  const subject = useAppSelector(contactPanelSelectors.selectSubject);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(next) =>
        dispatch(next ? contactPanelActions.open() : contactPanelActions.close())
      }
    >
      <SheetContent
        side='right'
        className='h-dvh w-full overflow-y-auto overscroll-contain border-l border-border bg-background p-0 text-foreground sm:max-w-md'
      >
        <SheetHeader className='gap-3 border-b border-border px-7 py-8 sm:px-10'>
          <p className='text-2xs font-semibold uppercase tracking-[0.24em] text-muted-foreground'>
            Kontakt
          </p>
          <SheetTitle className='text-3xl font-light leading-[1.05] tracking-[-0.04em] text-foreground'>
            Lass uns reden.
          </SheetTitle>
          <SheetDescription className='text-sm leading-relaxed text-muted-foreground'>
            Schreib uns auf dem Kanal, den du am liebsten nutzt.
            {subject ? ` Wir wissen schon: ${subject}.` : ''}
          </SheetDescription>
        </SheetHeader>

        <ul className='flex flex-col'>
          {contactChannels.map((channel) => {
            const href = channel.disabled ? undefined : appendSubject(channel, subject);

            const Inner = (
              <span className='flex items-center justify-between gap-6'>
                <span className='flex flex-col gap-1'>
                  <span className='font-display text-2xl font-light tracking-[-0.025em]'>
                    {channel.label}
                  </span>
                  <span className='text-sm text-muted-foreground'>{channel.note}</span>
                </span>
                <ArrowUpRight
                  aria-hidden='true'
                  className={cn(
                    'size-5 shrink-0 transition-transform duration-200 ease-editorial',
                    channel.disabled
                      ? 'opacity-30'
                      : 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
                  )}
                />
              </span>
            );

            const baseClass =
              'group block border-b border-border px-7 py-7 transition-colors duration-200 ease-editorial sm:px-10';

            return (
              <li key={channel.label}>
                {channel.disabled ? (
                  <span
                    className={cn(baseClass, 'cursor-not-allowed text-muted-foreground')}
                    aria-disabled='true'
                  >
                    {Inner}
                  </span>
                ) : (
                  <a
                    href={href}
                    target={channel.external ? '_blank' : undefined}
                    rel={channel.external ? 'noreferrer noopener' : undefined}
                    className={cn(baseClass, 'hover:bg-secondary')}
                    onClick={() => dispatch(contactPanelActions.close())}
                  >
                    {Inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <p className='mt-auto px-7 pb-9 pt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:px-10'>
          Aus München. Für ganz Bayern.
        </p>
      </SheetContent>
    </Sheet>
  );
}

function appendSubject(channel: (typeof contactChannels)[number], subject: string | null): string {
  if (!subject) return channel.href;
  if (channel.href.startsWith('mailto:')) {
    const separator = channel.href.includes('?') ? '&' : '?';
    return `${channel.href}${separator}subject=${encodeURIComponent(`Anfrage UpSocial – ${subject}`)}`;
  }
  return channel.href;
}
