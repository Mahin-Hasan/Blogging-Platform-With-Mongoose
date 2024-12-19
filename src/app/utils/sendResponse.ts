import { Response } from 'express';

type TResponse<T> = {
  success: boolean;
  message?: string;
  statusCode: number;
  data: T; //generic type bz we dont not whether we will get an array or obj or array of obj
};
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data,
  });
};

export default sendResponse;
