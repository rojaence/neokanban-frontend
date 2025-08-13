import { useQuery } from '@tanstack/react-query';
import { helloWorld, userProfile } from '../repositories/authRepository';

export const useHelloWorld = () => {
  return useQuery({
    queryKey: ['hello'],
    queryFn: helloWorld,
    select: (res) => res.data,
  });
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: userProfile,
    select: (res) => res.data,
    staleTime: 1000 * 60 * 5,
  });
};
