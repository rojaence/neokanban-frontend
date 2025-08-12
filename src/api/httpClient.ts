import environment from '@/environment/env';
import LocalStorageHelper from '@/shared/helpers/localStorage';
import axios, { AxiosError, HttpStatusCode, type AxiosResponse } from 'axios';
import type { IHttpResponse } from './interfaces';

export const LocalStorageKeys = {
  AccessToken: 'access-token',
} as const;

const HttpClient = axios.create({
  baseURL: environment.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

HttpClient.interceptors.request.use((config) => {
  const token = LocalStorageHelper.getStorageValue<string>(
    LocalStorageKeys.AccessToken,
  );
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

HttpClient.interceptors.response.use(
  <T>(response: AxiosResponse<IHttpResponse<T>>) => {
    return response;
  },
  (error) => {
    if (error instanceof AxiosError) {
      if (error.request) {
        // ERROR EN LA PETICION
      }
      if (error.response) {
        // ERROR EN LA RESPUESTA
        if (error.response.status === HttpStatusCode.Unauthorized.valueOf()) {
          // REVIEW: Decidir un mejor lugar para redigigir a login
          // redirect('auth/login');
        }
      }
      throw error as Error;
    }
  },
);

export default HttpClient;
