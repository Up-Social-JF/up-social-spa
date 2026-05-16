import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { ContactPanel } from '@/components/contact-panel';
import { Footer } from './footer';
import { Nav } from './nav';

function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

export function AppLayout() {
  return (
    <div className='min-h-screen bg-background text-foreground'>
      <ScrollToTopOnNavigate />
      <Nav />
      <main id='main-content'>
        <Outlet />
      </main>
      <Footer />
      <ContactPanel />
    </div>
  );
}
