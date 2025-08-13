import HttpClient from '@/api/httpClient';
import type { IHttpResponse } from '@/api/interfaces';
import type { UserAccessProfile } from '../models/UserProfile';

export const helloWorld = async () => {
  const { data } = await HttpClient.get<IHttpResponse<string>>('/');
  return data;
};

export const userProfile = async () => {
  const { data } =
    await HttpClient.get<IHttpResponse<UserAccessProfile>>('/auth/profile');
  return data;
};
