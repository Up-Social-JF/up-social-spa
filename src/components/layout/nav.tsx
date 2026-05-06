import { Link, NavLink, useLocation } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { primaryNavItems } from '@/content/navigation';
import { site } from '@/content/site';
import { cn } from '@/utils/cn';

export function Nav() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <header
      className={cn(
        'z-50 w-full px-4 py-4 sm:px-7 lg:px-10',
        isHome
          ? 'absolute left-0 top-0 text-[var(--paper)]'
          : 'sticky top-0 border-b border-border bg-background/92 text-foreground backdrop-blur'
      )}
    >
      <nav className='flex items-center justify-between gap-6' aria-label='Hauptnavigation'>
        <Link to='/' aria-label='UpSocial by JF Startseite' className='block shrink-0'>
          <img src={site.logoWide} alt='UpSocial' className='h-11 w-auto sm:h-14' />
        </Link>

        <div className='hidden items-center gap-7 lg:flex'>
          {primaryNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-200 ease-editorial hover:text-[var(--accent-readable)]',
                  isActive && 'text-[var(--accent-readable)]'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className='flex items-center gap-3'>
          <Button
            asChild
            size='sm'
            className={cn(
              isHome &&
                'border-[var(--paper)] bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--paper)]/90'
            )}
          >
            <Link to='/kontakt'>
              {site.primaryCta}
              <ArrowUpRight aria-hidden='true' />
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
