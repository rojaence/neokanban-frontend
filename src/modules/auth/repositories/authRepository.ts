import HttpClient from '@/api/httpClient';
import type { IHttpResponse } from '@/api/interfaces';
import type { UserAccessProfile } from '../models/UserProfile';
import type { AuthAccess } from '../models/AuthAccess';
import type { AuthLogin } from '../models/AuthLogin';

export const helloWorld = async () => {
  const { data } = await HttpClient.get<IHttpResponse<string>>('/');
  return data;
};

export const userProfile = async () => {
  const { data } =
    await HttpClient.get<IHttpResponse<UserAccessProfile>>('/auth/profile');
  return data;
};

export const login = async (credentials: AuthLogin) => {
  const { data } = await HttpClient.post<IHttpResponse<AuthAccess>>(
    '/auth/login',
    credentials,
  );
  return data;
};
