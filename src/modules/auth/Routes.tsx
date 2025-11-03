import { Login } from '@/modules/auth/views/Login';
import { Navigate, type RouteObject } from 'react-router';
import { AuthRouteSegments } from './constants/authRoutePaths';
import { ForgotPassword } from './views/ForgotPassword';

export const AuthRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={AuthRouteSegments.Login} replace />,
  },
  {
    path: AuthRouteSegments.Login,
    Component: Login,
  },
  {
    path: AuthRouteSegments.ForgotPassword,
    Component: ForgotPassword,
  },
];
