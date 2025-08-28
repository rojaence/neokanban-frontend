import environment from '@/environment/env';
import LocalStorageHelper from '@/shared/helpers/localStorage';
import axios, { AxiosError, HttpStatusCode, type AxiosResponse } from 'axios';
import {
  REFRESH_AUTH_ERROR,
  REFRESH_AUTH_URI,
  type HttpErrorResponse,
  type HttpResponse,
} from './interfaces';
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
  if (auth && config.url !== REFRESH_AUTH_URI)
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  return config;
});

HttpClient.interceptors.response.use(
  <T>(response: AxiosResponse<HttpResponse<T>>) => {
    return response;
  },
  async (error: AxiosError<HttpResponse<string>>) => {
    if (error instanceof AxiosError) {
      let standardError: HttpErrorResponse<string> = {
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
        // INTENTAR REFRESH TOKEN
        const originalRequest = error.config;
        const dataError = error.response.data.error;
        const dataMessage = error.response.data.message;
        if (
          error.response.status === HttpStatusCode.Unauthorized.valueOf() &&
          (dataError === REFRESH_AUTH_ERROR ||
            dataMessage === REFRESH_AUTH_ERROR)
        ) {
          try {
            const auth = LocalStorageHelper.getItem<AuthAccessDto>(
              LocalStorageKeys.authAccess,
            );
            const refreshResponse = await HttpClient.post<
              HttpResponse<AuthAccessDto>
            >(
              REFRESH_AUTH_URI,
              {},
              {
                headers: {
                  Authorization: `Bearer ${auth!.refreshToken}`,
                },
              },
            );
            if (refreshResponse.status === HttpStatusCode.Ok.valueOf()) {
              LocalStorageHelper.setItem<AuthAccessDto>(
                LocalStorageKeys.authAccess,
                refreshResponse.data.data!,
              );
            }
            HttpClient.defaults.headers.common.Authorization = `Bearer ${refreshResponse.data.data?.accessToken}`;

            return HttpClient(originalRequest!);
          } catch (refreshError) {
            if (refreshError instanceof AxiosError) {
              standardError = {
                statusCode: error.response.status,
                message: error.response.data?.message || 'Error',
                data: undefined,
                error: error.response.data?.error ?? null,
              };
            }
          }
        } else {
          standardError = {
            statusCode: error.response.status,
            message: error.response.data?.message || 'Error',
            data: undefined,
            error: error.response.data?.error ?? null,
          };
        }
      }
      if (error.code === AxiosError.ERR_NETWORK.valueOf()) {
        standardError.statusCode = AxiosError.ERR_NETWORK;
      }
      return Promise.reject(new ApiError(standardError));
    }
  },
);

export default HttpClient;
