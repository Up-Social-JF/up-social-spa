import { Link } from 'react-router';
import { LogoWide } from '@/components/logos/logo-wide';
import { contactChannels } from '@/content/contact';
import { legalNavItems, primaryNavItems } from '@/content/navigation';
import { site } from '@/content/site';
import { useTheme } from '@/hooks/use-theme';

export function Footer() {
  const { theme, setTheme } = useTheme();

  return (
    <footer className='relative overflow-hidden bg-background px-5 py-10 text-foreground sm:px-8 lg:px-10'>
      <div className='mx-auto grid max-w-[var(--max-width-page)] gap-10 md:grid-cols-[1.3fr_1fr_1fr]'>
        <div>
          <LogoWide className='w-64 max-w-full text-foreground [--logo-accent:var(--accent)] sm:w-72' />
          <p className='mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground'>
            {site.claim}
          </p>
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

      <div className='mx-auto mt-10 flex max-w-[var(--max-width-page)] flex-wrap justify-between gap-4 border-t border-border pt-5 text-xs uppercase tracking-[0.16em] text-muted-foreground'>
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
        onClick={() => setTheme(theme === 'beige' ? 'dark' : 'beige')}
        className='group absolute -right-10 bottom-8 size-20 rounded-full border border-border bg-[var(--color-bg-tertiary)] transition-transform duration-200 ease-editorial hover:-translate-x-2 focus-visible:-translate-x-8 sm:-right-12 sm:size-24'
      >
        <span className='sr-only'>Theme wechseln</span>
        <span className='absolute left-5 top-1/2 size-2 -translate-y-1/2 rounded-full bg-[var(--accent)] opacity-70 transition-opacity group-hover:opacity-100' />
      </button>
    </footer>
  );
}
