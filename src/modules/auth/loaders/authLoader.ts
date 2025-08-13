import { userProfile } from '@/modules/auth/repositories/authRepository';
import { AxiosError, HttpStatusCode } from 'axios';
import { redirect } from 'react-router';
import { AuthFullRoutePaths } from '../constants/authRoutePaths';
import { queryClient } from '@/shared/lib/queryClient';

export const authLoader = async () => {
  const cachedUser = queryClient.getQueryData(['profile']);
  if (cachedUser) {
    return cachedUser;
  }
  try {
    const userData = await userProfile();
    return userData.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === HttpStatusCode.Unauthorized) {
        redirect(AuthFullRoutePaths.login);
      }
    }
  }
};
