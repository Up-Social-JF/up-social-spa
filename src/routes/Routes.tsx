import { HashRouter as Router, Navigate, Route, Routes as RouterRoutes } from 'react-router';
import { AppLayout } from '@/components/layout/app-layout';
import { Main } from '@/pages/main';
import {
  CapabilityDetailPlaceholder,
  GalleryThemePlaceholder,
  LegalPlaceholder,
  NotFoundPage,
  PlaceholderPage,
} from '@/pages/placeholders';
import { pageIntros } from '@/content/site';

export const Routes = () => {
  return (
    <Router>
      <RouterRoutes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<Main />} />
          <Route path='/leistungen' element={<PlaceholderPage {...pageIntros.leistungen} />} />
          <Route path='/leistungen/:slug' element={<CapabilityDetailPlaceholder />} />
          <Route path='/galerie' element={<PlaceholderPage {...pageIntros.galerie} />} />
          <Route path='/galerie/:theme' element={<GalleryThemePlaceholder />} />
          <Route path='/ueber-jf' element={<PlaceholderPage {...pageIntros.about} />} />
          <Route path='/kontakt' element={<PlaceholderPage {...pageIntros.kontakt} />} />
          <Route path='/impressum' element={<LegalPlaceholder type='Impressum' />} />
          <Route path='/datenschutz' element={<LegalPlaceholder type='Datenschutz' />} />
          <Route path='/404' element={<NotFoundPage />} />
          <Route path='*' element={<Navigate to='/404' replace />} />
        </Route>
      </RouterRoutes>
    </Router>
  );
};
