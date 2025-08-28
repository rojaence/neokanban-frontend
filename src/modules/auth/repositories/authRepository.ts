import HttpClient from '@/api/httpClient';
import type { HttpResponse as HttpResponse } from '@/api/interfaces';
import type { UserProfile } from '../models/UserProfile';
import type { AuthAccessDto, AuthLoginDto } from '../models/AuthLogin';

export const helloWorld = async () => {
  const { data } = await HttpClient.get<HttpResponse<string>>('/');
  return data;
};

export const userProfile = async () => {
  const { data } =
    await HttpClient.get<HttpResponse<UserProfile>>('/auth/profile');
  return data;
};

export const login = async (credentials: AuthLoginDto) => {
  const { data } = await HttpClient.post<HttpResponse<AuthAccessDto>>(
    '/auth/login',
    credentials,
  );
  return data;
};

export const logout = async () => {
  const { data } = await HttpClient.post<HttpResponse<null>>('/auth/logout');
  return data;
};
