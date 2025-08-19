import {
  AuthBasePath,
  AuthFullRoutePaths,
  AuthRouteSegments,
} from '@/modules/auth/constants/authRoutePaths';
import useAuthState from '@/modules/auth/state/authState';
import { DashboardFullRoutePaths } from '@/modules/dashboard/constants/dashboardRoutePaths';
import { Navigate, useLocation } from 'react-router';

interface Props {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: Props) => {
  const authState = useAuthState();
  const location = useLocation();

  if (
    authState.isAuthenticated &&
    location.pathname === AuthFullRoutePaths.login
  ) {
    return <Navigate to={DashboardFullRoutePaths.base} replace />;
  }

  if (
    !authState.isAuthenticated &&
    location.pathname !== AuthFullRoutePaths.login
  ) {
    return (
      <Navigate
        to={`/${AuthBasePath}/${AuthRouteSegments.Login}`}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};
