import { HttpStatusCode } from '~/constants';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '~/types';

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  return axios.isAxiosError(error);
};

export const isAxiosUnprocessableEntityError = <T>(error: unknown): error is AxiosError<T> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
};

export const isAxiosUnauthorizedError = <T>(error: unknown): error is AxiosError<T> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized;
};

export const isAxiosExpiredTokenError = <T>(error: unknown): error is AxiosError<T> => {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
    error.response?.data.data?.name === 'EXPIRED_TOKEN'
  );
};
