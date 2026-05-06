import { Outlet } from 'react-router';
import { ContactPanel } from '@/components/contact-panel';
import { Footer } from './footer';
import { Nav } from './nav';

export function AppLayout() {
  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Nav />
      <main id='main-content'>
        <Outlet />
      </main>
      <Footer />
      <ContactPanel />
    </div>
  );
}
