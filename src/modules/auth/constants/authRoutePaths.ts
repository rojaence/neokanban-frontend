export const AuthBasePath = 'auth';

export const AuthRouteSegments = {
  Login: 'login',
  ForgotPassword: 'forgot-password',
} as const;

export const AuthFullRoutePaths = {
  base: `/${AuthBasePath}`,
  login: `/auth/login`,
  forgotPassword: '/auth/forgot-password',
};
