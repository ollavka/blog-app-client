/* eslint-disable no-useless-catch */
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { createClient } from './index';
import { accessTokenService } from '@/services/accessTokenService';
import { authService } from '@/services/authService';

export const httpClient = createClient();

const onRequest = (
  req: InternalAxiosRequestConfig<void>
) => {
  const accessToken = accessTokenService.get();

  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }

  return req;
};

const onResponseSuccess = (res: AxiosResponse) => res.data;
const onResponseError = async (error: AxiosError) => {
  const originalRequest = error.config as InternalAxiosRequestConfig<void>;

  if (error.response?.status !== 401) {
    throw error;
  }

  try {
    const { accessToken } = await authService.refresh();
    accessTokenService.save(accessToken);

    return httpClient.request(originalRequest);
  } catch (err) {
    throw err;
  }
};

httpClient.interceptors.request.use(onRequest);
httpClient.interceptors.response.use(onResponseSuccess, onResponseError);
