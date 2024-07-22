
export class ResponseResult<T> {
  data: T;
  success?: boolean;
  message?: string;

  constructor(
    data: T,
    success?: boolean,
    message?: string,
  ) {
    this.data = data;
    this.success = success
    this.message = message;
  }
}
