import HttpClient from '@/api/httpClient';
import type { IHttpResponse } from '@/api/interfaces';

export const helloWorld = async () => {
  const { data } = await HttpClient.get<IHttpResponse<string>>('/');
  return data;
};
