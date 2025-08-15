import type { IHttpResponse } from './interfaces';

export class ApiError<T> extends Error {
  public response: IHttpResponse<T>;
  constructor(response: IHttpResponse<T>) {
    super(response.message);
    this.response = response;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
