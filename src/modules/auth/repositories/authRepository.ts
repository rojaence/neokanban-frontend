import HttpClient from '@/api/httpClient';
import type { IHttpResponse } from '@/api/interfaces';
import type { UserProfile } from '../models/UserProfile';
import type { AuthAccessDto, AuthLoginDto } from '../models/AuthLogin';

export const helloWorld = async () => {
  const { data } = await HttpClient.get<IHttpResponse<string>>('/');
  return data;
};

export const userProfile = async () => {
  const { data } =
    await HttpClient.get<IHttpResponse<UserProfile>>('/auth/profile');
  return data;
};

export const login = async (credentials: AuthLoginDto) => {
  const { data } = await HttpClient.post<IHttpResponse<AuthAccessDto>>(
    '/auth/login',
    credentials,
  );
  return data;
};
