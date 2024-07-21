interface IResponseData<T> {
  data: T;
}

export class ResponseResult<T> {
  success: boolean;
  message: string;
  data: IResponseData<T>;
  constructor(success: boolean, message: string, data: IResponseData<T>) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}


interface ICompute {
  x: number;
  y: number;
  compute: () => void
}