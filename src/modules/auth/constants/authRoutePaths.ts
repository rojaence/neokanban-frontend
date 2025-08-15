export const AuthBasePath = 'auth';

export const AuthRouteSegments = {
  Login: 'login',
} as const;

export const AuthFullRoutePaths = {
  base: AuthBasePath,
  login: `auth/login`,
};
