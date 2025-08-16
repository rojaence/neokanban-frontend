import { useMutation, useQuery } from '@tanstack/react-query';
import { helloWorld, login, userProfile } from '../repositories/authRepository';
import { AUTH_QUERY_KEYS } from '../constants/authQueryKeys';
import LocalStorageHelper from '@/shared/helpers/localStorage';
import { LocalStorageKeys } from '@/api/httpClient';
import type { AuthAccessDto } from '../models/AuthLogin';

export const useHelloWorld = () => {
  return useQuery({
    queryKey: ['hello'],
    queryFn: helloWorld,
    select: (res) => res.data,
  });
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.userProfile,
    queryFn: userProfile,
    select: (res) => res.data,
    staleTime: 1000 * 60 * 5,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      LocalStorageHelper.setItem<AuthAccessDto>(
        LocalStorageKeys.authAccess,
        data.data!,
      );
    },
  });
};
