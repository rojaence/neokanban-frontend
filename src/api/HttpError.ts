import type { IHttpErrorResponse } from './interfaces';

export class ApiError<T> extends Error {
  public response: IHttpErrorResponse<T>;
  constructor(response: IHttpErrorResponse<T>) {
    super(response.message);
    this.response = response;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
