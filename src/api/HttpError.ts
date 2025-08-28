import type { HttpErrorResponse } from './interfaces';

export class ApiError<T> extends Error {
  public response: HttpErrorResponse<T>;
  constructor(response: HttpErrorResponse<T>) {
    super(response.message);
    this.response = response;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
