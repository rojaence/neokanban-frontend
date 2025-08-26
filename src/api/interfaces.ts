import type { HttpStatusCode } from 'axios';

export interface IHttpResponse<T> {
  statusCode: HttpStatusCode;
  message: string;
  data?: T;
  error?: T;
}

export interface IHttpErrorResponse<T> {
  statusCode: HttpStatusCode | string;
  message: string;
  data?: T;
  error: string | null;
}

export const REFRESH_AUTH_ERROR = 'AUTH_EXPIRED';
export const REFRESH_AUTH_URI = '/auth/refresh';
