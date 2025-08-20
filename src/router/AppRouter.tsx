import { createBrowserRouter, Navigate } from 'react-router';
import { AuthRoutes } from '@/modules/auth/Routes';
import { NotFound } from '@/shared/views/NotFound';
import { AuthGuard } from '@/router/guards/AuthGuard';
import { AuthBasePath } from '@/modules/auth/constants/authRoutePaths';
import { AuthLayout } from '@/shared/layouts/AuthLayout';
import { lazy, Suspense } from 'react';
import { ErrorView } from '@/shared/views/ErrorView';
import { authLoader } from '@/modules/auth/loaders/authLoader';
import { LoadingView } from '@/shared/views/LoadingView';
import { DashboardBasePath } from '@/modules/dashboard/constants/dashboardRoutePaths';
import { TasksBasePath } from '@/modules/tasks/constants/TasksRoutePaths';
import { TaskRoutes } from '@/modules/tasks/Routes';

const Dashboard = lazy(() => import('@/modules/dashboard/views/Dashboard'));
const MainLayout = lazy(() => import('@/shared/layouts/MainLayout'));

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'dashboard'} replace />,
  },
  {
    path: DashboardBasePath,
    element: (
      <Suspense fallback={<LoadingView />}>
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      </Suspense>
    ),
    loader: authLoader,
    id: 'dashboard',
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: TasksBasePath,
    element: (
      <Suspense fallback={<LoadingView />}>
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      </Suspense>
    ),
    errorElement: <ErrorView />,
    loader: authLoader,
    children: TaskRoutes,
  },
  {
    path: AuthBasePath,
    element: (
      <Suspense fallback={<LoadingView />}>
        <AuthGuard>
          <AuthLayout />
        </AuthGuard>
      </Suspense>
    ),
    errorElement: <ErrorView />,
    loader: authLoader,
    children: AuthRoutes,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);

export default AppRouter;
