import environment from '@/environment/env';
import LocalStorageHelper from '@/shared/helpers/localStorage';
import axios, { AxiosError, HttpStatusCode, type AxiosResponse } from 'axios';
import type { IHttpErrorResponse, IHttpResponse } from './interfaces';
import { ApiError } from './HttpError';
import type { AuthAccessDto } from '@/modules/auth/models/AuthLogin';

export const LocalStorageKeys = {
  authAccess: 'authAccess',
} as const;

const HttpClient = axios.create({
  baseURL: environment.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

HttpClient.interceptors.request.use((config) => {
  const auth = LocalStorageHelper.getItem<AuthAccessDto>(
    LocalStorageKeys.authAccess,
  );
  if (auth) config.headers.Authorization = `Bearer ${auth.accessToken}`;
  return config;
});

HttpClient.interceptors.response.use(
  <T>(response: AxiosResponse<IHttpResponse<T>>) => {
    return response;
  },
  (error: AxiosError<IHttpResponse<string>>) => {
    if (error instanceof AxiosError) {
      let standardError: IHttpErrorResponse<string> = {
        statusCode: HttpStatusCode.BadRequest,
        message: 'Unknown error',
        data: undefined,
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
          data: undefined,
          error: error.response.data?.error ?? null,
        };
      }
      return Promise.reject(new ApiError(standardError));
    }
  },
);

export default HttpClient;
