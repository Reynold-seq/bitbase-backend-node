import { type Response } from "express";
import { HttpStatusCode } from "../constants";

interface IApiResponse<T> {
  res: Response;
  statusCode: HttpStatusCode;
  success?: boolean;
  message?: string;
  data?: T;
}

export const sendApiResponse = <T>({ res, statusCode, success = true, message, data }: IApiResponse<T>) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};
