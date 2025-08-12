import { useQuery } from '@tanstack/react-query';
import { helloWorld } from '../repositories/authRepository';

export const useHelloWorld = () => {
  return useQuery({
    queryKey: ['hello'],
    queryFn: helloWorld,
    select: (res) => res.data,
  });
};
