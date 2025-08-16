import { userProfile } from '@/modules/auth/repositories/authRepository';
import { AxiosError, HttpStatusCode } from 'axios';
import { redirect } from 'react-router';
import { AuthFullRoutePaths } from '../constants/authRoutePaths';
import { queryClient } from '@/shared/lib/queryClient';
import { AUTH_QUERY_KEYS } from '../constants/authQueryKeys';
import useAuthState from '../state/authState';
import type { UserProfile } from '../models/UserProfile';

export const authLoader = async () => {
  const cachedUser = queryClient.getQueryData(
    AUTH_QUERY_KEYS.userProfile,
  ) as UserProfile;
  const setProfile = useAuthState.getState().setUserData;
  if (cachedUser) {
    setProfile(cachedUser);
    return cachedUser;
  }
  try {
    const res = await userProfile();
    setProfile(res.data);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === HttpStatusCode.Unauthorized) {
        redirect(AuthFullRoutePaths.login);
      }
    }
  }
};
