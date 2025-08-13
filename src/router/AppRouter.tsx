import { createBrowserRouter, Navigate } from 'react-router';
import { AuthRoutes } from '@/modules/auth/Routes';
import { NotFound } from '@/shared/views/NotFound';
import { AuthGuard } from '@/router/guards/AuthGuard';
import { AuthBasePath } from '@/modules/auth/constants/authRoutePaths';
import { AuthLayout } from '@/shared/layouts/AuthLayout';
import { lazy, Suspense } from 'react';
import { ErrorView } from '@/shared/views/ErrorView';
import { authLoader } from '@/modules/auth/loaders/authLoader';

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
    loader: authLoader,
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
