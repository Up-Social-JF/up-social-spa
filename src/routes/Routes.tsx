import { HashRouter as Router, Navigate, Route, Routes as RouterRoutes } from 'react-router';
import { AppLayout } from '@/components/layout/app-layout';
import { AboutPage } from '@/pages/about-page';
import { CapabilityDetailPage } from '@/pages/capability-detail-page';
import { GaleriePage } from '@/pages/galerie-page';
import { GalerieThemePage } from '@/pages/galerie-theme-page';
import { KontaktPage } from '@/pages/kontakt-page';
import { LeistungenPage } from '@/pages/leistungen-page';
import { Main } from '@/pages/main';
import { LegalPlaceholder, NotFoundPage } from '@/pages/placeholders';

export const Routes = () => {
  return (
    <Router>
      <RouterRoutes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<Main />} />
          <Route path='/leistungen' element={<LeistungenPage />} />
          <Route path='/leistungen/:slug' element={<CapabilityDetailPage />} />
          <Route path='/galerie' element={<GaleriePage />} />
          <Route path='/galerie/:theme' element={<GalerieThemePage />} />
          <Route path='/ueber-jf' element={<AboutPage />} />
          <Route path='/kontakt' element={<KontaktPage />} />
          <Route path='/impressum' element={<LegalPlaceholder type='Impressum' />} />
          <Route path='/datenschutz' element={<LegalPlaceholder type='Datenschutz' />} />
          <Route path='/404' element={<NotFoundPage />} />
          <Route path='*' element={<Navigate to='/404' replace />} />
        </Route>
      </RouterRoutes>
    </Router>
  );
};
