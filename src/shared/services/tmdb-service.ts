import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';

const apiTMDBService = axios.create({
  baseURL: process.env.VITE_TMDB_SERVICE_URL,
});

function interceptConfigRequest(
  config: InternalAxiosRequestConfig<unknown>,
): InternalAxiosRequestConfig<unknown> {
  const token = process.env.VITE_TMDB_API_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

function interceptErrorRequest(error: AxiosError): Promise<never> {
  return Promise.reject(error);
}

function interceptSuccessResponse(response: AxiosResponse): AxiosResponse {
  return response;
}

function interceptErrorResponse(error: AxiosError): Promise<never> {
  if (!error.response?.data) {
    return Promise.reject(error.message);
  }

  return Promise.reject(error.response.data);
}

apiTMDBService.interceptors.request.use(
  interceptConfigRequest,
  interceptErrorRequest,
);

apiTMDBService.interceptors.response.use(
  interceptSuccessResponse,
  interceptErrorResponse,
);

export { apiTMDBService };
