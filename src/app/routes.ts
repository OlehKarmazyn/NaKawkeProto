import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { PackageStandard } from './pages/PackageStandard';
import { PackagePremium } from './pages/PackagePremium';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/pakiet-standard',
    Component: PackageStandard,
  },
  {
    path: '/pakiet-premium',
    Component: PackagePremium,
  },
]);
