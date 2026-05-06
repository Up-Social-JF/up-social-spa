import { Link } from 'react-router';
import { LogoWide } from '@/components/logos/logo-wide';
import { Button } from '@/components/ui/button';
import { contactChannels } from '@/content/contact';
import { legalNavItems, primaryNavItems } from '@/content/navigation';
import { site } from '@/content/site';
import { useTheme } from '@/hooks/use-theme';
import { actions as contactPanelActions } from '@/store/slices/contact-panel-slice';
import { useAppDispatch } from '@/store/store';

export function Footer() {
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <footer className='relative overflow-hidden bg-background px-5 py-10 text-foreground sm:px-8 lg:px-10'>
      <div className='mx-auto grid max-w-[var(--max-width-page)] gap-10 md:grid-cols-[1.3fr_1fr_1fr]'>
        <div>
          <LogoWide accent='var(--accent)' className='w-44 max-w-full text-foreground sm:w-56' />
          <p className='mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground'>
            {site.claim}
          </p>
          <Button
            type='button'
            size='sm'
            onClick={() => dispatch(contactPanelActions.open())}
            aria-haspopup='dialog'
            className='mt-6'
          >
            {site.primaryCta}
          </Button>
        </div>

        <nav aria-label='Footer Navigation' className='grid gap-3'>
          {primaryNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className='text-sm uppercase tracking-[0.16em] hover:text-[var(--accent-readable)]'
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='grid content-start gap-3 text-sm text-muted-foreground'>
          {contactChannels.slice(0, 3).map((channel) => (
            <span key={channel.label}>{channel.label}</span>
          ))}
          <span>Aus München. Für ganz DACH.</span>
        </div>
      </div>

      <div className='mx-auto mt-10 flex max-w-[var(--max-width-page)] flex-wrap justify-between gap-x-8 gap-y-4 border-t border-border pr-8 pt-5 text-xs uppercase tracking-[0.16em] text-muted-foreground md:pr-0'>
        <span>© {site.name}</span>
        <div className='flex gap-5'>
          {legalNavItems.map((item) => (
            <Link key={item.href} to={item.href} className='hover:text-[var(--accent-readable)]'>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <button
        type='button'
        aria-label='Theme wechseln'
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setTheme(theme === 'beige' ? 'dark' : 'beige', {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        }}
        className='group absolute -right-6 bottom-5 size-12 rounded-full border border-border bg-[var(--color-bg-tertiary)] transition-transform duration-200 ease-editorial hover:-translate-x-1 focus-visible:-translate-x-5 sm:-right-8 sm:bottom-6 sm:size-16 md:-right-10 md:bottom-8 md:size-20 md:hover:-translate-x-2 md:focus-visible:-translate-x-8 lg:-right-12 lg:size-24'
      >
        <span className='sr-only'>Theme wechseln</span>
        <span className='absolute left-3 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-[var(--accent)] opacity-70 transition-opacity group-hover:opacity-100 sm:left-4 sm:size-2 md:left-5' />
      </button>
    </footer>
  );
}
