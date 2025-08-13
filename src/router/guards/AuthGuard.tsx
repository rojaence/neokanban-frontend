import {
  AuthBasePath,
  AuthRouteSegments,
} from '@/modules/auth/constants/authRoutePaths';
import useAuthState from '@/modules/auth/state/authState';
import { Navigate } from 'react-router';

interface Props {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: Props) => {
  const authState = useAuthState();

  if (!authState.isAuthenticated) {
    return (
      <Navigate to={`/${AuthBasePath}/${AuthRouteSegments.Login}`} replace />
    );
  }

  return children;
};
