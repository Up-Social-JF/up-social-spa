import { Link, NavLink, useLocation } from 'react-router';
import { Button } from '@/components/ui/button';
import { LogoWide } from '@/components/logos/logo-wide';
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
          <LogoWide
            className={cn(
              'h-9 w-[13.65rem] sm:h-14 sm:w-[21.25rem]',
              isHome ? 'text-[var(--paper)]' : 'text-foreground'
            )}
          />
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

        <div className='hidden items-center gap-3 sm:flex'>
          <Button
            asChild
            size='sm'
            className={cn(
              isHome &&
                'border-[var(--paper)] bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--paper)]/90'
            )}
          >
            <Link to='/kontakt'>{site.primaryCta}</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
