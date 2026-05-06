import { Link } from 'react-router';
import { contactChannels } from '@/content/contact';
import { legalNavItems, primaryNavItems } from '@/content/navigation';
import { site } from '@/content/site';

export function Footer() {
  return (
    <footer className='bg-background px-5 py-10 text-foreground sm:px-8 lg:px-10'>
      <div className='mx-auto grid max-w-[var(--max-width-page)] gap-10 md:grid-cols-[1.3fr_1fr_1fr]'>
        <div>
          <img
            src={site.logoWide}
            alt='UpSocial'
            className='h-12 w-auto bg-[var(--ink)] py-3 pl-0 pr-4'
          />
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
    </footer>
  );
}
