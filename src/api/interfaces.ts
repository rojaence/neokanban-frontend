import type { HttpStatusCode } from 'axios';

export interface IHttpResponse<T> {
  statusCode: HttpStatusCode;
  message: string;
  data?: T;
  error?: T;
}

export interface IHttpErrorResponse<T> {
  statusCode: HttpStatusCode;
  message: string;
  data?: T;
  error: string | null;
}
