import axios from 'axios';
import { ACCESS_TOKEN, API_TIMEOUT } from '../config';

export const fetchApi = async ({
  url,
  path,
  method = 'GET',
  data,
  params,
  headers,
  isExternalResource,
  ...rest
}) => {
  const finalHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + ACCESS_TOKEN,
  };

  // console.info(`%c[${method}]%c ${url || `${path}`}`, {
  //   params,
  //   data,
  //   headers: finalHeaders,
  // });

  const response = await axios({
    timeout: API_TIMEOUT,
    url: url || path,
    method,
    data,
    params,
    headers: finalHeaders,
    ...rest,
  });

  console.log(
    `%c[${response.status}][${method}] ${url || `${path}`}`,
    response.data,
  );

  return response.data;
};
