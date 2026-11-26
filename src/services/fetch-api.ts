import axios, { type AxiosRequestConfig, type Method } from 'axios';
import { ACCESS_TOKEN, API_TIMEOUT } from '../config';

export interface FetchApiOptions
  extends Omit<AxiosRequestConfig, 'url' | 'method' | 'headers'> {
  url: string;
  method?: Method;
}

export const fetchApi = async <T>({
  url,
  method = 'GET',
  params,
  ...rest
}: FetchApiOptions): Promise<T> => {
  const response = await axios.request<T>({
    timeout: API_TIMEOUT,
    url,
    method,
    params,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    ...rest,
  });

  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(`[${response.status}][${method}] ${url}`, params);
  }

  return response.data;
};
