import { createBrowserRouter, Navigate } from 'react-router';
import { AuthRoutes } from '@/modules/auth/Routes';
import { NotFound } from '@/shared/views/NotFound';
import { AuthGuard } from '@/shared/guards/AuthGuard';
import { AuthBasePath } from '@/modules/auth/constants/authRoutePaths';
import { AuthLayout } from '@/shared/layouts/AuthLayout';
import { lazy, Suspense } from 'react';
import { helloLoader } from '@/modules/auth/loaders/helloLoader';
import { ErrorView } from '@/shared/views/ErrorView';

const Dashboard = lazy(() => import('@/modules/dashboard/views/Dashboard'));
const MainLayout = lazy(() => import('@/shared/layouts/MainLayout'));

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'dashboard'} replace />,
  },
  {
    path: 'dashboard',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      </Suspense>
    ),
    loader: helloLoader,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: AuthBasePath,
    Component: AuthLayout,
    children: AuthRoutes,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);

export default AppRouter;
