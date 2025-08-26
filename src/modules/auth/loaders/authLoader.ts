import { userProfile } from '@/modules/auth/repositories/authRepository';
import { AxiosError, HttpStatusCode } from 'axios';
import { queryClient } from '@/shared/lib/queryClient';
import { AUTH_QUERY_KEYS } from '../constants/authQueryKeys';
import useAuthState from '../state/authState';
import type { UserProfile } from '../models/UserProfile';
import { ApiError } from '@/api/HttpError';

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
    if (error instanceof ApiError) {
      if (error.response.statusCode === HttpStatusCode.Unauthorized) {
        return null;
      }
      if (error.response.statusCode === AxiosError.ERR_NETWORK.valueOf()) {
        throw error;
      }
    }
    return null;
  }
};
