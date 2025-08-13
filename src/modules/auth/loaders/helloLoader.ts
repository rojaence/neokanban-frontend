import * as authRepository from '@/modules/auth/repositories/authRepository';

export const helloLoader = async () => {
  const message = await authRepository.helloWorld();
  return message;
};
