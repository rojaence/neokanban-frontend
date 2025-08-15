import environment from '@/environment/env';
import LocalStorageHelper from '@/shared/helpers/localStorage';
import axios, { AxiosError, HttpStatusCode, type AxiosResponse } from 'axios';
import type { IHttpResponse } from './interfaces';
import { ApiError } from './HttpError';

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
  (error: AxiosError<IHttpResponse<unknown>>) => {
    if (error instanceof AxiosError) {
      let standardError: IHttpResponse<unknown> = {
        statusCode: HttpStatusCode.BadRequest,
        message: 'Unknown error',
        data: null,
        error: null,
      };
      if (error.request) {
        // ERROR EN LA PETICION
      }
      if (error.response) {
        // ERROR EN LA RESPUESTA
        standardError = {
          statusCode: error.response.status,
          message: error.response.data?.message || 'Error',
          data: null,
          error: error.response.data?.error ?? null,
        };
      }
      return Promise.reject(new ApiError(standardError));
    }
  },
);

export default HttpClient;
